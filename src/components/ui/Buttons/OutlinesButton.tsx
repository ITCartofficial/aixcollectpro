type OutlineButtonProps = {
    text: string;
    onClick?: () => void;
};

const OutlinesButton: React.FC<OutlineButtonProps> = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full min-w-[150px] px-6 py-3 bg-white hover:bg-primary-600  text-primary-700 hover:text-white text-sm font-medium rounded-sm border-primary-700 hover:border-none cursor-pointer">
            {text}
        </button>
    )
}

export default OutlinesButton