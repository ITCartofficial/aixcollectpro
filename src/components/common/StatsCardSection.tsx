// components/common/StatsCardSection.tsx

import StatsCard from "../../components/ui/Card/StatsCard";
import type { StatsData } from "../../components/ui/Card/StatsCard";

type StatsCardSectionProps = {
  statsData: StatsData[];
};

const StatsCardSection = ({ statsData }: StatsCardSectionProps) => {
  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {statsData.map((stat) => (
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
