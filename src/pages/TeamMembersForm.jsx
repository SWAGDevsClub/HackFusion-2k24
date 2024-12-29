import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TeamMembersForm = () => {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentMember, setCurrentMember] = useState({
    name: "",
    gender: "",
    email: "",
    phone: "",
  });

  const [currentIndex, setCurrentIndex] = useState(1); // To track the current member being added
  const teamDetails = JSON.parse(localStorage.getItem("teamDetails"));

  const handleChange = (e) => {
    setCurrentMember({
      ...currentMember,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddMember = () => {
    // Add the current member to the team members array
    setTeamMembers([...teamMembers, currentMember]);

    // Reset the currentMember state for the next input
    setCurrentMember({
      name: "",
      gender: "",
      email: "",
      phone: "",
    });

    // If it's the 3rd member, we submit automatically
    if (currentIndex === 3) {
      handleSubmit();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmit = () => {
    // Combine data from localStorage with team members
    const finalData = {
      ...teamDetails,
      teamMembers,
    };

    console.log("Final Registration Data:", finalData);

    // Save the data to localStorage (optional)
    localStorage.setItem("finalRegistrationData", JSON.stringify(finalData));

    // Clear localStorage
    localStorage.removeItem("teamDetails");

    alert("Registration Successful!");
    navigate("/success"); // Navigate to a success page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#200f31] to-[#613b69]">
      <div className="bg-pink-200 shadow-md rounded px-8 py-6 w-96">
        <h2 className="text-2xl font-squid text-center mb-4">
          Add Team Member {currentIndex}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddMember();
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-squid mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={currentMember.name}
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
                  value={currentMember.gender}
                  onChange={handleChange}
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
            <label className="block text-gray-700 text-sm font-squid mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={currentMember.email}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-squid mb-2">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={currentMember.phone}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-700 font-squid"
          >
            {currentIndex < 3 ? "Add Member" : "Submit"}
          </button>
        </form>
        {teamMembers.length > 0 && (
          <div className="mt-4">
            <h3 className="font-squid text-gray-800 text-lg">Team Members Added:</h3>
            <ul className="list-disc ml-6">
              {teamMembers.map((member, index) => (
                <li key={index} className="text-gray-700">
                  {member.name} - {member.email} - {member.phone}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMembersForm;
