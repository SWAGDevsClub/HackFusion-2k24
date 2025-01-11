import React, { useState } from "react";
import OtpInput from "react-otp-input";
import cardBoard from "/cardboard.jpeg";
import logo from "/logon.png";
import tricsq from "/tricsq.png";
const RegistrationForm = () => {
  const [isTeamLeadSubmitted, setIsTeamLeadSubmitted] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [otpStruc, setOtpStruc] = useState({});
  const [formData, setFormData] = useState({
    leadMobile: "",
    leadName: "",
    leadEmail: "",
    leadGender: "",
    m1Mobile: "",
    m1Name: "",
    m1Email: "",
    m1Gender: "",
    m2Mobile: "",
    m2Name: "",
    m2Email: "",
    m2Gender: "",
    m3Mobile: "",
    m3Name: "",
    m3Email: "",
    m3Gender: "",
    city: "",
    college: "",
    teamName: "",
    abstract: "",
    password: "",
    paymentReferenceID: "",
    paymentScreenShotLink: "",
  });

  const cart = {
    black: { L: 0, M: 0, S: 0, XL: 0 },
    maroon: { L: 0, M: 0, S: 0, XL: 0 },
    "navi blue": { L: 0, M: 0, S: 0, XL: 0 },
    "royal blue": { L: 0, M: 0, S: 0, XL: 0 },
    white: { L: 0, M: 0, S: 0, XL: 0 },
    yellow: { L: 0, M: 0, S: 0, XL: 0 },
  };

  const coupon = {
    lead: {
      "day 1 dinner": { msg: "", title: "day 1 dinner", type: "dinner" },
      "day 2 breakfast": {
        msg: "",
        title: "day 2 breakfast",
        type: "breakfast",
      },
      "day 2 dinner": { msg: "", title: "day 2 dinner", type: "dinner" },
      "day 2 lunch": { msg: "", title: "day 2 lunch", type: "lunch" },
      "day 3 breakfast": {
        msg: "",
        title: "day 3 breakfast",
        type: "breakfast",
      },
      "day 3 lunch": { msg: "", title: "day 3 lunch", type: "lunch" },
      goodies: { msg: "", title: "goodies", type: "goodies" },
    },
    m1: {
      "day 1 dinner": { msg: "", title: "day 1 dinner", type: "dinner" },
      "day 2 breakfast": {
        msg: "",
        title: "day 2 breakfast",
        type: "breakfast",
      },
      "day 2 dinner": { msg: "", title: "day 2 dinner", type: "dinner" },
      "day 2 lunch": { msg: "", title: "day 2 lunch", type: "lunch" },
      "day 3 breakfast": {
        msg: "",
        title: "day 3 breakfast",
        type: "breakfast",
      },
      "day 3 lunch": { msg: "", title: "day 3 lunch", type: "lunch" },
      goodies: { msg: "", title: "goodies", type: "goodies" },
    },
    m2: {
      "day 1 dinner": { msg: "", title: "day 1 dinner", type: "dinner" },
      "day 2 breakfast": {
        msg: "",
        title: "day 2 breakfast",
        type: "breakfast",
      },
      "day 2 dinner": { msg: "", title: "day 2 dinner", type: "dinner" },
      "day 2 lunch": { msg: "", title: "day 2 lunch", type: "lunch" },
      "day 3 breakfast": {
        msg: "",
        title: "day 3 breakfast",
        type: "breakfast",
      },
      "day 3 lunch": { msg: "", title: "day 3 lunch", type: "lunch" },
      goodies: { msg: "", title: "goodies", type: "goodies" },
    },
    m3: {
      "day 1 dinner": { msg: "", title: "day 1 dinner", type: "dinner" },
      "day 2 breakfast": {
        msg: "",
        title: "day 2 breakfast",
        type: "breakfast",
      },
      "day 2 dinner": { msg: "", title: "day 2 dinner", type: "dinner" },
      "day 2 lunch": { msg: "", title: "day 2 lunch", type: "lunch" },
      "day 3 breakfast": {
        msg: "",
        title: "day 3 breakfast",
        type: "breakfast",
      },
      "day 3 lunch": { msg: "", title: "day 3 lunch", type: "lunch" },
      goodies: { msg: "", title: "goodies", type: "goodies" },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTeamLeadSubmit = (e) => {
    e.preventDefault();
    setIsTeamLeadSubmitted((prev) => true);
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.leadMobile) {
      alert("Team leader's mobile number is required!");
      return;
    }

    const dataToSave = {
      ...formData,
      cart,
      coupon,
      status: "Pending",
    };

    try {
      await set(ref(database, `/${formData.leadMobile}`), dataToSave);
      alert("Registration successful!");
      setFormData({
        leadMobile: "",
        leadName: "",
        leadEmail: "",
        leadGender: "",
        m1Mobile: "",
        m1Name: "",
        m1Email: "",
        m1Gender: "",
        m2Mobile: "",
        m2Name: "",
        m2Email: "",
        m2Gender: "",
        m3Mobile: "",
        m3Name: "",
        m3Email: "",
        m3Gender: "",
        city: "",
        college: "",
        teamName: "",
        abstract: "",
        password: "",
        paymentReferenceID: "",
        paymentScreenShotLink: "",
      });
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Registration failed. Please try again.");
    }
  };
  const genrateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp;
  };
  async function verifyOTP(email, enteredOtp) {
    if (!otpStruc[email] || !otpStruc[email].otp) {
      setMsg("No OTP was sent to this email. Please try resending.");
      return false;
    }

    // Use the `find` method to locate the OTP
    const validOtp = otpStruc[email].otp.find(
      (otp) => otp === Number(enteredOtp)
    );

    if (!validOtp) {
      setMsg("Invalid OTP. Please try again.");
      return false;
    }

    // If a match is found, OTP is valid
    setMsg("OTP verified successfully!");
    setOtpVerified((prev) => true);
    setIsOtpSent((prev) => false);
    setOtpStruc((prev) => {
      const updated = { ...prev };
      // Clear the OTP array entirely
      updated[email].otp = [];
      return updated;
    });

    return true;
  }

  async function validateEmail(email, resend = false) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(email)) {
      // Generate OTP and update the otpStruc state
      let otpCode = genrateOTP();
      setOtpStruc((prev) => {
        const updated = { ...prev };

        // Clear OTP if resend is true
        if (resend && updated[email]) {
          updated[email].otp = [];
        }

        // Initialize or update the otp structure
        if (!updated[email]) {
          updated[email] = { otp: [] };
        }
        updated[email].otp.push(otpCode);

        return updated;
      });

      // Prepare the email message
      const data = new FormData();
      const message = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #0056b3;">Your One Time Password (OTP)</h2>
          <p>Hi,</p>
          <p>Thank you for initiating your registration for <strong>HackFusion 2.O</strong>. Please use the OTP below to verify your email address:</p>
          <p>Note: This OTP will be valid for only 30 seconds.</p>
          <div style="margin: 20px 0; text-align: center;">
            <span style="font-size: 24px; font-weight: bold; color: #0056b3; border: 1px solid #ccc; padding: 10px 20px; display: inline-block;">
              <strong>${otpCode}</strong>
            </span>
          </div>
          <p>If you did not request this OTP, please ignore this email or contact our support team.</p>
          <p>For any assistance, feel free to reach out to us at <a href="mailto:swag@sggs.ac.in" style="color: #0056b3;">swag@sggs.ac.in</a>.</p>
          <p>Best regards,</p>
          <p><strong>HackFusion 2.O Team</strong></p>
        </div>`.replace(/\r?\n/g, "");
      data.append("email_id", email);
      data.append("subject", "Verify Email");
      data.append("body", message);

      console.log(data, otpCode);

      // Send the email
      try {
        const response = await fetch(
          `https://sggsapp.co.in/api/send_email.php`,
          {
            method: "POST",
            body: data,
          }
        );
        const res = await response.json();

        if (res.Message === "Mail sent") {
          setIsOtpSent(true);

          // Schedule OTP invalidation
          setTimeout(() => {
            setOtpStruc((prev) => {
              const updated = { ...prev };
              if (updated[email]?.otp) {
                updated[email].otp = [];
              }
              return updated;
            });
          }, 30000);

          setMsg("This OTP is valid only for 30 seconds.");
        } else {
          console.log(res.Message);
        }
      } catch (error) {
        console.error("Error sending email:", error);
      }
    } else {
      console.log("Email format not supported!");
    }
  }

  return (
    <div className="flex flex-col items-center mt-32 absolute w-full z-50 justify-start h-full  hide overflow-scroll">
      <img src={cardBoard} className="rounded-md w-[600px] h-[700px]" />
      <img src={tricsq} className="absolute mt-24 opacity-70" />
      <div className="absolute flex flex-col justify-center items-center mt-10 w-[550px] px-10 py-4 bg-opacity-20">
        <img src={logo} className="w-full mb-5" />
        {!isTeamLeadSubmitted ? (
          <form
            onSubmit={handleTeamLeadSubmit}
            className="flex flex-col justify-center w-full h-[500px] gap-5  overflow-y-scroll hide "
          >
            <h2 className="text-xl font-squid text-black ">
              Team Lead Details
            </h2>
            <span>
              <label
                htmlFor="leadName"
                className="font-squid text-base text-black mb-4"
              >
                Lead Name
              </label>
              <input
                type="text"
                required
                className="bg-transparent w-full h-10 indent-1 border-2 border-fuchsia-300 placeholder:text-slate-200 font-squid text-sm px-4 py-2 rounded-md focus:bg-neutral-400 focus:bg-opacity-50 focus:outline-none focus:border-emerald-500 transition-all ease-in-out"
                autoComplete="true"
                name="leadName"
                value={formData.leadName}
                onChange={handleChange}
                placeholder=" Lead Name"
              />
            </span>
            <span>
              <label
                htmlFor="leadEmail"
                className="font-squid text-base text-black mb-4"
              >
                Lead Email
              </label>
              <span className="flex flex-row gap-4 items-center">
                <input
                  type="email"
                  required
                  className="bg-transparent w-full h-10 indent-1 border-2 border-fuchsia-300 placeholder:text-slate-200 font-squid text-sm px-4 py-2 rounded-md focus:bg-neutral-400 focus:bg-opacity-50 focus:outline-none focus:border-emerald-500 transition-all ease-in-out"
                  autoComplete="true"
                  name="leadEmail"
                  value={formData.leadEmail}
                  onChange={handleChange}
                  placeholder=" Lead Email"
                />
                <button
                  className="bg-green-500 font-squid px-2 py-2 rounded-md disabled:bg-red-600 disabled:cursor-not-allowed hover:bg-green-400 text-sm text-black focus:bg-neutral-400 focus:bg-opacity-50"
                  disabled={formData.leadEmail === ""}
                  onClick={() => validateEmail(formData.leadEmail)}
                >
                  Verify
                </button>
              </span>
              <p className="text-green-600 font-squid text-sm px-2 py-2">
                {msg}
              </p>
            </span>
            {isOtpSent ? (
              <div className="flex flex-col justify-center items-center w-full">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  renderSeparator={
                    <span>
                      <hr className="bg-black" />
                    </span>
                  }
                  renderInput={(props) => <input {...props} />}
                  containerStyle={"w-full mb-4 otpContainer justify-center"}
                  inputStyle={
                    "otp border-2 border-fuchsia-300 bg-white focus:bg-neutral-400 focus:bg-opacity-50 focus:outline-none focus:border-emerald-500 transition-all ease-in-out"
                  }
                />
                <p className="text-black font-squid text-sm px-2 py-2">{msg}</p>
                <span className="flex flex-row gap-4 w-full justify-center">
                  <button
                    className="bg-pink-500 font-squid px-2 py-2 rounded-md hover:bg-pink-400"
                    onClick={(e) => {
                      e.preventDefault();
                      verifyOTP(formData.leadEmail, otp);
                    }}
                  >
                    Verify
                  </button>
                  <button
                    className="bg-orange-500 font-squid px-2 py-2 rounded-md hover:bg-orange-400"
                    onClick={(e) => {
                      e.preventDefault();
                      validateEmail(formData.leadEmail, true);
                    }}
                  >
                    Resend
                  </button>
                </span>
              </div>
            ) : (
              ""
            )}
            <span>
              <label
                htmlFor="leadMobile"
                className="font-squid text-base text-black mb-4"
              >
                Lead Contact
              </label>
              <input
                type="text"
                maxLength={10}
                required
                className="bg-transparent w-full h-10 indent-1 border-2 border-fuchsia-300  placeholder:text-slate-200 font-squid text-sm px-4 py-2 rounded-md focus:bg-neutral-400 focus:bg-opacity-50 focus:outline-none focus:border-emerald-500 transition-all ease-in-out"
                autoComplete="true"
                name="leadMobile"
                value={formData.leadMobile}
                onChange={handleChange}
                placeholder="Lead Mob No"
              />
            </span>
            <span>
              <label
                htmlFor="leadGender"
                className="font-squid text-base text-black mb-4"
              >
                Gender
              </label>
              <select
                className="bg-transparent w-full h-10 indent-1 border-2 border-fuchsia-300   placeholder:text-slate-200 font-squid px-4 py-2 rounded-md focus:bg-neutral-400 focus:bg-opacity-50 focus:outline-none focus:border-emerald-500 transition-all ease-in-out"
                name="leadGender"
                onChange={handleChange}
                autoComplete="true"
                value={formData.leadGender}
              >
                <option value={""}></option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </span>
            <button
              type="submit"
              className="px-4 py-2 mt-5 bg-emerald-500 text-black font-squid rounded-md hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-400"
              disabled={!otpVerified}
            >
              Save and Next
            </button>
          </form>
        ) : (
          <form className="space-y-4">
            <h2 className="text-xl font-semibold">Team Members Details</h2>
            {/* {Object.keys(teamMembers).map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-black mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  name={field}
                  value={teamMembers[field]}
                  onChange={(e) => handleChange(e, false)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))} */}
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-black font-semibold rounded-md hover:bg-green-600"
            >
              Submit Registration
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
