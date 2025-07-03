// components/common/HeaderActionCenter.tsx

import OutlinesButton from "../ui/Buttons/OutlinesButton";
import PrimaryButton from "../ui/Buttons/PrimaryButton";

type ButtonConfig = {
  type: "primary" | "outline";
  text: string;
  onClick?: () => void;
};

type ButtonType = { type: "primary" | "outline"; text: string };

interface HeadersectionProps {
  leftButtons: ButtonType[];
  rightButtons: ButtonType[];
}


const HeaderActionCenter = ({ leftButtons, rightButtons }: HeadersectionProps) => {
  const renderButton = ({ type, text, onClick }: ButtonConfig, index: number) => {
    if (type === "primary") {
      return <PrimaryButton key={index} text={text} onClick={onClick} />;
    }
    if (type === "outline") {
      return <OutlinesButton key={index} text={text} onClick={onClick} />;
    }
    return null;
  };

  return (
    <div className="w-full flex justify-between">
      <div className="flex gap-4">
        {leftButtons.map(renderButton)}
      </div>
      <div className="flex gap-4">
        {rightButtons.map(renderButton)}
      </div>
    </div>
  );
};

export default HeaderActionCenter;
