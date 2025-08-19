

import React from "react";
import ReusableModal from "../../../components/ui/Modal/ReusableModal";
import EditMemberForm from "../../../components/forms/EditMemberForm";

interface AccessControlUser {
    id: string;
    employeeId: string;
    name: string;
    mobileNumber: string;
    role: string;
    avatar?: string;
    email?:string;
}

interface EditMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    userData?: AccessControlUser | null;
    onUpdate?: (updatedUser: AccessControlUser) => void; // Add this line
}

const EditMemberModal: React.FC<EditMemberModalProps> = ({ 
    isOpen, 
    onClose, 
    userData,
    onUpdate // Add this line
}) => {
    return (
        <ReusableModal
            isOpen={isOpen}
            onClose={onClose}
            title="Edit Member"
            size="xl"
            height="auto"
            backgroundColor="bg-white"
            showCloseButton={true}
            closeOnOverlayClick={true}
            className=""
            headerClassName=""
            contentClassName="p-6"
        >
            <EditMemberForm userData={userData} onUpdate={onUpdate} onCancel={onClose} />
        </ReusableModal>
    );
};

export default EditMemberModal;

