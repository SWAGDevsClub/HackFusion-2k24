import { useState } from 'react';

function Register() {
  const [activeTab, setActiveTab] = useState('lead');
  const [formData, setFormData] = useState({
    abstract: "",
    city: "Gudivada ",
    college: "VKR VNB AGK COLLEGE OF ENGINEERING",
    confirmEmail: "krishnasri2k4@gmail.com",
    coupon: "",
    leadEmail: "krishnasri2k4@gmail.com",
    leadGender: "F",
    leadMobile: "6302962225",
    leadName: "PARASU DHANA NAGA KRISHNA SRI",
    m1Email: "neelapalaharshamitra@gmail.com",
    m1Gender: "M",
    m1Mobile: "9704164951",
    m1Name: "NEELAPALA HARSHA MITRA",
    m2Email: "jujjuvarapumahalakshmi471@gmail.com",
    m2Gender: "F",
    m2Mobile: "7330836782",
    m2Name: "JUJJUVARAPU MAHA LAKSHMI",
    m3Email: "gunashekar3148@gmail.com",
    m3Gender: "M",
    m3Mobile: "7386402422",
    leadImage: null,
    m1Image: null,
    m2Image: null,
    m3Image: null
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission here
  };

  const tabs = [
    { id: 'lead', label: 'Team Lead', color: 'bg-red-600' },
    { id: 'member1', label: 'Member 1', color: 'bg-blue-600' },
    { id: 'member2', label: 'Member 2', color: 'bg-yellow-600' },
    { id: 'member3', label: 'Member 3', color: 'bg-green-600' },
    { id: 'team', label: 'Team Info', color: 'bg-purple-600' },
    { id: 'abstract', label: 'Abstract', color: 'bg-orange-600' }
  ];

  return (
    <div className="absolute py-32 z-30 inset-0 pb-6">
      <div className="max-w-4xl mx-auto bg-gray-800/70 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="bg-gray-900/70 py-4 px-6 text-center relative border-b border-gray-700">
          <h1 className="text-3xl font-bold text-yellow-400 drop-shadow-md">
            POKÉMON REGISTRATION
          </h1>
          <p className="text-gray-300 mt-1">Gotta catch &apos;em all!</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap bg-gray-900/70 border-b border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? `${tab.color} text-white`
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              } rounded-t-lg mt-1 ms-1 me-1`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Lead Tab */}
          {activeTab === 'lead' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-red-400 mb-4">Team Lead Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="leadName"
                    value={formData.leadName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="leadEmail"
                    value={formData.leadEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Mobile</label>
                  <input
                    type="tel"
                    name="leadMobile"
                    value={formData.leadMobile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
                  <select
                    name="leadGender"
                    value={formData.leadGender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Photo</label>
                  <input
                    type="file"
                    name="leadImage"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Member 1 Tab */}
          {activeTab === 'member1' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">Member 1 Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="m1Name"
                    value={formData.m1Name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="m1Email"
                    value={formData.m1Email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Mobile</label>
                  <input
                    type="tel"
                    name="m1Mobile"
                    value={formData.m1Mobile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
                  <select
                    name="m1Gender"
                    value={formData.m1Gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Photo</label>
                  <input
                    type="file"
                    name="m1Image"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Member 2 Tab */}
          {activeTab === 'member2' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Member 2 Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="m2Name"
                    value={formData.m2Name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="m2Email"
                    value={formData.m2Email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Mobile</label>
                  <input
                    type="tel"
                    name="m2Mobile"
                    value={formData.m2Mobile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
                  <select
                    name="m2Gender"
                    value={formData.m2Gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Photo</label>
                  <input
                    type="file"
                    name="m2Image"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-gray-900 hover:file:bg-yellow-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Member 3 Tab */}
          {activeTab === 'member3' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Member 3 Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="m3Name"
                    value={formData.m3Name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="m3Email"
                    value={formData.m3Email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Mobile</label>
                  <input
                    type="tel"
                    name="m3Mobile"
                    value={formData.m3Mobile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
                  <select
                    name="m3Gender"
                    value={formData.m3Gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Photo</label>
                  <input
                    type="file"
                    name="m3Image"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Team Info Tab */}
          {activeTab === 'team' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">Team Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">College</label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Email</label>
                  <input
                    type="email"
                    name="confirmEmail"
                    value={formData.confirmEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Coupon Code</label>
                  <input
                    type="text"
                    name="coupon"
                    value={formData.coupon}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Abstract Tab */}
          {activeTab === 'abstract' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-orange-400 mb-4">Abstract Submission</h2>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Abstract</label>
                <textarea
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleInputChange}
                  rows="8"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your abstract here..."
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => {
                const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
                if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1].id);
              }}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Previous
            </button>
            
            <button
              type="button"
              onClick={() => {
                const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
                if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1].id);
              }}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
            >
              Next
            </button>
          </div>

          {/* Submit Button */}
          {activeTab === 'abstract' && (
            <div className="text-center mt-6">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-yellow-600 text-white font-bold rounded-lg hover:from-red-500 hover:to-yellow-500 transition-all"
              >
                Submit Registration
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register; 
