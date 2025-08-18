// import AIEditFieldAgentTable from "./AIEditFieldAgentTable";
// const AIEditAssignTask = () => {
//   return (
//     <div className="mt-4">
//       <AIEditFieldAgentTable />
//     </div>
//   );
// };

// export default AIEditAssignTask;



import AIEditFieldAgentTable from "./AIEditFieldAgentTable";

interface AIEditAssignTaskProps {
  onCancel?: () => void;
  onUpdate?: (updatedData: any) => void;
}

const AIEditAssignTask: React.FC<AIEditAssignTaskProps> = ({ 
  onCancel,
  onUpdate
}) => {
  return (
    <div className="mt-4">
      <AIEditFieldAgentTable 
        onCancel={onCancel}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default AIEditAssignTask;
