import React from "react";
import ReusableModal from "../../../components/ui/Modal/ReusableModal";
import AddNewMemberForm from "../../../components/forms/AddNewMemberForm";

interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddNewMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose }) => {
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
            <AddNewMemberForm />
        </ReusableModal>
    );
};

export default AddNewMemberModal;