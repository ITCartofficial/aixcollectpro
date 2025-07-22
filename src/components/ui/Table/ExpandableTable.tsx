import React, { useState, useMemo, useCallback } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

// Generic interfaces for reusable table
export interface TableColumn<T> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    render?: (value: any, row: T) => React.ReactNode;
    width?: string;
    align?: 'left' | 'center' | 'right' | 'end'; // Added 'end'
    className?: string;
}

export interface ExpandableRowData {
    id: string;
    [key: string]: any;
}

export interface ExpandableTableProps<T extends ExpandableRowData> {
    data: T[];
    columns: TableColumn<T>[];
    expandedRowRenderer?: (row: T) => React.ReactNode;
    onRowAction?: (action: string, row: T) => void;
    pageSize?: number;
    enableSelection?: boolean;
    enableExpansion?: boolean;
    selectedRows?: T[];
    onSelectionChange?: (selectedRows: T[]) => void;
    sortable?: boolean;
    pagination?: boolean;
    className?: string;
    emptyMessage?: string;
    getRowId?: (row: T) => string;
}

const ExpandableTable = <T extends ExpandableRowData>({
    data,
    columns,
    expandedRowRenderer,
    pageSize: initialPageSize = 10,
    enableSelection = true,
    enableExpansion = true,
    selectedRows = [],
    onSelectionChange,
    sortable = true,
    pagination = true,
    className = "",
    emptyMessage = "No data found.",
    getRowId = (row: T) => row.id
}: ExpandableTableProps<T>) => {
    const [expandedRow, setExpandedRow] = useState<string | null>(null); // Only one row expanded at a time
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [sortConfig, setSortConfig] = useState<{
        key: keyof T;
        direction: 'asc' | 'desc';
    } | null>(null);

    // Page size options
    const pageSizeOptions = [5, 10, 20, 50, 100];

    // Sort data (no filtering - that's handled by parent component)
    const sortedData = useMemo(() => {
        if (!sortConfig) return data;

        return [...data].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);

    // Pagination
    const paginatedData = useMemo(() => {
        if (!pagination) return sortedData;

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return sortedData.slice(startIndex, endIndex);
    }, [sortedData, currentPage, pageSize, pagination]);

    const totalPages = Math.ceil(sortedData.length / pageSize);

    // Event handlers
    const handleSort = useCallback((key: keyof T) => {
        if (!sortable) return;

        setSortConfig(prevSort => {
            if (prevSort?.key === key) {
                return {
                    key,
                    direction: prevSort.direction === 'asc' ? 'desc' : 'asc'
                };
            }
            return { key, direction: 'asc' };
        });
    }, [sortable]);

    const toggleRowExpansion = useCallback((id: string) => {
        setExpandedRow(prev => (prev === id ? null : id));
    }, []);

    const handleRowSelect = useCallback((row: T, checked: boolean) => {
        if (!onSelectionChange) return;

        const rowId = getRowId(row);
        if (checked) {
            const isAlreadySelected = selectedRows.some(selectedRow => getRowId(selectedRow) === rowId);
            if (!isAlreadySelected) {
                onSelectionChange([...selectedRows, row]);
            }
        } else {
            onSelectionChange(selectedRows.filter(selectedRow => getRowId(selectedRow) !== rowId));
        }
    }, [selectedRows, onSelectionChange, getRowId]);

    const handleSelectAll = useCallback((checked: boolean) => {
        if (!onSelectionChange) return;

        const displayedData = pagination ? paginatedData : sortedData;
        const currentPageIds = displayedData.map(row => getRowId(row));

        if (checked) {
            const newSelectedRows = [
                ...selectedRows.filter(row => !currentPageIds.includes(getRowId(row))),
                ...displayedData
            ];
            onSelectionChange(newSelectedRows);
        } else {
            onSelectionChange(selectedRows.filter(row => !currentPageIds.includes(getRowId(row))));
        }
    }, [selectedRows, paginatedData, sortedData, onSelectionChange, pagination, getRowId]);

    const handlePageSizeChange = useCallback((newPageSize: number) => {
        setPageSize(newPageSize);
        setCurrentPage(1);
    }, []);

    // Helper functions
    const getSortIcon = useCallback((columnKey: keyof T) => {
        if (sortConfig?.key === columnKey) {
            return sortConfig.direction === 'asc' ?
                <FaChevronUp className="w-4 h-4" /> :
                <FaChevronDown className="w-4 h-4" />;
        }
        return <FaChevronDown className="w-4 h-4 opacity-50" />;
    }, [sortConfig]);

    const isRowSelected = useCallback((row: T) => {
        const rowId = getRowId(row);
        return selectedRows.some(selectedRow => getRowId(selectedRow) === rowId);
    }, [selectedRows, getRowId]);

    // Check selection state for current page
    const displayedData = pagination ? paginatedData : sortedData;
    const currentPageSelectedCount = displayedData.filter(row => isRowSelected(row)).length;
    const isAllSelected = currentPageSelectedCount === displayedData.length && displayedData.length > 0;
    const isPartiallySelected = currentPageSelectedCount > 0 && currentPageSelectedCount < displayedData.length;

    // Generate page numbers
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    const renderCellContent = (column: TableColumn<T>, row: T) => {
        const value = row[column.key];
        if (column.render) {
            return column.render(value, row);
        }
        return value?.toString() || '';
    };

    // Improved alignment handling for td/th
    const getColumnAlign = (align?: string) => {
        switch (align) {
            case 'left': return 'text-left';
            case 'right': return 'text-right';
            case 'end': return 'text-right';
            case 'center': return 'text-center';
            default: return '';
        }
    };

    return (
        <div className={`bg-white rounded-lg shadow-sm ${className}`}>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {enableSelection && (
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                    <input
                                        type="checkbox"
                                        checked={isAllSelected}
                                        ref={input => {
                                            if (input) input.indeterminate = isPartiallySelected;
                                        }}
                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                                    />
                                </th>
                            )}
                            {columns.map((column) => (
                                <th
                                    key={column.key.toString()}
                                    className={`px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${column.sortable && sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                                        } ${getColumnAlign(column.align)} ${column.className || ''}`}
                                    style={column.width ? { width: column.width } : {}}
                                    onClick={() => column.sortable && sortable && handleSort(column.key)}
                                >
                                    <div className="flex items-center justify-center space-x-1">
                                        <span>{column.label}</span>
                                        {column.sortable && sortable && getSortIcon(column.key)}
                                    </div>
                                </th>
                            ))}
                            {enableExpansion && (
                                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                    {/* Expand/Collapse column */}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {displayedData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + (enableSelection ? 1 : 0) + (enableExpansion ? 1 : 0)} className="px-6 py-12 text-center text-gray-500">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            displayedData.map((row, idx) => (
                                <React.Fragment key={`${getRowId(row)}-${idx}`}>
                                    {/* Main Row */}
                                    <tr key={`${getRowId(row)}-main-${idx}`} className="hover:bg-gray-50">
                                        {enableSelection && (
                                            <td className="px-4 py-4 whitespace-nowrap w-12">
                                                <input
                                                    type="checkbox"
                                                    checked={isRowSelected(row)}
                                                    onChange={(e) => handleRowSelect(row, e.target.checked)}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                                                />
                                            </td>
                                        )}
                                        {columns.map((column) => (
                                            <td
                                                key={column.key.toString()}
                                                className={`px-3 py-4 whitespace-nowrap ${getColumnAlign(column.align)} ${column.className || ''}`}
                                            >
                                                {renderCellContent(column, row)}
                                            </td>
                                        ))}
                                        {enableExpansion && (
                                            <td className="px-3 py-4 whitespace-nowrap w-12 text-center">
                                                <button
                                                    onClick={() => toggleRowExpansion(getRowId(row))}
                                                    className="text-gray-600 hover:text-gray-800 cursor-pointer transition-colors duration-200"
                                                >
                                                    {expandedRow === getRowId(row) ?
                                                        <FaChevronUp className="w-4 h-4" /> :
                                                        <FaChevronDown className="w-4 h-4" />
                                                    }
                                                </button>
                                            </td>
                                        )}
                                    </tr>

                                    {/* Expanded Row */}
                                    {enableExpansion && expandedRow === getRowId(row) && expandedRowRenderer && (
                                        <tr className="bg-white" key={`${getRowId(row)}-expanded-${idx}`}>
                                            <td colSpan={columns.length + (enableSelection ? 1 : 0) + (enableExpansion ? 1 : 0)} className="px-6 py-4">
                                                {expandedRowRenderer(row)}
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* New Pagination UI */}
            {pagination && totalPages > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
                    {/* Left side - Items count */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-700">
                            {Math.min((currentPage - 1) * pageSize + 1, sortedData.length)}-{Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} Items
                        </span>
                    </div>

                    {/* Center - Page navigation */}
                    <div className="flex items-center space-x-1">
                        {/* Previous buttons */}
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer">
                            <FiChevronsLeft /> Prev
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer">
                            <FiChevronLeft /> Prev
                        </button>

                        {/* Page numbers */}
                        {getPageNumbers().map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 text-sm rounded ${currentPage === page
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-700 hover:bg-gray-100 cursor-pointer'
                                    }`}>
                                {page}
                            </button>
                        ))}

                        {/* Next buttons */}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer">
                            Next <FiChevronRight />
                        </button>
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer">
                            Next <FiChevronsRight />
                        </button>
                    </div>

                    {/* Right side - Items per page */}
                    <div className="flex items-center space-x-2">
                        <select
                            value={pageSize}
                            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                            className="border border-gray-300 rounded px-2 py-1 text-sm text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                            {pageSizeOptions.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                        <span className="text-sm text-gray-700">Items per Page</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpandableTable;
