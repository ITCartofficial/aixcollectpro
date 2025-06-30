import CircularProgress from "../Chart/Circularprogress";


// Types for the card data
interface TaskCountCardData {
    title: string;
    totalCount: number;
    sections: {
        label: string;
        count: number;
        percentage: number;
        color: string;
    }[];
}


const TaskCountCard: React.FC<TaskCountCardData> = ({ title, totalCount, sections }) => {
    const sectionData = sections[0];
    return (


        <div className="w-full h-max flex justify-between items-center bg-white border border-neutral-300 rounded-lg py-6 px-4 shadow-[0px_8px_16px_0px_rgba(0,0,0,0.06)]">
            <div>
                <h3 className="text-xs font-medium text-neutral-600 pb-2">{title}</h3>
                <span className="text-regular font-bold text-neutral-700">{totalCount}</span>
            </div>
            <div>
                <CircularProgress
                    percentage={60}
                    color={sectionData.color}
                    size={40}
                />
            </div>
        </div>
    );
};
export default TaskCountCard;