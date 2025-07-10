// import OutlinesButton from "../ui/Buttons/OutlinesButton"
// import PrimaryButton from "../ui/Buttons/PrimaryButton"


// const HeaderActionCenter = () => {
//     return (
//         <div className="w-full flex justify-between">
//             <div className="flex gap-4">
//                 <PrimaryButton text="Field Agent"/>
//                 <PrimaryButton text="Telecallers" />
//             </div>
//             <div className="h-max flex gap-4">
//                 <OutlinesButton text="+Invite Agent" />
//                 <PrimaryButton text="+Assign Task" />
//             </div>
//         </div>
//     )
// }

// export default HeaderActionCenter



import OutlinesButton from "../ui/Buttons/OutlinesButton";
import PrimaryButton from "../ui/Buttons/PrimaryButton";

type ButtonProps = {
  text: string; 
  onClick?: () => void;
  variant?: "outline" | "primary";
};

interface HeaderActionCenterProps {
  leftButtons?: ButtonProps[];
  rightButtons?: ButtonProps[];
  className?: string;
}

const HeaderActionCenter = ({
  leftButtons = [],
  rightButtons = [],
  className = "",
}: HeaderActionCenterProps) => {
  return (
    <div className={`w-full flex justify-between ${className}`}>
      <div className="flex gap-4">
        {leftButtons.map((btn, index) =>
          btn.variant === "outline" ? (
            <OutlinesButton key={index} text={btn.text} onClick={btn.onClick} className="min-w-40" />
          ) : (
            <PrimaryButton key={index} text={btn.text} onClick={btn.onClick} className="min-w-40" />
          )
        )}
      </div>
      <div className="h-max flex gap-4">
        {rightButtons.map((btn, index) =>
          btn.variant === "outline" ? (
            <OutlinesButton key={index} text={btn.text} onClick={btn.onClick} className="min-w-40" />
          ) : (
            <PrimaryButton key={index} text={btn.text} onClick={btn.onClick} className="min-w-40" />
          )
        )}
      </div>
    </div>
  );
};

export default HeaderActionCenter;