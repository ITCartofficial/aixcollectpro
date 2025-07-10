type PrimaryButtonProps = {
  text: string;
  onClick?: () => void;
    className?: string;

};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-primary-700 hover:bg-primary-600 cursor-pointer text-white text-sm font-medium px-6 py-3 rounded-sm shadow-md transition-all ${className}`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;