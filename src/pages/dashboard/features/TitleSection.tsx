import { GoGraph } from "react-icons/go"
import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton"
import DateRangePickerInput from "../../../components/ui/Input/DateRangePickerInput"
import { useState } from "react";
import TaskAssignmentModal from "./TaskAssignmentModal";



const TitleSection: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    return (
        <div className="w-full mt-4">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-6 mr-3">
                <div className="flex-1">
                    <h1 className="text-xl lg:text-2xl font-bold text-black mb-2">
                        Welcome back, Arjun!
                    </h1>
                    <p className="text-sm sm:text-base text-black leading-relaxed">
                        Here's a quick snapshot of collection performance and team activity.{" "}
                        <span className="text-gray-600 text-xs sm:text-sm block sm:inline mt-1 sm:mt-0">
                            (Last Updated: 2hrs Ago)
                        </span>
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
                    <div className="w-full sm:w-auto">
                        <DateRangePickerInput />
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex-1 sm:flex-none">
                            <PrimaryButton text="+Assign Task" onClick={openModal} className="bg-primary-700 hover:bg-primary-600 text-white" />
                            <TaskAssignmentModal isOpen={isModalOpen} onClose={closeModal} />
                        </div>
                        <div className="bg-white p-2 sm:p-[13px] border border-neutral-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                            <GoGraph className="text-primary-700 w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TitleSection






