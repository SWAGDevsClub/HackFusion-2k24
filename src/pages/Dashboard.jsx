import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Camera, X, Check, Crop } from "lucide-react";

function Dashboard() {
  const [teamData, setTeamData] = useState(null);
  const [editMode, setEditMode] = useState({
    teamInfo: false,
    lead: false,
    member1: false,
    member2: false,
    member3: false,
    abstract: false,
  });

  const [imageEditMode, setImageEditMode] = useState({
    lead: false,
    member1: false,
    member2: false,
    member3: false,
  });

  const [croppingMode, setCroppingMode] = useState({
    lead: false,
    member1: false,
    member2: false,
    member3: false,
  });

  const [cropPosition, setCropPosition] = useState({
    lead: { x: 0, y: 0 },
    member1: { x: 0, y: 0 },
    member2: { x: 0, y: 0 },
    member3: { x: 0, y: 0 },
  });

  const [cropSize, setCropSize] = useState({
    lead: 100,
    member1: 100,
    member2: 100,
    member3: 100,
  });

  const [isDragging, setIsDragging] = useState({
    lead: false,
    member1: false,
    member2: false,
    member3: false,
  });

  const [dragStart, setDragStart] = useState({
    lead: { x: 0, y: 0 },
    member1: { x: 0, y: 0 },
    member2: { x: 0, y: 0 },
    member3: { x: 0, y: 0 },
  });

  const cropContainerRefs = {
    lead: useRef(null),
    member1: useRef(null),
    member2: useRef(null),
    member3: useRef(null),
  };

  const [selectedImages, setSelectedImages] = useState({
    lead: null,
    member1: null,
    member2: null,
    member3: null,
  });

  const canvasRef = useRef(null);
  const fileInputRefs = {
    lead: useRef(null),
    member1: useRef(null),
    member2: useRef(null),
    member3: useRef(null),
  };

  const navigate = useNavigate();
  const [isLead, setIsLead] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get token from localStorage (set during login)
    const token = localStorage.getItem("authToken");
    const userIdFromStorage = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).member_id
      : null;
    const isLeadFromStorage = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).is_lead
      : null;
    setIsLead(isLeadFromStorage);
    setUserId(userIdFromStorage);

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(
        `https://swagserver.co.in/hackfusion/get_dashboard.php?token=${token}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          // Transform the API response to match the expected format
          const data = res.data.data;
          const leadMember = data.members.find(
            (member) => member.is_lead === 1
          );
          const otherMembers = data.members.filter(
            (member) => member.is_lead === 0
          );

          const transformedData = {
            teamName: data.team_name,
            theme: data.theme,
            abstract: data.abstract,
            teamSize: data.team_size,
            city: data.city,
            college: data.college,
            coupon: data.coupon,
            paymentStatus: data.payment_status,
            registrationStatus: data.registration_status,
            teamLogo: data.team_logo,
            paymentProof: data.payment_proof,

            // Lead member details
            leadId: leadMember?.member_id || "",
            leadName: leadMember?.name || "",
            leadEmail: leadMember?.email || "",
            leadMobile: leadMember?.mobile || "",
            leadGender: leadMember?.gender || "M",
            leadPwd: leadMember?.is_pwd === 1 ? "yes" : "no",
            leadProfilePic: leadMember?.profile_pic || "",

            // Member 1 details (if exists)
            m1Id: otherMembers[0]?.member_id || "",
            m1Name: otherMembers[0]?.name || "",
            m1Email: otherMembers[0]?.email || "",
            m1Mobile: otherMembers[0]?.mobile || "",
            m1Gender: otherMembers[0]?.gender || "M",
            m1Pwd: otherMembers[0]?.is_pwd === 1 ? "yes" : "no",
            m1ProfilePic: otherMembers[0]?.profile_pic || "",

            // Member 2 details (if exists)
            m2Id: otherMembers[1]?.member_id || "",
            m2Name: otherMembers[1]?.name || "",
            m2Email: otherMembers[1]?.email || "",
            m2Mobile: otherMembers[1]?.mobile || "",
            m2Gender: otherMembers[1]?.gender || "M",
            m2Pwd: otherMembers[1]?.is_pwd === 1 ? "yes" : "no",
            m2ProfilePic: otherMembers[1]?.profile_pic || "",

            // Member 3 details (if exists)
            m3Id: otherMembers[2]?.member_id || "",
            m3Name: otherMembers[2]?.name || "",
            m3Email: otherMembers[2]?.email || "",
            m3Mobile: otherMembers[2]?.mobile || "",
            m3Gender: otherMembers[2]?.gender || "M",
            m3Pwd: otherMembers[2]?.is_pwd === 1 ? "yes" : "no",
            m3ProfilePic: otherMembers[2]?.profile_pic || "",
          };

          setTeamData(transformedData);
        } else {
          alert(res.data.message);
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeamData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEditMode = (section) => {
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const saveChanges = async (section) => {
    const token = localStorage.getItem("authToken");
    let payload = { token };

    // Determine edit type and populate payload
    switch (section) {
      case "teamInfo":
        payload.edit_type = "team";
        payload.college = teamData.college;
        payload.city = teamData.city;
        break;

      case "abstract":
        payload.edit_type = "team";
        payload.abstract = teamData.abstract;
        break;

      case "lead":
        payload.edit_type = "member";
        payload.member_id = teamData.leadId;
        payload.name = teamData.leadName;
        payload.email = teamData.leadEmail;
        payload.mobile = teamData.leadMobile;
        break;

      case "member1":
        payload.edit_type = "member";
        payload.member_id = teamData.m1Id;
        payload.name = teamData.m1Name;
        payload.email = teamData.m1Email;
        payload.mobile = teamData.m1Mobile;
        break;

      case "member2":
        payload.edit_type = "member";
        payload.member_id = teamData.m2Id;
        payload.name = teamData.m2Name;
        payload.email = teamData.m2Email;
        payload.mobile = teamData.m2Mobile;
        break;

      case "member3":
        payload.edit_type = "member";
        payload.member_id = teamData.m3Id;
        payload.name = teamData.m3Name;
        payload.email = teamData.m3Email;
        payload.mobile = teamData.m3Mobile;
        break;

      default:
        return;
    }

    try {
      const res = await axios.post(
        "https://swagserver.co.in/hackfusion/edit_team.php",
        payload
      );

      if (res.data.success) {
        alert("Information updated successfully");
        toggleEditMode(section);
      } else {
        alert("Update failed: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while updating information.");
    }
  };

  const handleImageSelect = (memberType, event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImages((prev) => ({
        ...prev,
        [memberType]: e.target.result,
      }));
      setImageEditMode((prev) => ({
        ...prev,
        [memberType]: true,
      }));

      // Initialize crop position and size
      setCropPosition((prev) => ({
        ...prev,
        [memberType]: { x: 0, y: 0 },
      }));

      // Default crop size to 100px or half the image size, whichever is smaller
      const img = new Image();
      img.onload = () => {
        const size = Math.min(img.width, img.height, 100);
        setCropSize((prev) => ({
          ...prev,
          [memberType]: size,
        }));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const startManualCrop = (memberType) => {
    setCroppingMode((prev) => ({
      ...prev,
      [memberType]: true,
    }));
  };

  const cancelManualCrop = (memberType) => {
    setCroppingMode((prev) => ({
      ...prev,
      [memberType]: false,
    }));
  };

  const applyManualCrop = (memberType) => {
    // Crop the image based on the current crop position and size
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Calculate the actual crop area based on the image dimensions
      const container = cropContainerRefs[memberType].current;
      if (!container) return;

      const scaleX = img.width / container.offsetWidth;
      const scaleY = img.height / container.offsetHeight;

      const cropX = cropPosition[memberType].x * scaleX;
      const cropY = cropPosition[memberType].y * scaleY;
      const cropSizePx = cropSize[memberType] * Math.min(scaleX, scaleY);

      // Set canvas size to 400x400 (output size)
      canvas.width = 400;
      canvas.height = 400;

      // Draw the cropped portion of the image
      ctx.drawImage(img, cropX, cropY, cropSizePx, cropSizePx, 0, 0, 400, 400);

      // Update the selected image with the cropped version
      canvas.toBlob(
        (blob) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            setSelectedImages((prev) => ({
              ...prev,
              [memberType]: e.target.result,
            }));
          };
          reader.readAsDataURL(blob);
        },
        "image/jpeg",
        0.9
      );

      // Exit cropping mode
      setCroppingMode((prev) => ({
        ...prev,
        [memberType]: false,
      }));
    };

    img.src = selectedImages[memberType];
  };

  const handleCropStart = (memberType, clientX, clientY, corner) => {
    setIsDragging((prev) => ({
      ...prev,
      [memberType]: corner,
    }));

    setDragStart((prev) => ({
      ...prev,
      [memberType]: {
        x: clientX,
        y: clientY,
        // Store initial crop position and size for resize operations
        initialX: cropPosition[memberType].x,
        initialY: cropPosition[memberType].y,
        initialSize: cropSize[memberType],
      },
    }));
  };

  const handleCropMouseDown = (memberType, e, corner) => {
    e.preventDefault();
    e.stopPropagation();
    handleCropStart(memberType, e.clientX, e.clientY, corner);
  };

  const handleCropTouchStart = (memberType, e, corner) => {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    handleCropStart(memberType, touch.clientX, touch.clientY, corner);
  };

  const handleCropMove = (memberType, clientX, clientY) => {
    const corner = isDragging[memberType];
    if (!corner) return;

    const container = cropContainerRefs[memberType].current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const deltaX = clientX - dragStart[memberType].x;
    const deltaY = clientY - dragStart[memberType].y;

    if (corner === "move") {
      // Move the crop area
      const newX = Math.max(
        0,
        Math.min(
          dragStart[memberType].initialX + deltaX,
          rect.width - cropSize[memberType]
        )
      );
      const newY = Math.max(
        0,
        Math.min(
          dragStart[memberType].initialY + deltaY,
          rect.height - cropSize[memberType]
        )
      );
      setCropPosition((prev) => ({
        ...prev,
        [memberType]: { x: newX, y: newY },
      }));
    } else if (corner === "resize") {
      // Resize the crop area from the bottom-right corner
      const maxDelta = Math.max(deltaX, deltaY);
      const newSize = Math.max(
        50, // Minimum size
        Math.min(
          Math.min(
            rect.width - dragStart[memberType].initialX,
            rect.height - dragStart[memberType].initialY
          ), // Maximum size (available space)
          dragStart[memberType].initialSize + maxDelta // New size based on drag
        )
      );

      setCropSize((prev) => ({
        ...prev,
        [memberType]: newSize,
      }));
    }
  };

  const handleCropMouseMove = (memberType, e) => {
    const corner = isDragging[memberType];
    if (!corner) return;
    e.preventDefault();
    handleCropMove(memberType, e.clientX, e.clientY);
  };

  const handleCropTouchMove = (memberType, e) => {
    const corner = isDragging[memberType];
    if (!corner) return;
    e.preventDefault();
    const touch = e.touches[0];
    handleCropMove(memberType, touch.clientX, touch.clientY);
  };

  const handleCropEnd = (memberType) => {
    setIsDragging((prev) => ({
      ...prev,
      [memberType]: null,
    }));
  };

  const handleCropMouseUp = (memberType) => {
    handleCropEnd(memberType);
  };

  const handleCropTouchEnd = (memberType) => {
    handleCropEnd(memberType);
  };

  // Update the cropImageToSquare function to use manual crop data if available
  const cropImageToSquare = async (imageSrc, memberType) => {
    // If we're in manual crop mode, use those coordinates
    if (croppingMode[memberType] && selectedImages[memberType]) {
      return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
          const container = cropContainerRefs[memberType].current;
          if (!container) return;

          const scaleX = img.width / container.offsetWidth;
          const scaleY = img.height / container.offsetHeight;

          const cropX = cropPosition[memberType].x * scaleX;
          const cropY = cropPosition[memberType].y * scaleY;
          const cropSizePx = cropSize[memberType] * Math.min(scaleX, scaleY);

          canvas.width = 400;
          canvas.height = 400;

          ctx.drawImage(
            img,
            cropX,
            cropY,
            cropSizePx,
            cropSizePx,
            0,
            0,
            400,
            400
          );

          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            "image/jpeg",
            0.9
          );
        };

        img.src = imageSrc;
      });
    }

    // Fall back to automatic center crop
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        const size = Math.min(img.width, img.height);
        const offsetX = (img.width - size) / 2;
        const offsetY = (img.height - size) / 2;

        canvas.width = 400;
        canvas.height = 400;

        ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, 400, 400);

        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          "image/jpeg",
          0.9
        );
      };

      img.src = imageSrc;
    });
  };

  // Update the saveProfilePicture function to pass memberType
  const saveProfilePicture = async (memberType) => {
    try {
      const token = localStorage.getItem("authToken");
      const imageSrc = selectedImages[memberType];

      if (!imageSrc) {
        alert("No image selected");
        return;
      }

      // Get the member ID based on member type
      let memberId;
      switch (memberType) {
        case "lead":
          memberId = teamData.leadId;
          break;
        case "member1":
          memberId = teamData.m1Id;
          break;
        case "member2":
          memberId = teamData.m2Id;
          break;
        case "member3":
          memberId = teamData.m3Id;
          break;
        default:
          return;
      }

      // Crop image to square (pass memberType for manual cropping)
      const croppedBlob = await cropImageToSquare(imageSrc, memberType);

      // Create FormData
      const formData = new FormData();
      formData.append("token", token);
      formData.append("member_id", memberId);
      formData.append("profile_pic", croppedBlob, "profile_pic.jpg");

      const response = await axios.post(
        "https://swagserver.co.in/hackfusion/edit_img.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        // Update the team data with new profile picture URL
        const profilePicKey =
          memberType === "lead"
            ? "leadProfilePic"
            : memberType === "member1"
            ? "m1ProfilePic"
            : memberType === "member2"
            ? "m2ProfilePic"
            : "m3ProfilePic";

        setTeamData((prev) => ({
          ...prev,
          [profilePicKey]: response.data.data.profile_pic,
        }));

        // Clear the selected image and exit edit mode
        setSelectedImages((prev) => ({
          ...prev,
          [memberType]: null,
        }));

        setImageEditMode((prev) => ({
          ...prev,
          [memberType]: false,
        }));

        // Reset cropping mode
        setCroppingMode((prev) => ({
          ...prev,
          [memberType]: false,
        }));

        alert("Profile picture updated successfully!");
      } else {
        alert("Failed to update profile picture: " + response.data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    }
  };

  const cancelImageEdit = (memberType) => {
    setSelectedImages((prev) => ({
      ...prev,
      [memberType]: null,
    }));
    setImageEditMode((prev) => ({
      ...prev,
      [memberType]: false,
    }));
    // Reset cropping mode
    setCroppingMode((prev) => ({
      ...prev,
      [memberType]: false,
    }));
    // Clear file input
    if (fileInputRefs[memberType].current) {
      fileInputRefs[memberType].current.value = "";
    }
  };

  const renderProfileImage = (
    memberType,
    profilePic,
    name,
    borderColor,
    canEdit
  ) => {
    const isEditing = imageEditMode[memberType];
    const selectedImage = selectedImages[memberType];
    const isCropping = croppingMode[memberType];

    return (
      <div className="relative group">
        <div
          className={`w-20 h-20 rounded-full overflow-hidden border-2 ${borderColor} relative`}
        >
          {selectedImage && !isCropping ? (
            <img
              src={selectedImage}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : profilePic ? (
            <img
              src={profilePic}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className={`w-full h-full bg-gray-700 flex items-center justify-center`}
            >
              <span
                className={`text-xl font-bold ${
                  borderColor.includes("red")
                    ? "text-red-400"
                    : borderColor.includes("blue")
                    ? "text-blue-400"
                    : borderColor.includes("yellow")
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                {name?.charAt(0) || "M"}
              </span>
            </div>
          )}

          {/* Camera overlay for edit */}
          {canEdit && !isEditing && (
            <div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={() => fileInputRefs[memberType].current?.click()}
            >
              <Camera className="text-white" size={24} />
            </div>
          )}
        </div>

        {/* Crop Interface */}
        {isEditing && selectedImage && (
          <div className="absolute top-24 left-0 z-50 bg-gray-800 p-4 rounded-lg border border-gray-600 shadow-xl min-w-[300px]">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-white font-medium">Crop Profile Picture</h4>
              <button
                onClick={() => cancelImageEdit(memberType)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {!isCropping ? (
              <div className="space-y-3">
                <div className="w-48 h-48 mx-auto rounded-lg overflow-hidden border border-gray-600">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startManualCrop(memberType)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Crop size={16} />
                    Crop Manually
                  </button>
                  <button
                    onClick={() => saveProfilePicture(memberType)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Check size={16} />
                    Use As Is
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div
                  ref={cropContainerRefs[memberType]}
                  className="relative w-64 h-64 mx-auto border border-gray-600 overflow-hidden select-none"
                  onMouseMove={(e) => handleCropMouseMove(memberType, e)}
                  onMouseUp={() => handleCropMouseUp(memberType)}
                  onMouseLeave={() => handleCropMouseUp(memberType)}
                  onTouchMove={(e) => handleCropTouchMove(memberType, e)}
                  onTouchEnd={() => handleCropTouchEnd(memberType)}
                >
                  <img
                    src={selectedImage}
                    alt="Crop preview"
                    className="w-full h-full object-contain pointer-events-none"
                    style={{ touchAction: 'none' }}
                  />
                  {/* Crop overlay */}

                  <div
                    className="absolute border-2 border-white shadow-lg select-none"
                    style={{
                      left: cropPosition[memberType].x,
                      top: cropPosition[memberType].y,
                      width: cropSize[memberType],
                      height: cropSize[memberType],
                      boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
                      cursor: "move",
                      touchAction: 'none'
                    }}
                    onMouseDown={(e) =>
                      handleCropMouseDown(memberType, e, "move")
                    }
                    onTouchStart={(e) =>
                      handleCropTouchStart(memberType, e, "move")
                    }
                  >
                    {/* Resize handle in bottom-right corner - positioned inside the crop area */}
                    <div
                      className="absolute bottom-0 right-0 w-6 h-6 bg-white cursor-nwse-resize select-none"
                      style={{
                        transform: "translate(25%, 25%)", // Position it slightly inside the corner
                        borderRadius: "2px",
                        touchAction: 'none'
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation(); // Prevent triggering the move event
                        handleCropMouseDown(memberType, e, "resize");
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation(); // Prevent triggering the move event
                        handleCropTouchStart(memberType, e, "resize");
                      }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-gray-300 text-center">
                  Drag to move • Drag corners to resize
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => cancelManualCrop(memberType)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => applyManualCrop(memberType)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors"
                  >
                    Apply Crop
                  </button>
                  <button
                    onClick={() => saveProfilePicture(memberType)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Check size={16} />
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRefs[memberType]}
          type="file"
          accept="image/*"
          onChange={(e) => handleImageSelect(memberType, e)}
          className="hidden"
        />
      </div>
    );
  };

  if (!teamData) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-30 overflow-y-auto py-32 pb-6 ms-5 me-5 [&::-webkit-scrollbar]:hidden">
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-800/70 rounded-xl p-6 mb-6 border border-gray-700 shadow-lg border-yellow-500 border-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Team Logo and Name */}
            <div className="flex items-center gap-4">
              {teamData.teamLogo ? (
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-400">
                  <img
                    src={teamData.teamLogo}
                    alt="Team Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-700 border-2 border-yellow-400 flex items-center justify-center">
                  <span className="text-2xl font-bold text-yellow-400">
                    {teamData.teamName?.charAt(0) || "T"}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-4xl font-bold text-yellow-400">
                  TEAM DASHBOARD
                </h1>
                <h2 className="text-2xl font-semibold text-white mt-1">
                  {teamData.teamName}
                </h2>
                <p className="text-gray-300">{teamData.theme}</p>
              </div>
            </div>

            {/* Status Badges + Logout */}
            <div className="flex flex-col items-end gap-2">
              <div className="flex flex-wrap gap-2 justify-end">
                <span className="px-4 py-1 bg-green-600 text-white rounded-full text-sm font-medium">
                  Team Selection: {teamData.registrationStatus}
                </span>
                <span className="px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                  Payment Verification: {teamData.paymentStatus}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="mt-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium border-2 border-yellow-500 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Information Card */}
          <div className="bg-gray-800/70 overflow-auto rounded-xl p-6 border border-gray-700 shadow-lg border-yellow-500 border-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Team Information</h2>
              {isLead && (
                <button
                  onClick={() =>
                    editMode.teamInfo
                      ? saveChanges("teamInfo")
                      : toggleEditMode("teamInfo")
                  }
                  className={`px-4 py-2 rounded-lg font-medium ${
                    editMode.teamInfo
                      ? "bg-green-600 hover:bg-green-500"
                      : "bg-blue-600 hover:bg-blue-500"
                  } text-white transition-colors`}
                >
                  {editMode.teamInfo ? "Save" : "Edit"}
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  College
                </label>
                {editMode.teamInfo ? (
                  <input
                    type="text"
                    name="college"
                    value={teamData.college}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                    {teamData.college}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  City
                </label>
                {editMode.teamInfo ? (
                  <input
                    type="text"
                    name="city"
                    value={teamData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                    {teamData.city}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Team Size
                </label>
                <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                  {teamData.teamSize} Members
                </p>
              </div>
            </div>
          </div>

          {/* Abstract Card */}
          <div className="bg-gray-800/70 max-h-96 overflow-auto rounded-xl p-6 border border-gray-700 shadow-lg border-yellow-500 border-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Project Abstract</h2>
              {isLead && (
                <button
                  onClick={() =>
                    editMode.abstract
                      ? saveChanges("abstract")
                      : toggleEditMode("abstract")
                  }
                  className={`px-4 py-2 rounded-lg font-medium ${
                    editMode.abstract
                      ? "bg-green-600 hover:bg-green-500"
                      : "bg-orange-600 hover:bg-orange-500"
                  } text-white transition-colors`}
                >
                  {editMode.abstract ? "Save" : "Edit"}
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Abstract
              </label>
              {editMode.abstract ? (
                <textarea
                  name="abstract"
                  value={teamData.abstract}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-4 py-2  bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              ) : (
                <p className="text-white overflow-auto bg-gray-700/50 px-4 py-4 rounded-lg whitespace-pre-wrap">
                  {teamData.abstract}
                </p>
              )}
            </div>
          </div>

          {/* Team Lead Card */}
          <div className="bg-gray-800/70 rounded-xl p-6 border border-gray-700 shadow-lg border-yellow-500 border-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                {renderProfileImage(
                  "lead",
                  teamData.leadProfilePic,
                  teamData.leadName,
                  "border-red-500",
                  isLead
                )}
                <h2 className="text-xl font-bold text-white">Team Lead</h2>
              </div>
              {isLead && (
                <button
                  onClick={() =>
                    editMode.lead ? saveChanges("lead") : toggleEditMode("lead")
                  }
                  className={`px-4 py-2 rounded-lg font-medium ${
                    editMode.lead
                      ? "bg-green-600 hover:bg-green-500"
                      : "bg-red-600 hover:bg-red-500"
                  } text-white transition-colors`}
                >
                  {editMode.lead ? "Save" : "Edit"}
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                {editMode.lead ? (
                  <input
                    type="text"
                    name="leadName"
                    value={teamData.leadName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                    {teamData.leadName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  {editMode.lead ? (
                    <input
                      type="email"
                      name="leadEmail"
                      value={teamData.leadEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                      {teamData.leadEmail}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Mobile
                  </label>
                  {editMode.lead ? (
                    <input
                      type="tel"
                      name="leadMobile"
                      value={teamData.leadMobile}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                      {teamData.leadMobile}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Gender
                  </label>
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
                      {teamData.leadGender === "M"
                        ? "Male"
                        : teamData.leadGender === "F"
                        ? "Female"
                        : "Other"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    PWD Status
                  </label>
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
                      {teamData.leadPwd === "yes" ? "Yes" : "No"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Member 1 Card */}
          {teamData.m1Name && (
            <div className="bg-gray-800/70 rounded-xl p-6 border border-gray-700 shadow-lg border-yellow-500 border-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  {renderProfileImage(
                    "member1",
                    teamData.m1ProfilePic,
                    teamData.m1Name,
                    "border-blue-500",
                    isLead || userId === teamData.m1Id
                  )}
                  <h2 className="text-xl font-bold text-white">Member 1</h2>
                </div>
                {(isLead || userId === teamData.m1Id) && (
                  <button
                    onClick={() =>
                      editMode.member1
                        ? saveChanges("member1")
                        : toggleEditMode("member1")
                    }
                    className={`px-4 py-2 rounded-lg font-medium ${
                      editMode.member1
                        ? "bg-green-600 hover:bg-green-500"
                        : "bg-blue-600 hover:bg-blue-500"
                    } text-white transition-colors`}
                  >
                    {editMode.member1 ? "Save" : "Edit"}
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  {editMode.member1 ? (
                    <input
                      type="text"
                      name="m1Name"
                      value={teamData.m1Name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                      {teamData.m1Name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    {editMode.member1 ? (
                      <input
                        type="email"
                        name="m1Email"
                        value={teamData.m1Email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                        {teamData.m1Email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Mobile
                    </label>
                    {editMode.member1 ? (
                      <input
                        type="tel"
                        name="m1Mobile"
                        value={teamData.m1Mobile}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                        {teamData.m1Mobile}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Gender
                    </label>
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
                        {teamData.m1Gender === "M"
                          ? "Male"
                          : teamData.m1Gender === "F"
                          ? "Female"
                          : "Other"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      PWD Status
                    </label>
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
                        {teamData.m1Pwd === "yes" ? "Yes" : "No"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Member 2 Card */}
          {teamData.m2Name && (
            <div className="bg-gray-800/70 rounded-xl p-6 border border-gray-700 shadow-lg border-yellow-500 border-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  {renderProfileImage(
                    "member2",
                    teamData.m2ProfilePic,
                    teamData.m2Name,
                    "border-yellow-500",
                    isLead || userId === teamData.m2Id
                  )}
                  <h2 className="text-xl font-bold text-white">Member 2</h2>
                </div>
                {(isLead || userId === teamData.m2Id) && (
                  <button
                    onClick={() =>
                      editMode.member2
                        ? saveChanges("member2")
                        : toggleEditMode("member2")
                    }
                    className={`px-4 py-2 rounded-lg font-medium ${
                      editMode.member2
                        ? "bg-green-600 hover:bg-green-500"
                        : "bg-yellow-600 hover:bg-yellow-500"
                    } text-white transition-colors`}
                  >
                    {editMode.member2 ? "Save" : "Edit"}
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  {editMode.member2 ? (
                    <input
                      type="text"
                      name="m2Name"
                      value={teamData.m2Name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                      {teamData.m2Name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    {editMode.member2 ? (
                      <input
                        type="email"
                        name="m2Email"
                        value={teamData.m2Email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                        {teamData.m2Email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Mobile
                    </label>
                    {editMode.member2 ? (
                      <input
                        type="tel"
                        name="m2Mobile"
                        value={teamData.m2Mobile}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                        {teamData.m2Mobile}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Gender
                    </label>
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
                        {teamData.m2Gender === "M"
                          ? "Male"
                          : teamData.m2Gender === "F"
                          ? "Female"
                          : "Other"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      PWD Status
                    </label>
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
                        {teamData.m2Pwd === "yes" ? "Yes" : "No"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Member 3 Card (if exists) */}
          {teamData.m3Name && (
            <div className="bg-gray-800/70 rounded-xl p-6 border border-gray-700 shadow-lg border-yellow-500 border-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  {renderProfileImage(
                    "member3",
                    teamData.m3ProfilePic,
                    teamData.m3Name,
                    "border-green-500",
                    isLead || userId === teamData.m3Id
                  )}
                  <h2 className="text-xl font-bold text-white">Member 3</h2>
                </div>
                {(isLead || userId === teamData.m3Id) && (
                  <button
                    onClick={() =>
                      editMode.member3
                        ? saveChanges("member3")
                        : toggleEditMode("member3")
                    }
                    className={`px-4 py-2 rounded-lg font-medium ${
                      editMode.member3
                        ? "bg-green-600 hover:bg-green-500"
                        : "bg-green-600 hover:bg-green-500"
                    } text-white transition-colors`}
                  >
                    {editMode.member3 ? "Save" : "Edit"}
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  {editMode.member3 ? (
                    <input
                      type="text"
                      name="m3Name"
                      value={teamData.m3Name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                      {teamData.m3Name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    {editMode.member3 ? (
                      <input
                        type="email"
                        name="m3Email"
                        value={teamData.m3Email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                        {teamData.m3Email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Mobile
                    </label>
                    {editMode.member3 ? (
                      <input
                        type="tel"
                        name="m3Mobile"
                        value={teamData.m3Mobile}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-white bg-gray-700/50 px-4 py-2 rounded-lg">
                        {teamData.m3Mobile}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Gender
                    </label>
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
                        {teamData.m3Gender === "M"
                          ? "Male"
                          : teamData.m3Gender === "F"
                          ? "Female"
                          : "Other"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      PWD Status
                    </label>
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
                        {teamData.m3Pwd === "yes" ? "Yes" : "No"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
