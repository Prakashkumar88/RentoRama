import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
import sendEmailVerificationOTP from '../utils/sendEmailVerificationOTP.js';
import EmailVerificationModel from '../models/EmailVerification.js';
import generateTokens from '../utils/generateTokens.js';
import setTokensCookies from '../utils/setTokensCookies.js';
import uploadToCloudinary from '../utils/uploadToCloudinary.js';
import refreshAccessToken from '../utils/refreshAccessToken.js';
import UserRefreshTokenModel from '../models/UserRefreshToken.js';
import jwt from "jsonwebtoken"
import transporter from '../config/emailConfig.js';

class UserController {
    // User Registration
    static userRegistration = async (req, res) => {
        try {
            // Extract request body parameters
            const { name, surname, email, password, dob, phoneNumber, drivingLicense, aadhaarCard, agreed } = req.body;

            // Check if all required fields are provided
            if (!name || !surname || !email || !password || !dob || !phoneNumber || !drivingLicense || !aadhaarCard || !agreed) {
                return res.status(400).json({ status: "failed", message: "All fields are required" });
            }

            // Generate salt and hash password
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create new user
            const newUser = await new UserModel({ name, surname, email, password: hashedPassword, dob, phoneNumber, drivingLicense, aadhaarCard, agreed, profileImage: null }).save();

            sendEmailVerificationOTP(req, newUser);
            

            // Send success response
            res.status(201).json({
                status: "success",
                message: "Registration Success",
                user: { id: newUser._id, email: newUser.email }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "failed", message: "Unable to Register, please try again later" });
        }
    }

    // User Email Verification
    static verifyEmail = async (req, res) => {
        try {
          const { otp } = req.body;
      
          // Check if OTP is provided
          if (!otp) {
            return res.status(400).json({ status: "failed", message: "OTP is required" });
          }
      
          // Find the email verification record by OTP
          const emailVerification = await EmailVerificationModel.findOne({ otp });
      
          if (!emailVerification) {
            // If no record found, OTP is invalid
            return res.status(400).json({ status: "failed", message: "Invalid OTP" });
          }
      
          // Check if OTP has expired
          const currentTime = new Date();
          const expirationTime = new Date(emailVerification.createdAt.getTime() + 10 * 60 * 1000);
          if (currentTime > expirationTime) {
            // If OTP is expired, delete the record and send a new OTP
            await EmailVerificationModel.findByIdAndDelete(emailVerification._id);
            return res.status(400).json({ status: "failed", message: "OTP expired, new OTP sent to your email" });
          }
      
          // If OTP is valid and not expired, mark the email as verified
          const user = await UserModel.findByIdAndUpdate(emailVerification.userId, { is_verified: true }, { new: true });
      
          // Delete the email verification record
          await EmailVerificationModel.findByIdAndDelete(emailVerification._id);
      
          return res.status(200).json({ status: "success", message: "Email verified successfully" });
        } catch (error) {
          console.error("Error verifying email:", error);
          res.status(500).json({ status: "failed", message: "Unable to verify email, please try again later" });
        }
    }

    // User Login
    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body
            // Check if email and password are provided
            if (!email || !password) {
                return res.status(400).json({ status: "failed", message: "Email and password are required" });
            }
            // Find user by email
            const user = await UserModel.findOne({ email });

            // Check if user exists
            if (!user) {
                return res.status(404).json({ status: "failed", message: "Invalid Email or Password" });
            }

            // Check if user verified
            if (!user.is_verified) {
                return res.status(401).json({ status: "failed", message: "Your account is not verified" });
            }

            // Compare passwords / Check Password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ status: "failed", message: "Invalid email or password" });
            }

            // Generate tokens
            const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = await generateTokens(user)

            // Set Cookies
            setTokensCookies(res, accessToken, refreshToken, accessTokenExp, refreshTokenExp)

            // Send success response with tokens
            res.status(200).json({
                user: { id: user._id, email: user.email, name: user.name, roles: user.roles[0] },
                status: "success",
                message: "Login successful",
                access_token: accessToken,
                refresh_token: refreshToken,
                access_token_exp: accessTokenExp,
                is_auth: true
            });


        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "failed", message: "Unable to login, please try again later" });
        }
    }

    // Get New Access Token OR Refresh Token
    static getNewAccessToken = async (req, res) => {
        try {
            // Get new access token using Refresh Token
            const { newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp } = await refreshAccessToken(req, res)

            // Set New Tokens to Cookie
            setTokensCookies(res, newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp)

            res.status(200).send({
                status: "success",
                message: "New tokens generated",
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
                access_token_exp: newAccessTokenExp
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "failed", message: "Unable to generate new token, please try again later" });
        }
    }

    // Profile OR Logged in User
    static userProfile = async (req, res) => {
        res.send({ "user": req.user })
    }
    
    //Upload Profile Image
    static uploadProfileImage = async (req, res) => {
        try {
            const token = req.cookies.accessToken;
            if (!token) {
                return res.status(401).json({ status: "failed", message: "Unauthorized" });
            }

            // Verify and decode the token
            const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
            const userId = decodedToken._id;

            if (!userId) {
                return res.status(401).json({ status: "failed", message: "Invalid token" });
            }

            // Check if the profile image is provided
            if (!req.files || !req.files.profileImage) {
                return res.status(400).json({ status: "failed", message: "Profile image is required" });
            }

            // Upload image to Cloudinary
            const profileImageUrl = await uploadToCloudinary(req.files.profileImage);

            // Update user's profile image URL in the database
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                { profileImage: profileImageUrl },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(500).json({ status: "failed", message: "Unable to update profile image, please try again later" });
            }

            // Send success response
            res.status(200).json({
                status: "success",
                message: "Profile image uploaded successfully",
                profileImage: profileImageUrl,
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "failed", message: "Error uploading profile image" });
        }
    }

    // Change Password
    static changeUserPassword = async (req, res) => {
        try {
            const { password, password_confirmation } = req.body;

            // Check if both password and password_confirmation are provided
            if (!password || !password_confirmation) {
                return res.status(400).json({ status: "failed", message: "New Password and Confirm New Password are required" });
            }

            // Check if password and password_confirmation match
            if (password !== password_confirmation) {
                return res.status(400).json({ status: "failed", message: "New Password and Confirm New Password don't match" });
            }

            // Generate salt and hash new password
            const salt = await bcrypt.genSalt(10);
            const newHashPassword = await bcrypt.hash(password, salt);

            // Update user's password
            await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } });

            // Send success response
            res.status(200).json({ status: "success", message: "Password changed successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "failed", message: "Unable to change password, please try again later" });
        }
    }

    // Change User Data
    static changeUserData = async (req, res) => {
        try {
            const { dob, drivingLicense, aadhaarCard } = req.body;

            // Check if all required fields are provided
            if (!dob || !drivingLicense || !aadhaarCard) {
               return res.status(400).json({ status: "failed", message: "dob, drivingLicense, aadhaarCard are required" });
            }

            // Proceed with updating the user data
            // Assuming you have a function or model to handle the database update
            const updatedUser = await UserModel.findByIdAndUpdate(req.user._id,{$set: {dob, drivingLicense, aadhaarCard}})

            // Check if the update was successful
            if (!updatedUser) {
                return res.status(500).json({ status: "failed", message: "Unable to update user data, please try again later" });
            }

            // Respond with success
            res.status(200).json({ status: "success", message: "User data updated successfully", data: updatedUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "failed", message: "Unable to change user data, please try again later" });
        }
    }


    // Send Password Reset Link via Email
    static sendUserPasswordResetEmail = async (req, res) => {
        try {
            const { email } = req.body;
            // Check if email is provided
            if (!email) {
                return res.status(400).json({ status: "failed", message: "Email field is required" });
            }
            // Find user by email
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ status: "failed", message: "Email doesn't exist" });
            }
            // Generate token for password reset
            const secret = user._id + process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
            const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' });
            // Reset Link
            const resetLink = `${process.env.FRONTEND_HOST}/account/reset-password-confirm/${user._id}/${token}`;
            console.log(resetLink);
            // Send password reset email  
            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: user.email,
                subject: "Password Reset Link",
                html: `<p>Hello ${user.name},</p><p>Please <a href="${resetLink}">click here</a> to reset your password.</p>`
            });
            // Send success response
            res.status(200).json({ status: "success", message: "Password reset email sent. Please check your email." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "failed", message: "Unable to send password reset email. Please try again later." });
        }
    }

    // Password Reset
    static userPasswordReset = async (req, res) => {
        try {
            const { password, password_confirmation } = req.body;
            const { id, token } = req.params;
            // Find user by ID
            const user = await UserModel.findById(id);
            if (!user) {
                return res.status(404).json({ status: "failed", message: "User not found" });
            }
            // Validate token
            const new_secret = user._id + process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
            jwt.verify(token, new_secret);

            // Check if password and password_confirmation are provided
            if (!password || !password_confirmation) {
                return res.status(400).json({ status: "failed", message: "New Password and Confirm New Password are required" });
            }

            // Check if password and password_confirmation match
            if (password !== password_confirmation) {
                return res.status(400).json({ status: "failed", message: "New Password and Confirm New Password don't match" });
            }

            // Generate salt and hash new password
            const salt = await bcrypt.genSalt(10);
            const newHashPassword = await bcrypt.hash(password, salt);

            // Update user's password
            await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } });

            // Send success response
            res.status(200).json({ status: "success", message: "Password reset successfully" });

        } catch (error) {
            console.log(error);
            if (error.name === "TokenExpiredError") {
                return res.status(400).json({ status: "failed", message: "Token expired. Please request a new password reset link." });
            }
            return res.status(500).json({ status: "failed", message: "Unable to reset password. Please try again later." });
        }
    }

    // Logout
    static userLogout = async (req, res) => {
        try {
            // Optionally, you can blacklist the refresh token in the database
            const refreshToken = req.cookies.refreshToken;
            await UserRefreshTokenModel.findOneAndUpdate(
                { token: refreshToken },
                { $set: { blacklisted: true } }
            );

            // Clear access token and refresh token cookies
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.clearCookie('is_auth');

            res.status(200).json({ status: "success", message: "Logout successful" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "failed", message: "Unable to logout, please try again later" });
        }

    }
}

export default UserController