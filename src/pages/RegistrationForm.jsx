import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    teamLeaderName: "",
    teamLeaderGender: "",
    teamLeaderEmail: "",
    teamLeaderPhone: "",
    teamMembers: [
      { name: "", gender: "", email: "", phone: "" },
      { name: "", gender: "", email: "", phone: "" },
      { name: "", gender: "", email: "", phone: "" },
    ],
    college: "",
    city: "",
    abstract: "Develop a platform to connect local farmers directly with consumers to promote fresh, organic, and affordable produce while minimizing supply chain inefficiencies and middlemen. (This is not a final problem statement. Final problem statement will be provided before 5 days of hackathon)",
    paymentReferenceNumber: "",
    paymentScreenshot: null,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index === null) {
      // Update general fields
      setFormData({ ...formData, [name]: value });
    } else {
      // Update team member fields
      const updatedTeamMembers = [...formData.teamMembers];
      updatedTeamMembers[index][name] = value;
      setFormData({ ...formData, teamMembers: updatedTeamMembers });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, paymentScreenshot: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Form Data:", formData);
    alert("Registration Successful!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#200f31] to-[#613b69] overflow-auto" >
      <form
        onSubmit={handleSubmit}
        className="bg-pink-600 shadow-md rounded px-8 py-6 w-full max-w-full overflow-y-auto"
      >
        <h2 className="text-2xl font-squid text-center mb-6">
          Hackfusion Registration
        </h2>

        {/* Row Layout for Team Leader and Members */}
        <div className="flex flex-wrap gap-4">
          {/* Team Leader Section */}
          <div  
  className="flex-1 bg-white p-6 rounded-xl shadow-md group transition-all hover:shadow-2xl hover:scale-105 hover:ring-2 hover:ring-purple-400"
>
            <h3 className="text-lg font-squid mb-4 text-center">
              Team Leader Details
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-squid mb-2">
                Team Name
              </label>
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
              <label className="block text-gray-700 text-sm font-squid mb-2">
                Team Leader Name
              </label>
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
                name="teamLeaderGender"
                value={formData.teamLeaderGender}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-squid mb-2">
                Email
              </label>
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
              <label className="block text-gray-700 text-sm font-squid mb-2">
                Phone
              </label>
              <input
                type="text"
                name="teamLeaderPhone"
                value={formData.teamLeaderPhone}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
          </div>

          {/* Team Members Section */}
          {formData.teamMembers.map((member, index) => (
            <div
                key={index}
            className="flex-1 bg-white p-6 rounded-xl shadow-md group transition-all hover:shadow-2xl hover:scale-105 hover:ring-2 hover:ring-purple-400"
            >
              <h3 className="text-lg font-squid mb-4 text-center">
                Team Member {index + 1}
              </h3>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-squid mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={member.name}
                  onChange={(e) => handleChange(e, index)}
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
                  value={member.gender}
                  onChange={(e) => handleChange(e, index)}
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
                  value={member.email}
                  onChange={(e) => handleChange(e, index)}
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
                  value={member.phone}
                  onChange={(e) => handleChange(e, index)}
                  className="border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Inputs */}
        <div className="mt-6">
          <div className="mb-4">
            <label className="block text-black text-sm font-squid mb-2">
              College
            </label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-black0"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-squid mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-squid mb-2">
              Abstract
            </label>
            <textarea
              name="abstract"
              value={formData.abstract}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-black"
              rows="5"
              style={{ resize: "none" }}
              disabled
            />
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-black text-sm font-squid mb-2">
                Payment Reference Number
              </label>
              <input
                type="text"
                name="paymentReferenceNumber"
                value={formData.paymentReferenceNumber}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-black"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-black text-sm font-squid mb-2">
                Payment Screenshot
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="border rounded w-full py-2 px-3 text-black"
                required
              />
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-black text-sm font-squid mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-black"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-black text-sm font-squid mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-black"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-8 hover:bg-indigo-700 transition-all font-semibold"
          >
          Submit Registration
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;