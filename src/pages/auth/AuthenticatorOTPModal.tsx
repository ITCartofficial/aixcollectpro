import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/ui/Buttons/PrimaryButton";
import Authenticator from "../../assets/Authenticator.png";
import ReusableModal from "../../components/ui/Modal/ReusableModal";

interface AuthenticatorOtpModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVerify?: (otp: string) => void;
}

const OTP_LENGTH = 6;

const AuthenticatorOtpModal: React.FC<AuthenticatorOtpModalProps> = ({
    isOpen,
    onClose,
    onVerify,
}) => {
    const [otp, setOtp] = React.useState(Array(OTP_LENGTH).fill(""));
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const navigate = useNavigate();

    const handleChange = (idx: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[idx] = value.slice(-1);
        setOtp(newOtp);

        if (value && idx < OTP_LENGTH - 1) {
            inputsRef.current[idx + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (e.key === "Backspace" && !otp[idx] && idx > 0) {
            inputsRef.current[idx - 1]?.focus();
        }
    };

    const handleVerify = () => {
    if (otp.join("").length === OTP_LENGTH) {
        localStorage.setItem('isAuthenticated', 'true');
        if (onVerify) onVerify(otp.join(""));
        navigate("/"); // This loads DashboardLayout and Dashboard
    }
};

    return (
        <ReusableModal
            isOpen={isOpen}
            onClose={onClose}
            size="xl"
            height="auto"
            backgroundColor="bg-white"
            showCloseButton={false}
            closeOnOverlayClick={true}
            className="p-0"
            headerClassName=" "
            contentClassName="p-0 flex items-center justify-center"
            // overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
            <div
                className="relative bg-white rounded-[12px]"
                style={{ width: "772px", height: "598px" }}
            >
                {/* Close button */}
                <button
                    className="absolute top-7 right-7 text-neutral-600 hover:text-neutral-600 text-2xl"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                <div className="flex flex-col items-center w-full mt-[48px]">
                    {/* Authenticator Icon */}
                    <img
                        src={Authenticator}
                        alt="Authenticator Icon"
                        className="w-30 h-30 mb-3"
                        style={{ objectFit: "contain" }}
                    />
                    {/* Title */}
                    <h2 className="text-xl font-semibold text-center mb-2">Verify Your Identity</h2>
                    <p className="text-neutral-600 text-center mb-10 text-base px-2 leading-6">
                        Use your authentication app to enter the 6-digit code for enhanced security.
                    </p>
                    {/* OTP Inputs */}
                    <div className="flex justify-center gap-7 mb-12">
                        {otp.map((digit, idx) => (
                            <input
                                key={idx}
                                ref={el => { inputsRef.current[idx] = el; }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={e => handleChange(idx, e.target.value)}
                                onKeyDown={e => handleKeyDown(e, idx)}
                                className="w-[80px] h-[64px] text-neutral-700 text-center text-2xl font-bold border border-neutral-500 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-700 transition"
                                autoFocus={idx === 0}
                            />
                        ))}
                    </div>
                    {/* Verify Button */}
                    <div className="w-full flex justify-center">
                        <div className="w-[600px]">
                            <PrimaryButton
                                text="Verify & Login"
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

export default AuthenticatorOtpModal;