import { useState, useEffect, useCallback } from "react";
import type { TableColumn } from "../../../components/ui/Table/DataTable";
import SearchBar from "../../../components/common/Searchbar";
import DataTable from "../../../components/ui/Table/DataTable";
import agentResponseEfficiencyData from "../../../../data/ai-insights/agentResponseEfficiencyData.json";
import Avatar from "../../../components/ui/Table/Avatar";
import TelecallerResponseEfficiencyTable from "./TelecallerResponseEfficiencyData";
import Badge from "../../../components/ui/Table/Badge";

// INTERFACE DEFINITIONS
interface AgentResponseEfficiencyData {
    "id": string,
    "agentName": string,
    "initials": string,
    "avgVisitDuration": number,
    "responseRate": number,
    "onVisitConversion": Number,
    "geoCoverageAccuracy": number,
    "efficiencyRating": string,
    "avatar": string
}

const AgentResponseEfficiencyTable: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('agentResponse');
    const [filteredData, setFilteredData] = useState<AgentResponseEfficiencyData[]>([]);
    const [selectedRows, setSelectedRows] = useState<AgentResponseEfficiencyData[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const allData: AgentResponseEfficiencyData[] = agentResponseEfficiencyData as AgentResponseEfficiencyData[];


    // Filtering Logic
    useEffect(() => {
        let data = [...allData];

        // Search
        if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            data = data.filter(
                item =>
                    item.agentName.toLowerCase().includes(q) ||
                    item.id.toLowerCase().includes(q)
            );
        }


        setFilteredData(data);
    }, [searchQuery, allData]);

    const handleSearch = (query: string) => setSearchQuery(query);

    const getEfficiencyRating = useCallback(
        (status: string): "success" | "warning" | "danger" | "info" | "secondary" => {
            switch (status) {
                case "Low":
                    return "success";
                case "High":
                    return "danger";
                case "Medium":
                    return "warning";
                default:
                    return "info";
            }
        },
        []
    );


    const handleSelectionChange = (rows: AgentResponseEfficiencyData[]) => setSelectedRows(rows);

    // Handle tab change
    const handleTabChange = (tab: 'agentResponse' | 'telecallerResponse') => {
        setActiveTab(tab);
        setSearchQuery('');
        setSelectedRows([]);
    };

    // If telecaller response tab is active, render TelecallerResponseEfficiencyTable
    if (activeTab === 'telecallerResponse') {
        return <TelecallerResponseEfficiencyTable onTabChange={handleTabChange} activeTab={activeTab} />;
    }


    const columns: TableColumn<AgentResponseEfficiencyData>[] = [
        {
            key: "agentName",
            label: "Agent Name",
            sortable: true,
            width: "160px",
            render: (value, row) => (
                <div className="flex items-center space-x-3">
                    <Avatar name={value} image={row.avatar} size="md" />
                    <span className="font-medium text-neutral-700">{value}</span>
                </div>
            )
        },
        {
            key: "avgVisitDuration",
            label: "Avg. Visit Duration",
            sortable: true,
            width: "110px",
            className: "text-center",
            render: v => <span className="font-medium">{v} Min</span>
        },
        {
            key: "responseRate",
            label: "Response Rate",
            sortable: true,
            width: "80px",
            className: "text-center",
            render: v => <span className="font-medium">{v}%</span>
        },
        {
            key: "onVisitConversion",
            label: "On-Visit Conversion",
            width: "90px",
            className: "text-center",
            render: value => <span className="font-medium text-neutral-700">{value}%</span>
        },
        {
            key: "geoCoverageAccuracy",
            label: "Geo Coverage Accuracy",
            width: "120px",
            className: "text-center",
            render: value => <span className="font-medium text-neutral-700">{value}%</span>
        },
        {
            key: "efficiencyRating",
            label: "Efficiency Rating",
            width: "140px",
            className: "text-center",
            render: (value: string) => <Badge variant={getEfficiencyRating(value)}>{value}</Badge>
        }
    ];

    return (
        <div className="bg-white rounded-lg p-4">
            {/* FILTERS AND SEARCH SECTION */}
            <div className="bg-white py-4 px-1 rounded-lg flex flex-wrap items-center gap-4">
                {/* Tab Navigation */}
                <div className="flex border-b border-neutral-200">
                    <button
                        className={`px-4 py-2 text-base border-b-2 transition-colors cursor-pointer ${activeTab === 'agentResponse'
                            ? 'border-primary-500 text-neutral-700 font-semibold'
                            : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 font-medium'
                            }`}
                        onClick={() => handleTabChange('agentResponse')}
                    >
                        Agent Response Efficiency
                    </button>
                    <button
                        className={`px-4 py-2 text-base border-b-2 transition-colors cursor-pointer ${activeTab === 'telecallerResponse'
                            ? 'border-primary-500 text-neutral-700 font-semibold'
                            : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 font-medium'
                            }`}
                        onClick={() => handleTabChange('telecallerResponse')}
                    >
                        Telecaller Response Efficiency
                    </button>
                </div>
                <div className="ml-auto">
                    <SearchBar
                        placeholder="Search"
                        onSearch={handleSearch}
                        className="w-64"
                    />
                </div>
            </div>

            {selectedRows.length > 0 && (
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary-700">
                            {selectedRows.length} item{selectedRows.length > 1 ? "s" : ""} selected
                        </span>
                        <button
                            onClick={() => setSelectedRows([])}
                            className="text-sm text-primary-700 hover:text-primary-700 cursor-pointer"
                        >
                            Clear selection
                        </button>
                    </div>
                </div>
            )}

            {/* DATA TABLE SECTION */}
            <div className="h-max bg-white rounded-lg shadow-sm">
                <DataTable
                    data={filteredData}
                    columns={columns}
                    selectable={true}
                    selectedRows={selectedRows}
                    onSelectionChange={handleSelectionChange}
                    sortable={true}
                    pagination={true}
                    pageSize={5}
                    className="shadow-sm"
                    emptyMessage="No agent response efficiency data found."
                    getRowId={row => row.id}
                />
            </div>
        </div>
    );
};

export default AgentResponseEfficiencyTable;
















