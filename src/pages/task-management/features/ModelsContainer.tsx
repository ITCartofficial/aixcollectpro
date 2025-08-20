import React from "react";
import ReusableModal from "../../../components/ui/Modal/ReusableModal";
import ReassignTaskModal from "../popup-models/ReassignTaskModal";
import RescheduleTaskModal from "../popup-models/RescheduleTaskModal";
import UpdateTaskLocationModal from "../popup-models/UpdateTaskLocationModal";
import FlagTaskReviewModal from "../popup-models/FlagTaskReviewModal";
import AddNotesTaskModal from "../popup-models/AddNotesTaskModal";
import EditTaskModel from "../popup-models/EditTaskModel";

// Types for props
type ModalType =
  | "reassign"
  | "reschedule"
  | "edit"
  | "flag"
  | "updateLocation"
  | "addNotes"
  | null;

interface ModelsContainerProps {
  activeModal: ModalType;
  setActiveModal: React.Dispatch<React.SetStateAction<ModalType>>;
  // All shared options for dropdowns, etc.
  cityOptions: { label: string; value: string }[];
  stateOptions: { label: string; value: string }[];
  flagReasons: { label: string; value: string }[];
  notesCategories: { label: string; value: string }[];
}

const ModelsContainer: React.FC<ModelsContainerProps> = ({
  activeModal,
  setActiveModal,
  cityOptions,
  stateOptions,
  flagReasons,
  notesCategories,
}) => {
  // Example state for each modal:
  // (You can organize these by modal if you want even cleaner code)
  const agentOptions = [
    { label: "Rakesh Kumar", value: "1" },
    { label: "Suresh Singh", value: "2" },
  ];
  const [selectedAgent, setSelectedAgent] = React.useState(agentOptions[0].value);
  const [reassignReason, setReassignReason] = React.useState("");

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = React.useState(""); // just a string for time
  const [rescheduleReason, setRescheduleReason] = React.useState("");

  const [addressLine1, setAddressLine1] = React.useState("");
  const [addressLine2, setAddressLine2] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [locationReason, setLocationReason] = React.useState("");

  const [selectedReason, setSelectedReason] = React.useState("");
  const [flagNotes, setFlagNotes] = React.useState("");

  const [notesDate, setNotesDate] = React.useState<Date | null>(null);
  const [notesCategory, setNotesCategory] = React.useState("");
  const [notesText, setNotesText] = React.useState("");

  // Example Edit Task Model: you can pass a task object or handle as needed
  // const [editTask, setEditTask] = React.useState<TaskType | undefined>(initialTask);

  // Modal action handlers
  const handleReassign = () => {
    setActiveModal(null);
    setSelectedAgent(agentOptions[0].value);
    setReassignReason("");
  };

  const handleReschedule = () => {
    setActiveModal(null);
    setSelectedDate(null);
    setSelectedTime("");
    setRescheduleReason("");
  };

  const handleUpdateLocation = () => {
    setActiveModal(null);
    setAddressLine1("");
    setAddressLine2("");
    setCity("");
    setState("");
    setPincode("");
    setLocationReason("");
  };

  const handleFlag = () => {
    setActiveModal(null);
    setSelectedReason("");
    setFlagNotes("");
  };

  const handleAddNotes = () => {
    setActiveModal(null);
    setNotesDate(null);
    setNotesCategory("");
    setNotesText("");
  };

  return (
    <ReusableModal
      isOpen={!!activeModal}
      onClose={() => setActiveModal(null)}
      size="lg"
      height="auto"
      showCloseButton={false}
      headerClassName="pt-10 py-0 border-none text-align-center"
      contentClassName="flex flex-col items-start px-[40px] py-[32px]"
      className="rounded-xl"
    >
      {activeModal === "reassign" && (
        <ReassignTaskModal
          agentOptions={agentOptions}
          selectedAgent={selectedAgent}
          setSelectedAgent={setSelectedAgent}
          reason={reassignReason}
          setReason={setReassignReason}
          onCancel={() => setActiveModal(null)}
          onReassign={handleReassign}
        />
      )}
      {activeModal === "reschedule" && (
        <RescheduleTaskModal
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          reason={rescheduleReason}
          setReason={setRescheduleReason}
          onCancel={() => setActiveModal(null)}
          onReschedule={handleReschedule}
        />
      )}
      {activeModal === "updateLocation" && (
        <UpdateTaskLocationModal
          addressLine1={addressLine1}
          setAddressLine1={setAddressLine1}
          addressLine2={addressLine2}
          setAddressLine2={setAddressLine2}
          city={city}
          setCity={setCity}
          state={state}
          setState={setState}
          pincode={pincode}
          setPincode={setPincode}
          reason={locationReason}
          setReason={setLocationReason}
          cityOptions={cityOptions}
          stateOptions={stateOptions}
          onCancel={() => setActiveModal(null)}
          onUpdate={handleUpdateLocation}
        />
      )}
      {activeModal === "flag" && (
        <FlagTaskReviewModal
          flagReasons={flagReasons}
          selectedReason={selectedReason}
          setSelectedReason={setSelectedReason}
          notes={flagNotes}
          setNotes={setFlagNotes}
          onCancel={() => setActiveModal(null)}
          onFlag={handleFlag}
        />
      )}
      {activeModal === "addNotes" && (
        <AddNotesTaskModal
          date={notesDate}
          setDate={setNotesDate}
          category={notesCategory}
          setCategory={setNotesCategory}
          notes={notesText}
          setNotes={setNotesText}
          categoryOptions={notesCategories}
          onCancel={() => setActiveModal(null)}
          onAddNote={handleAddNotes}
        />
      )}
      {activeModal === "edit" && (
        <EditTaskModel
          // Pass props for EditTaskModel as needed (e.g. task, onCancel, onSave, etc.)
          // task={editTask}
          // onCancel={() => setActiveModal(null)}
          // onSave={handleEditSave}
        />
      )}
    </ReusableModal>
  );
};

export default ModelsContainer;