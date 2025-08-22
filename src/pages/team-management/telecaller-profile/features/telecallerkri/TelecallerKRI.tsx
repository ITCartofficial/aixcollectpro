import KRICardSection from "./KRICardSections";
import type { FieldAgent } from "../../../../../components/types/fieldAgentTypes/fieldAgentTypes";
interface AgentKRIProps {
  telecaller?: FieldAgent;
}

const TelecallerKRI: React.FC<AgentKRIProps> = ({ telecaller }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <KRICardSection telecaller={telecaller} />
    </div>
  );
};

export default TelecallerKRI;