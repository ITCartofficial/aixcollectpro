import KPICardSection from "./KPICardSection";

import type { FieldAgent } from "../../../../../components/types/telecaller/telecallerTypes";
interface TelecallerKPIProps {
  telecaller?: FieldAgent;
}

const TelecallerKPI: React.FC<TelecallerKPIProps> = ({ telecaller }) => {
  console.log(telecaller,"kpicard")
  return (
    <div className="flex flex-col gap-y-4">
      <KPICardSection telecaller={telecaller} />
    </div>
  );
};

export default TelecallerKPI;
