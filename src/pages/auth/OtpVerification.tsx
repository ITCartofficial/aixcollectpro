
// import React from "react";
// import PrimaryButton from "../../components/ui/Buttons/PrimaryButton";
// import homedashbord from "../../assets/homedashbord.png";
// import AuthenticatorOtpModal from "./AuthenticatorOTPModal";


// // Add onVerify prop
// interface OtpVerificationProps {
//   onVerify: () => void;
// }

// const OtpVerification: React.FC<OtpVerificationProps> = ({ onVerify }) => {
//   const [otp, setOtp] = React.useState("");
//   const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

//   const handleVerify = () => {
//     if (otp.length === 6) {
//       setIsAuthModalOpen(true);
//     } else {
//       alert("Please enter a valid 6-digit OTP");
//     }
//   };

//   const handleAuthenticatorVerified = () => {
//     setIsAuthModalOpen(false);
//     onVerify(); // Call parent onVerify after authenticator is verified
//   };

//   return (
//     <div className="min-h-screen flex bg-[#f6f7fa]">
//       {/* Left Panel */}
//       <div className="flex-1 flex flex-col justify-center items-center bg-blue-600 rounded-l-[12px] px-8 py-8">
//         <div className="flex flex-col items-center w-full">
//           <img
//             src={homedashbord}
//             alt="Dashboard"
//             className="w-full max-w-full mb-8 rounded-lg"
//             style={{ objectFit: "contain" }}
//           />
//           <h1 className="text-3xl font-bold text-white mb-4 text-center">
//             Welcome Back to AiXCollectPro
//           </h1>
//           <p className="text-lg text-blue-100 text-center max-w-lg">
//             Monitor your team, manage tasks, and drive recovery with real-time insights.
//           </p>
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="flex-1 flex flex-col bg-white rounded-r-[12px] px-8 py-12 relative">
//         {/* Heading up */}
//         <div className="w-full max-w-lg mx-auto">
//           <h1 className="text-4xl font-bold text-gray-900 mb-15 mt-2 text-left">
//             AiXCollectPro
//           </h1>
//         </div>
//         {/* Middle form */}
//         <div className="w-full max-w-lg mx-auto flex-1 flex flex-col justify-center">
//           <div className="flex flex-col items-start gap-0">
//             <h3 className="text-2xl font-semibold text-gray-900 mb-1">
//               Enter OTP to Continue
//             </h3>
//             <p className="text-gray-700 mb-6 text-sm font-normal">
//               We&apos;ve sent a 6-digit OTP to your registered mobile number / email.<br />
//               Please enter it below to verify your identity.
//             </p>
//             <div className="w-full mb-7">
//               <label
//                 htmlFor="otp"
//                 className="block text-sm font-semibold text-gray-700 mb-2"
//               >
//                 OTP
//               </label>
//               <input
//                 id="otp"
//                 type="text"
//                 placeholder="XXXXXX"
//                 maxLength={6}
//                 value={otp}
//                 onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg tracking-widest transition-colors"
//               />
//             </div>
//             <PrimaryButton
//               text="Verify"
//               onClick={handleVerify}
//               className="w-full py-3 px-4 rounded-md text-base font-semibold bg-[#0064E1] hover:bg-[#0055C4] transition text-white"
//             />
//           </div>
//         </div>
//         {/* Copyright bottom, centered horizontally */}
//         <div className=" left-0 w-full flex justify-center">
//           <span className="text-md text-gray-500 opacity-70">
//             ©copyright 2025, AiXCollectPro - All Rights Reserved
//           </span>
//         </div>
//         {/* Authenticator Modal */}
//         <AuthenticatorOtpModal
//           isOpen={isAuthModalOpen}
//           onClose={() => setIsAuthModalOpen(false)}
//           onVerify={handleAuthenticatorVerified}
//         />
//       </div>
//     </div>
//   );
// };

// export default OtpVerification;










import React from "react";
import PrimaryButton from "../../components/ui/Buttons/PrimaryButton";
import homedashbord from "../../assets/homedashbord.png";

interface OtpVerificationProps {
  onVerify: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({ onVerify }) => {
  const [otp, setOtp] = React.useState("");

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify();
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f6f7fa]">
      {/* Left Panel */}
      <div className="flex-1 flex flex-col justify-center items-center bg-blue-600 rounded-l-[12px] px-8 py-8">
        <div className="flex flex-col items-center w-full">
          <img
            src={homedashbord}
            alt="Dashboard"
            className="w-full max-w-full mb-8 rounded-lg"
            style={{ objectFit: "contain" }}
          />
          <h1 className="text-3xl font-bold text-white mb-4 text-center">
            Welcome Back to AiXCollectPro
          </h1>
          <p className="text-lg text-blue-100 text-center max-w-lg">
            Monitor your team, manage tasks, and drive recovery with real-time insights.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col bg-white rounded-r-[12px] px-8 py-12 relative">
        <div className="w-full max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-15 mt-2 text-left">
            AiXCollectPro
          </h1>
        </div>
        <div className="w-full max-w-lg mx-auto flex-1 flex flex-col justify-center">
          <div className="flex flex-col items-start gap-0">
            <h3 className="text-2xl font-semibold text-gray-900 mb-1">
              Enter OTP to Continue
            </h3>
            <p className="text-gray-700 mb-6 text-sm font-normal">
              We've sent a 6-digit OTP to your registered mobile number / email.<br />
              Please enter it below to verify your identity.
            </p>
            <div className="w-full mb-7">
              <label
                htmlFor="otp"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                OTP
              </label>
              <input
                id="otp"
                type="text"
                placeholder="XXXXXX"
                maxLength={6}
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg tracking-widest transition-colors"
              />
            </div>
            <PrimaryButton
              text="Verify"
              onClick={handleVerify}
              className="w-full py-3 px-4 rounded-md text-base font-semibold bg-[#0064E1] hover:bg-[#0055C4] transition text-white"
            />
          </div>
        </div>
        <div className=" left-0 w-full flex justify-center">
          <span className="text-md text-gray-500 opacity-70">
            ©copyright 2025, AiXCollectPro - All Rights Reserved
          </span>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;