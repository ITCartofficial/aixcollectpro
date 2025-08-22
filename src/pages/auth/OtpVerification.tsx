
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
import ReusableModal from "../../components/ui/Modal/ReusableModal";

interface OtpVerificationProps {
  onVerify: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({ 
  onVerify, 
  isOpen = true,
  onClose 
}) => {
  const [otp, setOtp] = React.useState("");

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify();
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  return (
    <ReusableModal
      isOpen={isOpen}
      onClose={onClose || (() => {})}
      size="xl"
      height="auto"
      backgroundColor="bg-white"
      showCloseButton={false}
      closeOnOverlayClick={true}
      className="p-0"
      headerClassName="hidden"
      contentClassName="p-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div
        className="relative rounded-[12px] flex flex-col items-center bg-white"
        style={{ width: "772px", height: "598px" }}
      >
        {/* Close button */}
        {onClose && (
          <button
            className="absolute top-7 right-7 text-neutral-600 hover:text-neutral-600 text-2xl"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        )}
        
        <div className="flex flex-col items-center w-full mt-[48px]">
          {/* Phone Icon - You can replace this with your preferred icon */}
          <div className="w-30 h-30 mb-3 flex items-center justify-center bg-blue-100 rounded-full">
            <svg 
              width="64" 
              height="64" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-600"
            >
              <path 
                d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-center mb-2">Enter OTP to Continue</h2>
          <p className="text-neutral-600 text-center mb-10 text-base px-2 leading-6">
            We've sent a 6-digit OTP to your registered mobile number / email.<br />
            Please enter it below to verify your identity.
          </p>

          {/* OTP Input */}
          <div className="w-full max-w-[600px] mb-12 px-12">
            <label
              htmlFor="otp"
              className="block text-sm font-semibold text-neutral-700 mb-3 text-left"
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
              className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-lg tracking-widest transition-colors text-center"
              autoFocus
            />
          </div>

          {/* Verify Button */}
          <div className="w-full flex justify-center">
            <div className="w-[600px]">
              <PrimaryButton
                text="Verify"
                onClick={handleVerify}
                className="w-full py-4 px-4 rounded-lg text-base font-semibold bg-primary-700 hover:bg-primary-700 transition text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </ReusableModal>
  );
};

export default OtpVerification;