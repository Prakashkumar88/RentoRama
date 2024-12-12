import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  IconUser,
  IconMail,
  IconArrowLeft,
  IconPhone,
  IconId,
  IconHome,
} from "@tabler/icons-react";
import UserPost from "../../components/UserPost";

const UserProfile = () => {
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Track image file
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    drivingLicense: "",
    aadhaarCard: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${BackendUrl}/user/me`, {
          withCredentials: true,
        });
        const userData = response.data.user;
        setProfileData({
          name: userData.name,
          surname: userData.surname,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          drivingLicense: userData.drivingLicense,
          aadhaarCard: userData.aadhaarCard,
          dob: new Date(userData.dob).toLocaleDateString(), // Convert to readable date format
          password: "",
          confirmPassword: "",
        });
        setProfileImage(userData.profileImage); // Set initial profile image
      } catch (error) {
        navigate("/signin");
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("profileImage", imageFile);

    try {
      await axios.post(`${BackendUrl}/user/upload-profile-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      // toast.success('Profile image uploaded successfully!');
    } catch (error) {
      // toast.error('Error uploading profile image!');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      await axios.post(
        `${BackendUrl}/user/change-userData`,
        {
          dob: profileData.dob,
          drivingLicense: profileData.drivingLicense,
          aadhaarCard: profileData.aadhaarCard,
        },
        { withCredentials: true }
      );
      toast.success("Profile data saved!");
      handleImageUpload(); // Upload image after saving profile data
    } catch (error) {
      toast.error("Error saving profile data!");
    }
  };

  const handleSavePassword = async () => {
    if (profileData.password !== profileData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post(
        `${BackendUrl}/user/change-password`,
        {
          password: profileData.password,
          password_confirmation: profileData.confirmPassword,
        },
        {
          withCredentials: true,
        }
      );
      setProfileData((prevData) => ({
        ...prevData,
        password: "",
        confirmPassword: "",
      }));
      setIsChangingPassword(false);
      toast.success("Password Saved", { duration: 4000, icon: "🔒" });
    } catch (error) {
      toast.error("Error changing password");
    }
  };

  return (
    <>
      <div className="container mx-auto mt-8">
        <div className="flex justify-start mb-4">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-800 transition-colors flex items-center"
          >
            <IconArrowLeft className="mr-2" />
            <IconHome className="mr-2" />
            <span className="mt-1">Back to Home</span>
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="h3 font-bold mb-5">Profile</h3>
          <div className="flex flex-col items-center mb-4 relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-36 h-36 rounded-full mb-2 object-cover"
              />
            ) : (
              <IconUser className="text-gray-400 mb-2" />
            )}
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full opacity-0 h-full cursor-pointer"
              />
            )}
            <h3 className="text-xl font-semibold">{`${profileData.name} ${profileData.surname}`}</h3>
            <p className="text-gray-600">{profileData.email}</p>
          </div>
          <div className="mb-4">
            <div className="flex mb-3">
              <IconMail className="mr-2 text-gray-600" />
              <p>{profileData.email}</p>
            </div>
            <div className="flex mb-3">
              <IconPhone className="mr-2 text-gray-600" />
              <p>{profileData.phoneNumber}</p>
            </div>
            <div className="flex mb-3">
              <IconId className="mr-2 text-gray-600" />
              {isEditing ? (
                <input
                  type="text"
                  name="drivingLicense"
                  value={profileData.drivingLicense}
                  onChange={handleInputChange}
                  className="border-b border-gray-300 focus:outline-none focus:border-n-1"
                />
              ) : (
                <p>Driving License: {profileData.drivingLicense}</p>
              )}
            </div>
            <div className="flex mb-3">
              <IconId className="mr-2 text-gray-600" />
              {isEditing ? (
                <input
                  type="text"
                  name="aadhaarCard"
                  value={profileData.aadhaarCard}
                  onChange={handleInputChange}
                  className="border-b border-gray-300 focus:outline-none focus:border-n-1"
                />
              ) : (
                <p>Aadhaar: {profileData.aadhaarCard}</p>
              )}
            </div>
            <div className="flex mb-2">
              <IconId className="mr-2 text-gray-600" />
              {isEditing ? (
                <input
                  type="text"
                  name="dob"
                  value={profileData.dob}
                  onChange={handleInputChange}
                  className="border-b border-gray-300 focus:outline-none focus:border-n-1"
                />
              ) : (
                <p>DOB: {profileData.dob}</p>
              )}
            </div>
            {isChangingPassword && (
              <>
                <div className="flex mb-3">
                  <IconId className="mr-2 text-gray-600" />
                  <input
                    type="password"
                    name="password"
                    value={profileData.password}
                    onChange={handleInputChange}
                    placeholder="New Password"
                    className="border-b border-gray-300 focus:outline-none focus:border-n-1"
                  />
                </div>
                <div className="flex mb-3">
                  <IconId className="mr-2 text-gray-600" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={profileData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                    className="border-b border-gray-300 focus:outline-none focus:border-n-1"
                  />
                </div>
              </>
            )}
          </div>
          <div className="flex justify-center">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-n-1 text-white font-bold py-2 px-4 rounded-md hover:bg-n-2 transition duration-300"
              >
                Save Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-n-1 text-white font-bold py-2 px-4 rounded-md hover:bg-n-2 transition duration-300"
              >
                Edit Profile
              </button>
            )}
          </div>
          <div className="flex justify-center mt-4">
            {isChangingPassword ? (
              <>
                <button
                  onClick={handleSavePassword}
                  className="bg-n-1 text-white font-bold py-2 px-4 rounded-md hover:bg-n-2 transition duration-300 mr-2"
                >
                  Save Password
                </button>
                <button
                  onClick={() => setIsChangingPassword(false)}
                  className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsChangingPassword(true)}
                className="bg-n-1 text-white font-bold py-2 px-4 rounded-md hover:bg-n-2 transition duration-300"
              >
                Change Password
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="p-8">
        <UserPost userName={profileData.name} />
      </div>
    </>
  );
};

export default UserProfile;
