type OutlineButtonProps = {
    text: string;
    onClick?: () => void;
    className?: string;
    icon?: React.ReactNode;
};

const OutlineButton: React.FC<OutlineButtonProps> = ({ text, onClick, className}) => {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-3 bg-white hover:bg-primary-700 text-primary-700 hover:text-white text-sm font-medium rounded-sm border border-primary-700 cursor-pointer transition-colors duration-200 ${className}`}>
            {text}
        </button>
    );
};

export default OutlineButton;