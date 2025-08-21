import { useNavigate } from "react-router-dom"



const data = [
    {
        taskId: "#COL-1023",
        agenName: 'Rohit Patil',
        issuetype: "Location mismatch",
        dateAndTime: "08 June, 10:15 AM"
    },
    {
        taskId: "#COL-1047",
        agenName: 'Nadeem Khan',
        issuetype: "Damaged document",
        dateAndTime: "08 June, 09:58 AM"
    },
    {
        taskId: "#COL-1081",
        agenName: 'Arvind Rao',
        issuetype: "Check-in skipped",
        dateAndTime: "08 June, 08:42 AM"
    },
    {
        taskId: "#COL-1084",
        agenName: 'Anand Kumar',
        issuetype: "Check-in skipped",
        dateAndTime: "08 June, 08:42 AM"
    },
    ]

const FlaggedTaskCard = () => {
        const navigate = useNavigate();

    const handleViewAll = () => {
        navigate("/alerts-and-escalations");
    }
  return (
    <div className="bg-white p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-neutral-700">Flagged Tasks</h2>
                <button className="text-primary-700 text-sm font-medium hover:text-primary-500 transition-colors cursor-pointer" onClick={handleViewAll}>
                    View all →
                </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-4">
                <table className="w-full">
                    <thead>
                        <tr className="bg-neutral-100">
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-700">
                                Task ID
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-700">
                                Agent Name
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-700">
                                Issue Type
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-700">
                                Date & Time
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                        {data.map((row, index) => (
                            <tr key={index} className="hover:bg-neutral-50">
                                <td className="px-4 py-[15px] text-sm text-neutral-600 font-regular">
                                    {row.taskId}
                                </td>
                                <td className="px-4 py-[15px] text-sm text-neutral-600 font-regular">
                                    {row.agenName}
                                </td>
                                <td className="px-4 py-[15px] text-sm text-neutral-600 font-regular">
                                    {row.issuetype}
                                </td>
                                <td className="px-4 py-[15px] text-sm text-neutral-600 font-regular">
                                    {row.dateAndTime}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
  )
}

export default FlaggedTaskCard