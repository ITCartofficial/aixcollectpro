import { MdChecklist } from "react-icons/md"
import TaskCountCard from "../../components/ui/Card/TaskCountCard"


const taskCountCardData = {
    title: "Total Task",
    totalCount: 689,
    sections: [
        { label: "Completed", count: 460, percentage: 68, color: "#10A95C" },
        { label: "Pending", count: 138, percentage: 20, color: "#FFAD0D" },
        { label: "Flagged", count: 91, percentage: 14, color: "#F64C4C" }
    ]
};

const TaskSection = () => {
    return (
        <div className="bg-white rounded-lg p-4 shadow-[0px_1px_3px_0px_rgba(0, 81, 175, 0.10)]">
            <div className="flex justify-between py-4 px-4 mb-3">
                <div>
                    <h3 className="text-sm font-medium text-gray-500">{taskCountCardData.title}</h3>
                    <span className="text-3xl font-bold text-gray-900">{taskCountCardData.totalCount}</span>
                </div>
                <div className="w-[52px] h-[52px] bg-primary-100 flex items-center justify-center rounded-lg">
                    <MdChecklist className="text-3xl text-primary-700" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {taskCountCardData.sections.map((section, index) => (
                    <TaskCountCard
                        key={index}
                        title={`${section.label} Tasks`}
                        totalCount={section.count}
                        sections={[section]}
                    />
                ))}
            </div>
        </div>
    )
}

export default TaskSection