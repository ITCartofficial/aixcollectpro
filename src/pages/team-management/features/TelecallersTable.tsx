import { useState, useEffect } from "react";
import type { TableColumn } from "../../../components/ui/Table/DataTable";
import Avatar from "../../../components/ui/Table/Avatar";
import Badge from "../../../components/ui/Table/Badge";
import { FaEye } from "react-icons/fa";
import Dropdown from "../../../components/common/Dropdown"; // Assuming this path is correct
import SearchBar from "../../../components/common/Searchbar";
import DataTable from "../../../components/ui/Table/DataTable";

interface Telecallers {
    id: string;
    name: string;
    callsMade: number;
    paidCases: number;
    amountCollected: number;
    language: string; // This remains a string, e.g., "Hindi, English"
    status: 'Active' | 'Inactive' | 'On Leave';
    lastSynced: string;
    avatar?: string;
}

// Main Telecallers Component
const TelecallersTable: React.FC = () => {
    const [telecallersData, setTelecallersData] = useState<Telecallers[]>([]);
    const [filteredData, setFilteredData] = useState<Telecallers[]>([]);
    // Changed to string[] for multi-select language
    const [selectedLanguage, setSelectedLanguage] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedLastSynced, setSelectedLastSynced] = useState<string>('');
    const [selectedRows, setSelectedRows] = useState<Telecallers[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Load telecallers data from JSON file
    useEffect(() => {
        const loadTelecallersData = async () => {
            try {
                setIsLoading(true);
                // Replace with the actual path to your JSON file
                const response = await fetch('../../../../data/team-management/telecallersData.json'); // Ensure this path is correct

                if (!response.ok) {
                    throw new Error('Failed to load telecallers data');
                }

                const data: Telecallers[] = await response.json();
                setTelecallersData(data);
                setFilteredData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error loading telecallers data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadTelecallersData();
    }, []);

    // Filter options (computed based on loaded data)
    // Generates unique language options from the comma-separated language strings
    const languageOptions = [
        { label: 'All Languages', value: '' }, // Option to clear all language filters
        ...Array.from(new Set(
            telecallersData.flatMap(agent =>
                agent.language.split(', ').map(lang => lang.trim())
            )
        )).map(language => ({
            label: language,
            value: language
        }))
    ];

    const statusOptions = [
        { label: 'All Status', value: '' },
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
        { label: 'On Leave', value: 'On Leave' }
    ];

    const lastSyncedOptions = [
        { label: 'All Times', value: '' },
        { label: 'Within Last 1 Hour', value: 'last_hour' },
        { label: 'Today', value: 'today' },
        { label: 'Yesterday', value: 'yesterday' },
        { label: 'Past 3 Days', value: 'past_3_days' },
        { label: 'Past Week', value: 'past_week' },
        { label: 'Inactive (7+ Days)', value: 'inactive_7_days' }
    ];

    // Handle search (text search across name and language)
    const handleSearch = (query: string) => {
        let currentFiltered = telecallersData;

        if (query) {
            currentFiltered = currentFiltered.filter(agent =>
                agent.name.toLowerCase().includes(query.toLowerCase()) ||
                agent.language.toLowerCase().includes(query.toLowerCase())
            );
        }

        // Apply current dropdown filters to the search results
        applyFilters(selectedLanguage, selectedStatus, selectedLastSynced, currentFiltered);
    };

    // Handle filter changes for Language
    const handleLanguageChange = (value: string | string[]) => {
        let newSelectedLanguages: string[];

        if (Array.isArray(value)) {
            // If 'All Languages' is selected, clear all other selections
            if (value.includes('')) {
                newSelectedLanguages = [];
            } else {
                newSelectedLanguages = value;
            }
        } else {
            // This case should ideally not happen with multiSelect=true, but for safety
            newSelectedLanguages = value === '' ? [] : [value];
        }
        setSelectedLanguage(newSelectedLanguages);
        applyFilters(newSelectedLanguages, selectedStatus, selectedLastSynced);
    };

    // Handle filter changes for Status
    const handleStatusChange = (value: string | string[]) => {
        const statusValue = Array.isArray(value) ? value[0] : value; // Assuming status is single-select
        setSelectedStatus(statusValue);
        applyFilters(selectedLanguage, statusValue, selectedLastSynced);
    };

    // Handle filter changes for Last Synced
    const handleLastSyncedChange = (value: string | string[]) => {
        const lastSyncedValue = Array.isArray(value) ? value[0] : value; // Assuming last synced is single-select
        setSelectedLastSynced(lastSyncedValue);
        applyFilters(selectedLanguage, selectedStatus, lastSyncedValue);
    };

    // Central function to apply all active filters
    const applyFilters = (
        languageFilter: string | string[],
        statusFilter: string,
        lastSyncedFilter: string,
        dataToFilter: Telecallers[] = telecallersData // Allows applying filters on search results
    ) => {
        let filtered = dataToFilter;

        // Apply Language filter (multi-select logic)
        if (Array.isArray(languageFilter) && languageFilter.length > 0) {
            filtered = filtered.filter(agent =>
                languageFilter.some(selectedLang =>
                    agent.language.split(', ').map(lang => lang.trim()).includes(selectedLang)
                )
            );
        } else if (typeof languageFilter === 'string' && languageFilter) {
            // Fallback for single string if ever needed, though not for this multi-select
            filtered = filtered.filter(agent =>
                agent.language.split(', ').map(lang => lang.trim()).includes(languageFilter)
            );
        }

        // Apply Status filter
        if (statusFilter) {
            filtered = filtered.filter(agent => agent.status === statusFilter);
        }

        // Apply Last Synced filter (placeholder logic)
        if (lastSyncedFilter) {
            console.log('Filtering by lastSynced:', lastSyncedFilter);
            // Implement actual last synced filtering logic here based on your data format
            // Example:
            // if (lastSyncedFilter === 'today') {
            //     filtered = filtered.filter(agent => isToday(agent.lastSynced));
            // }
        }

        setFilteredData(filtered);
    };

    const handleSelectionChange = (selected: Telecallers[]) => {
        setSelectedRows(selected);
    };

    const handleViewAgent = (agent: Telecallers) => {
        console.log('Viewing agent:', agent);
        // Implement navigation or modal to view agent details
    };

    // Table columns configuration
    const columns: TableColumn<Telecallers>[] = [
        {
            key: 'name',
            label: 'Name',
            sortable: true,
            width: '200px',
            render: (value, row) => (
                <div className="flex items-center space-x-3">
                    <Avatar name={value} image={row.avatar} size="md" />
                    <span className="font-medium text-gray-900">{value}</span>
                </div>
            )
        },
        {
            key: 'callsMade',
            label: 'Calls Made',
            sortable: true,
            width: '120px',
            className: 'text-center',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'paidCases',
            label: 'Paid Cases',
            sortable: true,
            width: '120px',
            className: 'text-center',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'amountCollected',
            label: 'Amount Collected',
            sortable: true,
            width: '160px',
            className: 'text-center',
            render: (value) => <span className="font-medium">₹{value.toLocaleString()}</span>
        },
        {
            key: 'language',
            label: 'Language',
            sortable: true,
            width: '150px',
            className: "text-left",
            render: (value) => <span className="text-gray-700">{value}</span>
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            width: '120px',
            className: 'text-center',
            render: (value) => {
                const variant = value === 'Active' ? 'success' : value === 'In Active' ? 'danger' : 'info';
                return <Badge variant={variant}>{value}</Badge>;
            }
        },
        {
            key: 'lastSynced',
            label: 'Last Synced',
            sortable: true,
            width: '120px',
            className: 'text-center',
            render: (value) => <span className="text-gray-600">{value}</span>
        },
        {
            key: 'id',
            label: 'Action',
            sortable: false,
            width: '100px',
            className: 'text-center',
            render: (_, row) => (
                <button
                    className="bg-primary-700 hover:bg-primary-600 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent row selection if DataTable also has row click
                        handleViewAgent(row);
                    }}
                >
                    <FaEye className="w-4 h-4" />
                    <span>View</span>
                </button>
            )
        }
    ];

    // Loading state UI
    if (isLoading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    // Error state UI
    if (error) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error loading data</h3>
                            <div className="mt-2 text-sm text-red-700">
                                <p>{error}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4 bg-white min-h-screen rounded-lg p-6">
            {/* Filters and Search Section */}
            <div className="bg-white p-4 rounded-lg">
                <div className="flex flex-wrap items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">Filter by:</span>

                    {/* Language Dropdown (Multi-select) */}
                    <Dropdown
                        options={languageOptions}
                        value={selectedLanguage} // Pass array of selected languages
                        onChange={handleLanguageChange}
                        placeholder="Select Language"
                        className="min-w-48"
                        multiSelect={true} // Enable multi-selection
                    />

                    {/* Status Dropdown (Single-select) */}
                    <Dropdown
                        options={statusOptions}
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        placeholder="Select Status"
                        className="min-w-48"
                    />

                    {/* Last Synced Dropdown (Single-select) */}
                    <Dropdown
                        options={lastSyncedOptions}
                        value={selectedLastSynced}
                        onChange={handleLastSyncedChange}
                        placeholder="Select Time"
                        className="min-w-48"
                    />

                    <div className="ml-auto">
                        <SearchBar
                            placeholder="Search agents..."
                            onSearch={handleSearch}
                            className="w-64"
                        />
                    </div>
                </div>
            </div>

            {/* Selected Items Display */}
            {selectedRows.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-900">
                            {selectedRows.length} agent{selectedRows.length > 1 ? 's' : ''} selected
                        </span>
                        <button
                            onClick={() => setSelectedRows([])}
                            className="text-sm text-blue-700 hover:text-blue-900 cursor-pointer"
                        >
                            Clear selection
                        </button>
                    </div>
                </div>
            )}

            {/* DataTable Component */}
            <DataTable
                data={filteredData}
                columns={columns}
                selectable={true}
                selectedRows={selectedRows}
                onSelectionChange={handleSelectionChange}
                sortable={true}
                pagination={true}
                pageSize={10}
                className="shadow-sm"
                emptyMessage="No telecallers found"
                getRowId={(row) => row.id}
            />
        </div>
    );
};

export default TelecallersTable;
