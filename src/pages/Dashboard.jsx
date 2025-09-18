import { useState } from "react";

function Dashboard() {
  const [teamData, setTeamData] = useState({
    teamSize: 4,
    abstract: "Our project focuses on developing an AI-powered solution for sustainable agriculture...",
    city: "Gudivada",
    college: "VKR VNB AGK COLLEGE OF ENGINEERING",
    confirmEmail: "krishnasri2k4@gmail.com",
    coupon: "HACK25",
    leadEmail: "krishnasri2k4@gmail.com",
    leadGender: "F",
    leadMobile: "6302962225",
    leadName: "PARASU DHANA NAGA KRISHNA SRI",
    leadPwd: "no",
    m1Email: "neelapalaharshamitra@gmail.com",
    m1Gender: "M",
    m1Mobile: "9704164951",
    m1Name: "NEELAPALA HARSHA MITRA",
    m1Pwd: "no",
    m2Email: "jujjuvarapumahalakshmi471@gmail.com",
    m2Gender: "F",
    m2Mobile: "7330836782",
    m2Name: "JUJJUVARAPU MAHA LAKSHMI",
    m2Pwd: "no",
    m3Email: "gunashekar3148@gmail.com",
    m3Gender: "M",
    m3Mobile: "7386402422",
    m3Name: "GUNASHEKAR",
    m3Pwd: "no",
    paymentStatus: "Verified",
    registrationStatus: "Completed",
    teamName: "TechInnovators",
    theme: "AI for Sustainable Agriculture",
  });

  const [editMode, setEditMode] = useState({
    teamInfo: false,
    lead: false,
    member1: false,
    member2: false,
    member3: false,
    abstract: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeamData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEditMode = (section) => {
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const saveChanges = (section) => {
    toggleEditMode(section);
    // Here you would typically send the updated data to your backend
    console.log(`Saved changes for ${section}:`, teamData);
  };

  return (
    <div className="fixed inset-0 z-30 overflow-y-auto py-32 pb-6 ms-5 me-5 [&::-webkit-scrollbar]:hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800/70 rounded-xl p-6 mb-6 border border-gray-700 shadow-lg">
          <h1 className="text-4xl font-bold text-yellow-400 text-center mb-2">TEAM DASHBOARD</h1>
          <div className="flex flex-wrap justify-between items-center mt-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">{teamData.teamName}</h2>
              <p className="text-gray-300">{teamData.theme}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="px-4 py-1 bg-green-600 text-white rounded-full text-sm font-medium">
                {teamData.registrationStatus}
              </span>
              <span className="px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-medium mt-2">
                Payment: {teamData.paymentStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Information Card */}
          <div className="bg-gray-800/70 rounded-xl p-6 border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Team Information</h2>
              <button
                onClick={() => editMode.teamInfo ? saveChanges('teamInfo') : toggleEditMode('teamInfo')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  editMode.teamInfo ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-600 hover:bg-blue-500'
                } text-white transition-colors`}
              >
                {editMode.teamInfo ? 'Save' : 'Edit'}
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">College</label>
                {editMode.teamInfo ? (
                  <input
                    type="text"
                    name="college"
                    value={teamData.college}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">{teamData.college}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
                {editMode.teamInfo ? (
                  <input
                    type="text"
                    name="city"
                    value={teamData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">{teamData.city}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Team Size</label>
                <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">{teamData.teamSize} Members</p>
              </div>
            </div>
          </div>

          {/* Team Lead Card */}
          <div className="bg-gray-800/70 rounded-xl p-6 border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Team Lead</h2>
              <button
                onClick={() => editMode.lead ? saveChanges('lead') : toggleEditMode('lead')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  editMode.lead ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'
                } text-white transition-colors`}
              >
                {editMode.lead ? 'Save' : 'Edit'}
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                {editMode.lead ? (
                  <input
                    type="text"
                    name="leadName"
                    value={teamData.leadName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">{teamData.leadName}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  {editMode.lead ? (
                    <input
                      type="email"
                      name="leadEmail"
                      value={teamData.leadEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">{teamData.leadEmail}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Mobile</label>
                  {editMode.lead ? (
                    <input
                      type="tel"
                      name="leadMobile"
                      value={teamData.leadMobile}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">{teamData.leadMobile}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
                  {editMode.lead ? (
                    <select
                      name="leadGender"
                      value={teamData.leadGender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                    </select>
                  ) : (
                    <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                      {teamData.leadGender === 'M' ? 'Male' : teamData.leadGender === 'F' ? 'Female' : 'Other'}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">PWD Status</label>
                  {editMode.lead ? (
                    <select
                      name="leadPwd"
                      value={teamData.leadPwd}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  ) : (
                    <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                      {teamData.leadPwd === 'yes' ? 'Yes' : 'No'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Member 1 Card */}
          <div className="bg-gray-800/70 rounded-xl p-6 border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Member 1</h2>
              <button
                onClick={() => editMode.member1 ? saveChanges('member1') : toggleEditMode('member1')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  editMode.member1 ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-600 hover:bg-blue-500'
                } text-white transition-colors`}
              >
                {editMode.member1 ? 'Save' : 'Edit'}
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                {editMode.member1 ? (
                  <input
                    type="text"
                    name="m1Name"
                    value={teamData.m1Name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">{teamData.m1Name}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  {editMode.member1 ? (
                    <input
                      type="email"
                      name="m1Email"
                      value={teamData.m1Email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">{teamData.m1Email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Mobile</label>
                  {editMode.member1 ? (
                    <input
                      type="tel"
                      name="m1Mobile"
                      value={teamData.m1Mobile}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">{teamData.m1Mobile}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
                  {editMode.member1 ? (
                    <select
                      name="m1Gender"
                      value={teamData.m1Gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                    </select>
                  ) : (
                    <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                      {teamData.m1Gender === 'M' ? 'Male' : teamData.m1Gender === 'F' ? 'Female' : 'Other'}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">PWD Status</label>
                  {editMode.member1 ? (
                    <select
                      name="m1Pwd"
                      value={teamData.m1Pwd}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  ) : (
                    <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                      {teamData.m1Pwd === 'yes' ? 'Yes' : 'No'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Member 2 Card */}
          <div className="bg-gray-800/70 rounded-xl p-6 border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Member 2</h2>
              <button
                onClick={() => editMode.member2 ? saveChanges('member2') : toggleEditMode('member2')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  editMode.member2 ? 'bg-green-600 hover:bg-green-500' : 'bg-yellow-600 hover:bg-yellow-500'
                } text-white transition-colors`}
              >
                {editMode.member2 ? 'Save' : 'Edit'}
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                {editMode.member2 ? (
                  <input
                    type="text"
                    name="m2Name"
                    value={teamData.m2Name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">{teamData.m2Name}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  {editMode.member2 ? (
                    <input
                      type="email"
                      name="m2Email"
                      value={teamData.m2Email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">{teamData.m2Email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Mobile</label>
                  {editMode.member2 ? (
                    <input
                      type="tel"
                      name="m2Mobile"
                      value={teamData.m2Mobile}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">{teamData.m2Mobile}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
                  {editMode.member2 ? (
                    <select
                      name="m2Gender"
                      value={teamData.m2Gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                    </select>
                  ) : (
                    <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                      {teamData.m2Gender === 'M' ? 'Male' : teamData.m2Gender === 'F' ? 'Female' : 'Other'}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">PWD Status</label>
                  {editMode.member2 ? (
                    <select
                      name="m2Pwd"
                      value={teamData.m2Pwd}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  ) : (
                    <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                    {teamData.m1Pwd === 'yes' ? 'Yes' : 'No'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Member 3 Card (if team size is 4) */}
          {teamData.teamSize === 4 && (
            <div className="bg-gray-800/70 rounded-xl p-6 border border-gray-700 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Member 3</h2>
                <button
                  onClick={() => editMode.member3 ? saveChanges('member3') : toggleEditMode('member3')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    editMode.member3 ? 'bg-green-600 hover:bg-green-500' : 'bg-green-600 hover:bg-green-500'
                  } text-white transition-colors`}
                >
                  {editMode.member3 ? 'Save' : 'Edit'}
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  {editMode.member3 ? (
                    <input
                      type="text"
                      name="m3Name"
                      value={teamData.m3Name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">{teamData.m3Name}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    {editMode.member3 ? (
                      <input
                        type="email"
                        name="m3Email"
                        value={teamData.m3Email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">{teamData.m3Email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Mobile</label>
                    {editMode.member3 ? (
                      <input
                        type="tel"
                        name="m3Mobile"
                        value={teamData.m3Mobile}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">{teamData.m3Mobile}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
                    {editMode.member3 ? (
                      <select
                        name="m3Gender"
                        value={teamData.m3Gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                      </select>
                    ) : (
                      <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                        {teamData.m3Gender === 'M' ? 'Male' : teamData.m3Gender === 'F' ? 'Female' : 'Other'}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">PWD Status</label>
                    {editMode.member3 ? (
                      <select
                        name="m3Pwd"
                        value={teamData.m3Pwd}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    ) : (
                      <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                        {teamData.m3Pwd === 'yes' ? 'Yes' : 'No'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Abstract Card */}
          <div className="bg-gray-800/70 rounded-xl p-6 border border-gray-700 shadow-lg lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Project Abstract</h2>
              <button
                onClick={() => editMode.abstract ? saveChanges('abstract') : toggleEditMode('abstract')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  editMode.abstract ? 'bg-green-600 hover:bg-green-500' : 'bg-orange-600 hover:bg-orange-500'
                } text-white transition-colors`}
              >
                {editMode.abstract ? 'Save' : 'Edit'}
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Abstract</label>
              {editMode.abstract ? (
                <textarea
                  name="abstract"
                  value={teamData.abstract}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              ) : (
                <p className="text-white bg-gray-700/50 px-4 py-4 rounded-lg whitespace-pre-wrap">{teamData.abstract}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;