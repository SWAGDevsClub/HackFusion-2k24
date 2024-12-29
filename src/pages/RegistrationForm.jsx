import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    teamLeaderName: "",
    teamLeaderGender: "",
    teamLeaderEmail: "",
    teamLeaderPhone: "",
  },
  {
    teamName: "",
    teamLeaderName: "",
    teamLeaderEmail: "",
    teamLeaderPhone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTeamMembers = () => {
    localStorage.setItem("teamDetails", JSON.stringify(formData));
    navigate("/team-members");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#200f31] to-[#613b69]">
      <div className="bg-pink-200 shadow-md rounded px-8 py-6 w-96">
        <h2 className="text-2xl font-squid text-center mb-4">Hackfusion Registration</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-squid mb-2">Team Name</label>
            <input
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-squid mb-2">Team Leader Name</label>
            <input
              type="text"
              name="teamLeaderName"
              value={formData.teamLeaderName}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
                <label className="block text-gray-700 text-sm font-squid mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.teamLeaderGender}
                  onChange={(e) => handleChange(index, e)}
                  className="border rounded w-full py-2 px-3 text-gray-700"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-squid mb-2">Team Leader Email</label>
            <input
              type="email"
              name="teamLeaderEmail"
              value={formData.teamLeaderEmail}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-squid mb-2">Team Leader Phone Number</label>
            <input
              type="text"
              name="teamLeaderPhone"
              value={formData.teamLeaderPhone}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
         
          <button
            type="submit"
            onClick={handleAddTeamMembers}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 font-squid"
          >
            Add Team Members
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
