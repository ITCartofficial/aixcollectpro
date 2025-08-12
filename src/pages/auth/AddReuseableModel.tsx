// import React from 'react';
// import ReusableModal from '../../components/ui/Modal/ReusableModal';
// import AuthenticatorOTPModal from './AuthenticatorOTPModal';// Adjust the import path as necessary

// interface AddReusableModelProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onVerify?: (otp: string) => void;
// }

// const AddReusableModel: React.FC<AddReusableModelProps> = ({ isOpen, onClose, onVerify }) => {
//   return (
//     <ReusableModal
//       isOpen={isOpen}
//       onClose={onClose}
//       size="xl"
//       height="auto"
//       backgroundColor="bg-white"
//       showCloseButton={false} // OTP modal has its own close button
//       closeOnOverlayClick={true}
//       className="p-0"
//       headerClassName="hidden"
//       contentClassName="p-0 flex items-center justify-center"
//       overlayClassName="flex items-center justify-center z-50 p-4"
//     >
//       <AuthenticatorOTPModal
//         onClose={onClose}
//         onVerify={onVerify}
//       />
//     </ReusableModal>
//   );
// };

// export default AddReusableModel;