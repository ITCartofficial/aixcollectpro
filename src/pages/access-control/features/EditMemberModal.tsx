import React from "react";
import ReusableModal from "../../../components/ui/Modal/ReusableModal";
import EditMemberForm from "../../../components/forms/EditMemberForm";

interface EditMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditMemberModal: React.FC<EditMemberModalProps> = ({ isOpen, onClose }) => {
    return (
        <ReusableModal
            isOpen={isOpen}
            onClose={onClose}
            title="Add New Member"
            size="xl"
            height="auto"
            backgroundColor="bg-white"
            showCloseButton={true}
            closeOnOverlayClick={true}
            className=""
            headerClassName=""
            contentClassName="p-6"
        >
            <EditMemberForm />
        </ReusableModal>
    );
};

export default EditMemberModal;