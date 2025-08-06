import ProfileTabSection from "./profile/ProfileTabSection";
import UserDetails from "./profile/UserDetails";

const userData = {
    name: "Arjun Kannan",
    phone: "+91 98765 43210",
    email: "Arjun101@gmail.com",
    role: "Supervisor",
    employeeId: "SUP-30421",
    location: "Bangalore",
    vendor: "ITCart",
    reportingManager: "Anjali Nair (Ops Head)",
    joinedOn: "15 March, 2022",
    status: "Active" as "Active" | "Inactive",
    avatar: "",
};

const ProfileSettings = () => {
    const handleEdit = () => {
        console.log(`Edit profile clicked by ITCartofficial at 2025-07-30 10:26:13`);
    };

    const handleApplyLeave = () => {
        console.log(`Apply leave clicked by ITCartofficial at 2025-07-30 10:26:13`);
    };

    return (
        <div className="w-full">
            <UserDetails
                {...userData}
                onEdit={handleEdit}
                onApplyLeave={handleApplyLeave} />
            <div className="mt-4"><ProfileTabSection /></div>
        </div>
    );
};

export default ProfileSettings;



