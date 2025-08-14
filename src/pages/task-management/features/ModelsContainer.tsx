import React, { useState } from "react";
import ReusableModal from "../../../components/ui/Modal/ReusableModal";
import ReassignTaskModal from "../popup-models/ReassignTaskModal";
import RescheduleTaskModal from "../popup-models/RescheduleTaskModal";
import UpdateTaskLocationModal from "../popup-models/UpdateTaskLocationModal";
import FlagTaskReviewModal from "../popup-models/FlagTaskReviewModal";
import AddNotesTaskModal from "../popup-models/AddNotesTaskModal";

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
  // Reassign
  const agentOptions = [
    { label: "Rakesh Kumar", value: "1" },
    { label: "Suresh Singh", value: "2" },
  ];
  const [selectedAgent, setSelectedAgent] = useState(agentOptions[0].value);
  const [reassignReason, setReassignReason] = useState("");

  // Reschedule (before reusable timepicker)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState(""); // just a string
  const [rescheduleReason, setRescheduleReason] = useState("");

  // Update Location
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [locationReason, setLocationReason] = useState("");

  // Flag
  const [selectedReason, setSelectedReason] = useState("");
  const [flagNotes, setFlagNotes] = useState("");

  // Add Notes
  const [notesDate, setNotesDate] = useState<Date | null>(null);
  const [notesCategory, setNotesCategory] = useState("");
  const [notesText, setNotesText] = useState("");

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
      {/* You can add the edit modal or other modals similarly */}
    </ReusableModal>
  );
};

export default ModelsContainer;