type PrimaryButtonProps = {
  text: string;
  onClick?: () => void;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full min-w-[150px] bg-primary-700 hover:bg-primary-600 cursor-pointer text-white text-sm font-medium px-6 py-3 rounded-sm shadow-md transition-all"
    >
      {text}
    </button>
  );
};

export default PrimaryButton;