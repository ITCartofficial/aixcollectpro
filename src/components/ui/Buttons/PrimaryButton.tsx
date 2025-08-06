type PrimaryButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  onClick,
  className,
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 cursor-pointer text-sm font-medium px-6 py-3 rounded-sm shadow-md transition-all ${className}`}
    >
      {icon && <span className="flex ">{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default PrimaryButton;
