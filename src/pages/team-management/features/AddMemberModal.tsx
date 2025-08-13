import React from "react";
import ReusableModal from "../../../components/ui/Modal/ReusableModal";
import AddMemberForm from "../../../components/forms/AddMemberForm";


interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose }) => {
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
            <AddMemberForm />
        </ReusableModal>
    );
};

export default AddMemberModal;