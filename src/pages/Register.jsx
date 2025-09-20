import { useState } from "react";

function Register() {
  const [teamSize, setTeamSize] = useState(4); // Default to 4 members
  const [activeTab, setActiveTab] = useState("teamSize");
  const [formData, setFormData] = useState({
    teamSize: 4,
    abstract: "",
    city: "Gudivada ",
    college: "VKR VNB AGK COLLEGE OF ENGINEERING",
    confirmEmail: "krishnasri2k4@gmail.com",
    coupon: "",
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
    m3Name: "",
    m3Pwd: "no",
    password: "",
    confirmPassword: "",
    leadImage: null,
    m1Image: null,
    m2Image: null,
    m3Image: null,
    paymentScreenshot: null,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleTeamSizeChange = (size) => {
    setTeamSize(size);
    setFormData((prev) => ({ ...prev, teamSize: size }));
    setActiveTab("lead");
  };

  const validateCurrentTab = () => {
    const newErrors = {};

    switch (activeTab) {
      case "lead":
        if (!formData.leadName.trim()) newErrors.leadName = "Full name is required";
        if (!formData.leadEmail.trim()) newErrors.leadEmail = "Email is required";
        if (!formData.leadMobile.trim()) newErrors.leadMobile = "Mobile number is required";
        if (!formData.password.trim()) newErrors.password = "Password is required";
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Please confirm your password";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        break;

      case "member1":
        if (!formData.m1Name.trim()) newErrors.m1Name = "Full name is required";
        if (!formData.m1Email.trim()) newErrors.m1Email = "Email is required";
        if (!formData.m1Mobile.trim()) newErrors.m1Mobile = "Mobile number is required";
        break;

      case "member2":
        if (!formData.m2Name.trim()) newErrors.m2Name = "Full name is required";
        if (!formData.m2Email.trim()) newErrors.m2Email = "Email is required";
        if (!formData.m2Mobile.trim()) newErrors.m2Mobile = "Mobile number is required";
        break;

      case "member3":
        if (teamSize === 4) {
          if (!formData.m3Name.trim()) newErrors.m3Name = "Full name is required";
          if (!formData.m3Email.trim()) newErrors.m3Email = "Email is required";
          if (!formData.m3Mobile.trim()) newErrors.m3Mobile = "Mobile number is required";
        }
        break;

      case "team":
        if (!formData.college.trim()) newErrors.college = "College name is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.confirmEmail.trim()) newErrors.confirmEmail = "Confirm email is required";
        if (formData.confirmEmail !== formData.leadEmail) {
          newErrors.confirmEmail = "Email confirmation doesn't match lead email";
        }
        break;

      case "abstract":
        if (!formData.abstract.trim()) newErrors.abstract = "Abstract is required";
        if (formData.abstract.trim().length < 100) {
          newErrors.abstract = "Abstract must be at least 100 characters";
        }
        break;

      case "payment":
        if (!formData.paymentScreenshot) newErrors.paymentScreenshot = "Payment screenshot is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation before submission
    if (!validateCurrentTab()) {
      return;
    }
    
    // Additional check for password match
    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      return;
    }
  
    try {
      const formDataToSend = new FormData();
  
      // Append normal fields
      formDataToSend.append("theme", "AI in Healthcare"); // Or bind from your UI if needed
      formDataToSend.append("abstract", formData.abstract);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("college", formData.college);
      formDataToSend.append("coupon", formData.coupon);
      formDataToSend.append("teamSize", formData.teamSize);
      formDataToSend.append("password", formData.password);
  
      // Lead
      formDataToSend.append("leadName", formData.leadName);
      formDataToSend.append("leadEmail", formData.leadEmail);
      formDataToSend.append("leadMobile", formData.leadMobile);
      formDataToSend.append("leadGender", formData.leadGender);
      formDataToSend.append("leadIsPwd", formData.leadPwd === "yes" ? 1 : 0);
  
      // Member 1
      formDataToSend.append("m1Name", formData.m1Name);
      formDataToSend.append("m1Email", formData.m1Email);
      formDataToSend.append("m1Mobile", formData.m1Mobile);
      formDataToSend.append("m1Gender", formData.m1Gender);
      formDataToSend.append("m1IsPwd", formData.m1Pwd === "yes" ? 1 : 0);
  
      // Member 2
      formDataToSend.append("m2Name", formData.m2Name);
      formDataToSend.append("m2Email", formData.m2Email);
      formDataToSend.append("m2Mobile", formData.m2Mobile);
      formDataToSend.append("m2Gender", formData.m2Gender);
      formDataToSend.append("m2IsPwd", formData.m2Pwd === "yes" ? 1 : 0);
  
      // Member 3 (only if teamSize === 4)
      if (formData.teamSize === 4) {
        formDataToSend.append("m3Name", formData.m3Name);
        formDataToSend.append("m3Email", formData.m3Email);
        formDataToSend.append("m3Mobile", formData.m3Mobile);
        formDataToSend.append("m3Gender", formData.m3Gender);
        formDataToSend.append("m3IsPwd", formData.m3Pwd === "yes" ? 1 : 0);
      }
  
      // Files
      if (formData.leadImage)
        formDataToSend.append("leadProfilePic", formData.leadImage);
      if (formData.m1Image)
        formDataToSend.append("m1ProfilePic", formData.m1Image);
      if (formData.m2Image)
        formDataToSend.append("m2ProfilePic", formData.m2Image);
      if (formData.m3Image)
        formDataToSend.append("m3ProfilePic", formData.m3Image);
      if (formData.paymentScreenshot)
        formDataToSend.append("paymentProof", formData.paymentScreenshot);
  
      // API Request
      const response = await fetch("https://swagserver.co.in/hackfusion/register.php", {
        method: "POST",
        body: formDataToSend,
      });
  
      const result = await response.json();
      console.log("Response:", result);
  
      if (result.success) {
        alert(`Registration successful! Team ID: ${result.data.team_id}`);
      } else {
        alert(`Registration failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong while submitting the form.");
    }
  };

  const handleTabNavigation = (direction) => {
    if (direction === 'next') {
      if (!validateCurrentTab()) {
        return;
      }
    }

    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (direction === 'next' && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    } else if (direction === 'prev' && currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const renderImagePreview = (imageName, imageFile) => {
    if (!imageFile) return null;
    
    return (
      <div className="mt-2">
        <p className="text-sm text-green-400">Selected: {imageFile.name}</p>
      </div>
    );
  };

  const tabs = [
    { id: "teamSize", label: "Team Size", color: "bg-gray-600" },
    { id: "lead", label: "Team Lead", color: "bg-red-600" },
    { id: "member1", label: "Member 1", color: "bg-blue-600" },
    { id: "member2", label: "Member 2", color: "bg-yellow-600" },
    ...(teamSize === 4
      ? [{ id: "member3", label: "Member 3", color: "bg-green-600" }]
      : []),
    { id: "team", label: "Team Info", color: "bg-purple-600" },
    { id: "abstract", label: "Abstract", color: "bg-orange-600" },
    { id: "payment", label: "Payment", color: "bg-pink-600" },
  ];

  const isLastTab = activeTab === tabs[tabs.length - 1].id;

  return (
    <div className="fixed inset-0 z-30 overflow-y-auto py-32 pb-6 m-5 [&::-webkit-scrollbar]:hidden">
      <div className="max-w-4xl mx-auto bg-gray-800/80 rounded-xl shadow-2xl overflow-hidden border border-gray-700 border-yellow-500 border-4 ">
        {/* Header */}
        <div className="bg-gray-900/70 py-4 px-6 text-center relative border-b border-gray-700">
          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-red-600 rounded-full opacity-30"></div>
          <img
              src="/logon.png"
              className="h-10 w-auto sm:h-5 md:h-auto md:w-[250px] ms-auto  me-auto items-center justify-center"
              alt="Logo"
              data-aos="flip-right"
            />
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto bg-gray-900/70 border-b border-gray-700 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-6 py-3 font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? `${tab.color} text-white`
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              } rounded-t-lg mt-1 ms-1 me-1`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Team Size Selection Tab */}
          {activeTab === "teamSize" && (
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-bold text-gray-300 mb-6">
                Select Team Size
              </h2>
              <div className="flex justify-center gap-8">
                <button
                  type="button"
                  onClick={() => handleTeamSizeChange(3)}
                  className={`px-8 py-4 rounded-lg transition-all duration-300 ${
                    teamSize === 3
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  <span className="text-xl font-bold">3 Members</span>
                  <p className="text-sm mt-2">Team Lead + 2 Members</p>
                </button>
                <button
                  type="button"
                  onClick={() => handleTeamSizeChange(4)}
                  className={`px-8 py-4 rounded-lg transition-all duration-300 ${
                    teamSize === 4
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  <span className="text-xl font-bold">4 Members</span>
                  <p className="text-sm mt-2">Team Lead + 3 Members</p>
                </button>
              </div>
              <p className="text-gray-400 mt-6">
                Select your team size to continue with registration
              </p>
            </div>
          )}

          {/* Lead Tab */}
          {activeTab === "lead" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-red-400 mb-4">
                Team Lead Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="leadName"
                    value={formData.leadName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.leadName ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                  />
                  {errors.leadName && <p className="text-red-400 text-sm mt-1">{errors.leadName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="leadEmail"
                    value={formData.leadEmail}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.leadEmail ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                  />
                  {errors.leadEmail && <p className="text-red-400 text-sm mt-1">{errors.leadEmail}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Mobile *
                  </label>
                  <input
                    type="tel"
                    name="leadMobile"
                    value={formData.leadMobile}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.leadMobile ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                  />
                  {errors.leadMobile && <p className="text-red-400 text-sm mt-1">{errors.leadMobile}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.password ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                    minLength={6}
                  />
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                    minLength={6}
                  />
                  {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Gender
                  </label>
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
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    PWD (Person with Disability)
                  </label>
                  <select
                    name="leadPwd"
                    value={formData.leadPwd}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Photo (Optional)
                  </label>
                  <input
                    type="file"
                    name="leadImage"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600"
                  />
                  {renderImagePreview("leadImage", formData.leadImage)}
                </div>
              </div>
            </div>
          )}

          {/* Member 1 Tab */}
          {activeTab === "member1" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">
                Member 1 Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="m1Name"
                    value={formData.m1Name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.m1Name ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                  />
                  {errors.m1Name && <p className="text-red-400 text-sm mt-1">{errors.m1Name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="m1Email"
                    value={formData.m1Email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.m1Email ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                  />
                  {errors.m1Email && <p className="text-red-400 text-sm mt-1">{errors.m1Email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Mobile *
                  </label>
                  <input
                    type="tel"
                    name="m1Mobile"
                    value={formData.m1Mobile}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.m1Mobile ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                  />
                  {errors.m1Mobile && <p className="text-red-400 text-sm mt-1">{errors.m1Mobile}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Gender
                  </label>
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
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    PWD (Person with Disability)
                  </label>
                  <select
                    name="m1Pwd"
                    value={formData.m1Pwd}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Photo (Optional)
                  </label>
                  <input
                    type="file"
                    name="m1Image"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                  />
                  {renderImagePreview("m1Image", formData.m1Image)}
                </div>
              </div>
            </div>
          )}

          {/* Member 2 Tab */}
          {activeTab === "member2" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                Member 2 Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="m2Name"
                    value={formData.m2Name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      errors.m2Name ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                  />
                  {errors.m2Name && <p className="text-red-400 text-sm mt-1">{errors.m2Name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="m2Email"
                    value={formData.m2Email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      errors.m2Email ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                  />
                  {errors.m2Email && <p className="text-red-400 text-sm mt-1">{errors.m2Email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Mobile *
                  </label>
                  <input
                    type="tel"
                    name="m2Mobile"
                    value={formData.m2Mobile}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      errors.m2Mobile ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                  />
                  {errors.m2Mobile && <p className="text-red-400 text-sm mt-1">{errors.m2Mobile}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Gender
                  </label>
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
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    PWD (Person with Disability)
                  </label>
                  <select
                    name="m2Pwd"
                    value={formData.m2Pwd}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Photo (Optional)
                  </label>
                  <input
                    type="file"
                    name="m2Image"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-gray-900 hover:file:bg-yellow-600"
                  />
                  {renderImagePreview("m2Image", formData.m2Image)}
                </div>
              </div>
            </div>
          )}

          {/* Member 3 Tab - only shown if team size is 4 */}
          {activeTab === "member3" && teamSize === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-green-400 mb-4">
                Member 3 Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="m3Name"
                    value={formData.m3Name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.m3Name ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                  />
                  {errors.m3Name && <p className="text-red-400 text-sm mt-1">{errors.m3Name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="m3Email"
                    value={formData.m3Email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.m3Email ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                  />
                  {errors.m3Email && <p className="text-red-400 text-sm mt-1">{errors.m3Email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Mobile *
                  </label>
                  <input
                    type="tel"
                    name="m3Mobile"
                    value={formData.m3Mobile}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.m3Mobile ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                  />
                  {errors.m3Mobile && <p className="text-red-400 text-sm mt-1">{errors.m3Mobile}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Gender
                  </label>
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
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    PWD (Person with Disability)
                  </label>
                  <select
                    name="m3Pwd"
                    value={formData.m3Pwd}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Photo (Optional)
                  </label>
                  <input
                    type="file"
                    name="m3Image"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600"
                  />
                  {renderImagePreview("m3Image", formData.m3Image)}
                </div>
              </div>
            </div>
          )}

          {/* Team Info Tab */}
          {activeTab === "team" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">
                Team Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    College *
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.college ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                  />
                  {errors.college && <p className="text-red-400 text-sm mt-1">{errors.college}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.city ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                  />
                  {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Confirm Email *
                  </label>
                  <input
                    type="email"
                    name="confirmEmail"
                    value={formData.confirmEmail}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.confirmEmail ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                  />
                  {errors.confirmEmail && <p className="text-red-400 text-sm mt-1">{errors.confirmEmail}</p>}
                  <p className="text-sm text-gray-400 mt-1">Must match team lead email</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Coupon Code (Optional)
                  </label>
                  <input
                    type="text"
                    name="coupon"
                    value={formData.coupon}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter coupon code if available"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Abstract Tab */}
          {activeTab === "abstract" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-orange-400 mb-4">
                Abstract Submission
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Project Abstract * (Minimum 100 characters)
                </label>
                <textarea
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleInputChange}
                  rows="8"
                  className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    errors.abstract ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Describe your project idea, approach, and expected outcomes..."
                  required
                  minLength={100}
                />
                {errors.abstract && <p className="text-red-400 text-sm mt-1">{errors.abstract}</p>}
                <p className="text-sm text-gray-400 mt-1">
                  Current length: {formData.abstract.length} characters
                </p>
              </div>
            </div>
          )}

          {/* Payment Tab */}
          {activeTab === "payment" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-pink-400 mb-4">
                Payment Information
              </h2>

              <div className="bg-gray-900/70 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">
                  Payment Instructions
                </h3>
                <div className="space-y-3 text-gray-300">
                  <p>1. Scan the QR code below using your UPI payment app</p>
                  <p>2. Pay the registration fee of ₹500 per team</p>
                  <p>3. Take a screenshot of the successful payment</p>
                  <p>4. Upload the screenshot below</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <div className="w-48 h-48 bg-gray-300 flex items-center justify-center text-gray-600 rounded-lg">
                      <div className="text-center">
                        <p className="font-bold">UPI QR Code</p>
                        <p className="text-sm mt-2">Scan to Pay ₹500</p>
                      </div>
                    </div>
                    <p className="text-center font-semibold mt-2 text-black">
                      Registration Fee: ₹500
                    </p>
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Payment Screenshot *
                    </label>
                    <input
                      type="file"
                      name="paymentScreenshot"
                      onChange={handleInputChange}
                      accept="image/*"
                      className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-pink-600 ${
                        errors.paymentScreenshot ? 'border-red-500' : 'border-gray-600'
                      }`}
                      required
                    />
                    {errors.paymentScreenshot && <p className="text-red-400 text-sm mt-1">{errors.paymentScreenshot}</p>}
                    {renderImagePreview("paymentScreenshot", formData.paymentScreenshot)}
                    <p className="text-sm text-gray-400 mt-2">
                      Upload a clear screenshot of your successful payment transaction
                    </p>

                    {/* Submit Button */}
                    {isLastTab && (
                      <div className="text-center mt-6">
                        <button
                          type="submit"
                          className="px-8 py-3 bg-gradient-to-r from-red-600 to-yellow-600 text-white font-bold rounded-lg hover:from-red-500 hover:to-yellow-500 transition-all shadow-lg"
                        >
                          Submit Registration
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => handleTabNavigation('prev')}
              disabled={activeTab === 'teamSize'}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'teamSize'
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              Previous
            </button>

            {!isLastTab && (
              <button
                type="button"
                onClick={() => handleTabNavigation('next')}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;