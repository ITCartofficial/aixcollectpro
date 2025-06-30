import { Link } from "react-router-dom"

const data = [
        {
            location: "Yeshwanthpur",
            tasksAssigned: 190,
            completed: 143,
            collectionTotal: "₹4,72,000",
            avgVisitValue: "₹3,302"
        },
        {
            location: "Whitefield",
            tasksAssigned: 200,
            completed: 158,
            collectionTotal: "₹5,16,000",
            avgVisitValue: "₹3,265"
        },
        {
            location: "Jayanagar",
            tasksAssigned: 175,
            completed: 125,
            collectionTotal: "₹3,87,000",
            avgVisitValue: "₹3,096"
        },
        {
            location: "Rajajinagar",
            tasksAssigned: 124,
            completed: 96,
            collectionTotal: "₹3,07,000",
            avgVisitValue: "₹3,197"
        }
    ];


const LocationWiseCollectionSummary = () => {
    return (
        <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Field Agent Performance</h2>
                <Link to="/locationwise-summary"
                    className="text-primary-700 text-sm font-medium hover:text-blue-500 transition-colors cursor-pointer">
                    View all →
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-neutral-100">
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-700">
                                Location
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-700">
                                Tasks Assigned
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-700">
                                Completed
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-700">
                                Collection Total
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-700">
                                Avg Visit Value
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-[15px] text-sm text-neutral-600 font-regular">
                                    {row.location}
                                </td>
                                <td className="px-4 py-[15px] text-sm text-neutral-600 font-regular">
                                    {row.tasksAssigned}
                                </td>
                                <td className="px-4 py-[15px] text-sm text-neutral-600 font-regular">
                                    {row.completed}
                                </td>
                                <td className="px-4 py-[15px] text-sm text-neutral-600 font-regular">
                                    {row.collectionTotal}
                                </td>
                                <td className="px-4 py-[15px] text-sm text-neutral-600 font-regular">
                                    {row.avgVisitValue}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LocationWiseCollectionSummary