import React, { useState } from 'react';
import { apiHandler } from '../api/bundle';

const UpdateProfile = () => {
  const [profileData, setProfileData] = useState({ firstName: '', lastName: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assuming the user ID is stored in local storage or obtained from user state
    const userId = localStorage.getItem('userId');
    try {
      const response = await apiHandler.updateProfile(userId, profileData);
      alert(response.message);
    } catch (error) {
      alert('Updating profile failed');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        value={profileData.firstName}
        onChange={handleInputChange}
        placeholder="First Name"
      />
      <input
        name="lastName"
        value={profileData.lastName}
        onChange={handleInputChange}
        placeholder="Last Name"
      />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateProfile;
