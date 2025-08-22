import KPICardSection from "./KPICardSection";
import type{FieldAgent} from "../../../../../components/types/fieldAgentTypes/fieldAgentTypes"

interface AgentKPIProps {
  agentData?: FieldAgent;
}

const AgentKPI: React.FC<AgentKPIProps> = ({ agentData }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <KPICardSection agentData={agentData} />
    </div>
  );
};

export default AgentKPI;
