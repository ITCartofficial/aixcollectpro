import { useNavigate } from "react-router-dom";
import ProfileTabSection from "./profile/ProfileTabSection";
import UserDetails from "./profile/UserDetails";


const ProfileSettings = () => {
    const navigate = useNavigate();
    
    const handleEdit = () => {
        navigate('/profile');
    };

    const handleApplyLeave = () => {
        console.log(`Apply leave clicked by ITCartofficial at 2025-08-25 10:16:29`);
    };

    return (
        <div className="w-full">
            <UserDetails
                onEdit={handleEdit}
                onApplyLeave={handleApplyLeave}
            />
            <div className="mt-4">
                <ProfileTabSection />
            </div>
        </div>
    );
};

export default ProfileSettings;