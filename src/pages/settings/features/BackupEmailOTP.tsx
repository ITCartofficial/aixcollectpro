import React, { useRef } from "react";
import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton";
import Password_shield from "../../../assets/Password_Shield.png"

interface BackupEmailOTPModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVerify?: (otp: string) => void;
}

const OTP_LENGTH = 6;

const BackupEmailOTP: React.FC<BackupEmailOTPModalProps> = ({
    isOpen,
    onClose,
    onVerify,
}) => {
    const [otp, setOtp] = React.useState(Array(OTP_LENGTH).fill(""));
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    if (!isOpen) return null;

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
        if (onVerify) onVerify(otp.join(""));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#CACACA]/80">
            <div
                className="relative bg-white rounded-[12px] shadow-xl flex flex-col items-center"
                style={{ width: "772px", height: "598px" }}
            >
                {/* Close button */}
                <button
                    className="absolute top-7 right-7 text-gray-400 hover:text-gray-600 text-2xl"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                <div className="flex flex-col items-center w-full mt-[48px]">
                    {/* Password Shield Icon */}
                    <img src={Password_shield} alt="Password_Shield" className="w-30 h-30 mb-3" />

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-center mb-2">Verify Backup Email Address</h2>
                    <p className="text-gray-600 text-center mb-10 text-base px-2 leading-6">
                        We’ve sent a 6-digit OTP to your backup email. Please enter the code below to verify<br />
                        and activate backup report delivery
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
                                className="w-[80px] h-[64px] text-center text-2xl font-bold border border-[#CACACA] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1890FF] transition"
                                autoFocus={idx === 0}
                            />
                        ))}
                    </div>

                    {/* Verify Button */}
                    <div className="w-full flex justify-center">
                        <div className="w-[600px]">
                            <PrimaryButton
                                text="Verify & Add"
                                onClick={handleVerify}
                                className="w-full py-3 rounded-lg text-base font-semibold bg-[#0064E1] hover:bg-[#0055C4] transition text-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BackupEmailOTP;

