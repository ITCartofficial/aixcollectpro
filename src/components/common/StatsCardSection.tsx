import type { StatsData } from "../ui/Card/StatsCard";
import StatsCard from "../ui/Card/StatsCard";

type StatsCardSectionProps = {
  cardData: StatsData[];
  className?: string;
  gap?: string;
};

const StatsCardSection: React.FC<StatsCardSectionProps> = ({
  cardData,
  className = "",
  gap = "gap-6",
}) => {
  // Always: mobile (1), sm (1), md (2), lg (5)
  const gridClasses =
    "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";

  return (
    <div className={`mt-5 ${gridClasses} ${gap} ${className}`}>
      {cardData.map((stat) => (
        <StatsCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          className={stat.className}
        />
      ))}
    </div>
  );
};

export default StatsCardSection;
