// Avatar Component
interface AvatarProps {
  name: string;
  image?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  bgColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  name,
  image,
  size = "md",
  className = "",
  bgColor,
}) => {
  const getInitials = (fullName: string) => {
    const names = fullName.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
    xl: "w-30 h-30 text-2xl",
  };

  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-teal-500",
    "bg-gray-500",
    "bg-[#039FAA]",
  ];

  const colorIndex = name.charCodeAt(0) % colors.length;
  const defaultBgColor = colors[colorIndex];
  const finalBg = bgColor ?? defaultBgColor;
  const isHex = finalBg.startsWith("#");

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} ${
        !isHex ? finalBg : ""
      } rounded-full flex items-center justify-center text-white font-medium ${className}`}
      style={isHex ? { backgroundColor: finalBg } : {}}
    >
      {getInitials(name)}
    </div>
  );
};
export default Avatar;
