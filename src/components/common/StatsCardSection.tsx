import type { StatsData } from "../ui/Card/StatsCard";
import StatsCard from "../ui/Card/StatsCard";

type StatsCardSectionProps = {
  cardData: StatsData[];
  className?: string;
  gridCols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: string;
};

const StatsCardSection: React.FC<StatsCardSectionProps> = ({ 
  cardData, 
  className = "",
  gridCols = {
    md: 2,
    lg: 4,
    xl: 5
  },
  gap = "gap-6"
}) => {
  const getGridClasses = () => {
    const { sm, md, lg, xl, '2xl': xl2 } = gridCols;
    
    let classes = "grid grid-cols-1";
    
    if (sm) classes += ` sm:grid-cols-${sm}`;
    if (md) classes += ` md:grid-cols-${md}`;
    if (lg) classes += ` lg:grid-cols-${lg}`;
    if (xl) classes += ` xl:grid-cols-${xl}`;
    if (xl2) classes += ` 2xl:grid-cols-${xl2}`;
    
    return classes;
  };

  return (
    <div className={`mt-5 ${getGridClasses()} ${gap} ${className}`}>
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

