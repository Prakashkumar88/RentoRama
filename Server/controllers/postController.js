import PostModel from "../models/Post.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import UserModel from "../models/User.js";
import transporter from '../config/emailConfig.js';
import jwt from 'jsonwebtoken';

class PostController {
    // Create Posts
    static createPost = async (req, res) => {
        try {
            console.log("Request Body:", req.body);

            const { model, carPrice, carTransmission, carFuel, carCapacity, district } = req.body;

            // Check if all required fields are provided
            if (!model || !carPrice || !carTransmission || !carFuel || !carCapacity || !district || !req.files || !req.files.carImage) {
                return res.status(400).json({ status: "failed", message: "All fields are required, including an image" });
            }

            // Extract user ID from JWT token stored in the cookie
            const token = req.cookies.accessToken;
            if (!token) {
                return res.status(401).json({ status: "failed", message: "Unauthorized" });
            }
            // console.log("Token:", token);

            const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
            const userId = decodedToken._id;

            if (!userId) {
                return res.status(401).json({ status: "failed", message: "Invalid token" });
            }
            console.log("Decoded User ID:", userId);

            // Upload image to Cloudinary
            const carImageUrl = await uploadToCloudinary(req.files.carImage);
            console.log("Uploaded Image URL:", carImageUrl);

            // Create new post with user ID and image URL
            const newPost = await new PostModel({ model, carPrice, carTransmission, carFuel, carCapacity, district, userId, carImage: carImageUrl }).save();

            console.log("New Post:", newPost);

            res.status(201).json({
                status: "success",
                message: "Post created successfully",
                post: { id: newPost._id }
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "failed", message: "Unable to create post, please try again later" });
        }
    }

    // Fetch Posts of a Particular User
    static getUserPosts = async (req, res) => {
        try {
            // Extract user ID from JWT token stored in the cookie
            const token = req.cookies.accessToken;
            if (!token) {
                return res.status(401).json({ status: "failed", message: "Unauthorized" });
            }

            const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
            const userId = decodedToken._id;

            if (!userId) {
                return res.status(401).json({ status: "failed", message: "Invalid token" });
            }

            // Fetch posts from the database where userId matches the extracted userId
            const userPosts = await PostModel.find({ userId });

            res.status(200).json({
                status: "success",
                message: "User posts fetched successfully",
                posts: userPosts
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "failed", message: "Unable to fetch user posts, please try again later" });
        }
    }

    // Fetch ALL Posts
    static getAllPosts = async (req, res) => {
        try {
            const posts = await PostModel.find();
            res.status(200).json({
                status: "success",
                message: "All posts fetched successfully",
                posts
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "failed", message: "Failed to fetch posts" });
        }
    }

    //delete Post
    static deletePost = async (req, res) => {
        try {
            // Extract post ID from request parameters
            const { id } = req.params;

            // Extract user ID from JWT token stored in the cookie
            const token = req.cookies.accessToken;
            if (!token) {
                return res.status(401).json({ status: "failed", message: "Unauthorized" });
            }

            const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
            const userId = decodedToken._id;

            if (!userId) {
                return res.status(401).json({ status: "failed", message: "Invalid token" });
            }

            // Find the post by ID
            const post = await PostModel.findById(id);

            if (!post) {
                return res.status(404).json({ status: "failed", message: "Post not found" });
            }

            // Ensure the user is authorized to delete the post
            if (post.userId.toString() !== userId) {
                return res.status(403).json({ status: "failed", message: "Forbidden: You can only delete your own posts" });
            }

            // Delete the post
            await PostModel.findByIdAndDelete(id);

            res.status(200).json({
                status: "success",
                message: "Post deleted successfully"
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "failed", message: "Unable to delete post, please try again later" });
        }
    }

    //Send email when submited
    static submitBookingRequest = async (req, res) => {
        try {
            const { postId, firstName, lastName, phoneNumber, age, email, city, pinCode, address } = req.body;
            if (!postId || !firstName || !lastName || !phoneNumber || !age || !email || !city || !pinCode || !address) {
                return res.status(400).json({ status: "failed", message: "All fields are required" });
            }
    
            const post = await PostModel.findById(postId);
            const user = await UserModel.findById(post.userId);
            const emailAddress = user.email;
    
            if (!post) {
                return res.status(404).json({ status: "failed", message: "Post not found" });
            }
    
            const bookingDetails = `
            <p>New Booking Request</p>
            <p>Car Model: ${post.model}</p>
            <p>First Name: ${firstName}</p>
            <p>Last Name: ${lastName}</p>
            <p>Phone Number: ${phoneNumber}</p>
            <p>Age: ${age}</p>
            <p>Email: ${email}</p>
            <p>City: ${city}</p>
            <p>PIN/ZIP Code: ${pinCode}</p>
            <p>Address: ${address}</p>
            `;
    
            // Send email to post owner
            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: emailAddress,
                subject: "New Booking Request",
                html: `${bookingDetails}
                <br/>
                <p><strong>IMPORTANT POINTS TO REMEMBER</strong></p>
                <p><strong>FUEL:</strong> In case you are returning the car at a lower fuel level than what was received, you will charge a flat Rs 500 refuelling service charge + actual fuel cost to get the tank to the same level as what was received</p>
                <p><strong>TOLLS, PARKING, INTER-STATE TAXES:</strong> To be paid by ${firstName} ${lastName}.</p>
                <p><strong>ID VERIFICATION:</strong>You as an executive will verify his/her original Driving License and ID proof (same as the ones whose details were provided while making the booking). This verification is mandatory. In the unfortunate case where you cannot show these documents, You will not hand over the car to him/her, and it will be treated as a late cancellation (100% of the fare would be payable). Driving license printed on A4 sheet of paper (original or otherwise) will not be considered as a valid document.</p>
                <p><strong>PRE-HANDOVER INSPECTION:</strong> Please inspect the car (including the fuel gauge and odometer) thoroughly before approving the checklist.</p>`
            });
    
            // Send confirmation email to the person who submitted the form
            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: "Booking Request Confirmation",
                html: `<p>Dear ${firstName} ${lastName},</p><p>Your booking request for the car model ${post.model} has been submitted successfully.</p>
                <br/>
                <p><strong>IMPORTANT POINTS TO REMEMBER</strong></p>
                <p><strong>CHANGE IN PRICING PLAN:</strong> Your pricing plan will change to 20 kms/hr if your modified booking duration is below 36 hours</p>
                <p><strong>FUEL:</strong> In case you are returning the car at a lower fuel level than what was received, we will charge a flat Rs 500 refuelling service charge + actual fuel cost to get the tank to the same level as what was received</p>
                <p><strong>TOLLS, PARKING, INTER-STATE TAXES:</strong> To be paid by you.</p>
                <p><strong>ID VERIFICATION:</strong> Please keep your original Driving License handy. While delivering the car to you, our executive will verify your original Driving License and ID proof (same as the ones whose details were provided while making the booking). This verification is mandatory. In the unfortunate case where you cannot show these documents, we will not be able to hand over the car to you, and it will be treated as a late cancellation (100% of the fare would be payable). Driving license printed on A4 sheet of paper (original or otherwise) will not be considered as a valid document.</p>
                <p><strong>PRE-HANDOVER INSPECTION:</strong> Please inspect the car (including the fuel gauge and odometer) thoroughly before approving the checklist.</p>`
            });
    
            res.status(200).json({ status: "success", message: "Booking request submitted successfully" });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "failed", message: "Unable to submit booking request, please try again later" });
        }
    }
}

export default PostController;
