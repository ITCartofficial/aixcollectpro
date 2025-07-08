

const data = [
    {
        matric: "Visit Completion Rate",
        value: '190',
        notes: "562 of 689 tasks successfully completed",
    },
    {
        matric: "Flagged Visit Rate",
        value: "5%",
        notes: "34 visits flagged by agents for issues",
    },
    {
        matric: "Reschedule Rate",
        value: "5%",
        notes: "30 visits were rescheduled due to borrower issues",
    },
    {
        matric: "Avg Collection per Visit",
        value: "₹3,025",
        notes: "Based on 562 completed and paid field visits",
    },

];

const VisitSuccessMatrics = () => {
    return (
        <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900">Visit Success Metrics</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-4">
                <table className="w-full">
                    <thead>
                        <tr className="bg-neutral-100">
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-700">
                                Matric
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-700">
                                Value
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-700">
                                Notes
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-[15px] text-sm text-neutral-600 font-regular">
                                    {row.matric}
                                </td>
                                <td className="px-4 py-[15px] text-sm text-neutral-600 font-regular">
                                    {row.value}
                                </td>
                                <td className="px-4 py-[15px] text-sm text-neutral-600 font-regular">
                                    {row.notes}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default VisitSuccessMatrics