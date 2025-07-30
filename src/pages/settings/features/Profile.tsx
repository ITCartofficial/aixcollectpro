import AttendanceTab from "./AttendanceTab";
import UserDetails from "./UserDetails";

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

const Profile = () => {
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
            <div className="mt-4"><AttendanceTab /></div>
        </div>
    );
};

export default Profile;



