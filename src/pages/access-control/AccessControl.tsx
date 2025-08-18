import { useState } from "react";
import PrimaryButton from "../../components/ui/Buttons/PrimaryButton";
import AccessControlTable from "./features/AccessControlTable";
import AddNewMemberModal from "./features/AddNewMemberModal";

const AccessControl = () => {
  const [isAddMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const openTaskAssignmentModal = () => setAddMemberModalOpen(true);
  const closeAddMemberModal = () => setAddMemberModalOpen(false);
  return (
    <div className="mr-3 mt-4">
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-4 h-10">
          <h1 className="text-xl lg:text-2xl font-bold text-black mb-5 mt-4">
            Access Control
          </h1>
        </div>
        <div className="flex gap-4">
          <AddNewMemberModal
            isOpen={isAddMemberModalOpen}
            onClose={closeAddMemberModal}
          />

          <PrimaryButton
            text="+Add New Member"
            className="w-46 bg-primary-700 hover:bg-primary-600 text-white"
            onClick={openTaskAssignmentModal}
          />
        </div>
      </div>
      <div className="mt-4">
        <AccessControlTable />
      </div>
    </div>
  );
};

export default AccessControl;
