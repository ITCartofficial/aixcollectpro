
import { useMemo, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

// Type definitions
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  width?: string;
  className?: string;
  headerAlign?: 'left' | 'center' | 'right'; // NEW: header alignment
  render?: (value: any, row: T, rowIndex: number) => React.ReactNode;
}

export interface TableProps<T extends Record<string, any>> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  className?: string;
  rowClassName?: string;
  headerClassName?: string;
  onRowClick?: (row: T, rowIndex: number) => void;
  selectable?: boolean;
  selectedRows?: T[];
  onSelectionChange?: (selectedRows: T[]) => void;
  sortable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  emptyMessage?: string;
  // Add a unique key extractor for proper row identification
  getRowId?: (row: T) => string | number;
}

// Helper for table header alignment
const getHeaderAlignClass = (align?: 'left' | 'center' | 'right') => {
  switch (align) {
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    default:
      return 'text-left';
  }
};

// Reusable Table Component
const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  className = '',
  rowClassName = '',
  headerClassName = '',
  onRowClick,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  sortable = true,
  pagination = true,
  pageSize: initialPageSize = 10,
  emptyMessage = 'No data available',
  getRowId = (row: T) => row.id || JSON.stringify(row) // Default fallback
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string ;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Page size options
  const pageSizeOptions = [5, 10, 20, 50, 100];

  // Sorting logic
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

  // Pagination logic
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  // Reset to first page when page size changes
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const handleSort = (key: string) => {
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
  };

  const handleSelectAll = (checked: boolean) => {
    if (!onSelectionChange) return;

    if (checked) {
      // Select all rows on current page
      const currentPageIds = paginatedData.map(row => getRowId(row));
      const newSelectedRows = [
        ...selectedRows.filter(row => !currentPageIds.includes(getRowId(row))),
        ...paginatedData
      ];
      onSelectionChange(newSelectedRows);
    } else {
      // Deselect all rows on current page
      const currentPageIds = paginatedData.map(row => getRowId(row));
      const newSelectedRows = selectedRows.filter(row => !currentPageIds.includes(getRowId(row)));
      onSelectionChange(newSelectedRows);
    }
  };

  const handleRowSelect = (row: T, checked: boolean) => {
    if (!onSelectionChange) return;

    const rowId = getRowId(row);

    if (checked) {
      // Add row if not already selected
      const isAlreadySelected = selectedRows.some(selectedRow => getRowId(selectedRow) === rowId);
      if (!isAlreadySelected) {
        onSelectionChange([...selectedRows, row]);
      }
    } else {
      // Remove row from selection
      const newSelectedRows = selectedRows.filter(selectedRow => getRowId(selectedRow) !== rowId);
      onSelectionChange(newSelectedRows);
    }
  };

  // Check if a row is selected
  const isRowSelected = (row: T) => {
    const rowId = getRowId(row);
    return selectedRows.some(selectedRow => getRowId(selectedRow) === rowId);
  };

  // Check selection state for current page
  const currentPageSelectedCount = paginatedData.filter(row => isRowSelected(row)).length;
  const isAllSelected = currentPageSelectedCount === paginatedData.length && paginatedData.length > 0;
  const isPartiallySelected = currentPageSelectedCount > 0 && currentPageSelectedCount < paginatedData.length;

  const getSortIcon = (columnKey: string) => {
    if (sortConfig?.key === columnKey) {
      return sortConfig.direction === 'asc' ?
        <FaChevronUp className="w-4 h-4" /> :
        <FaChevronDown className="w-4 h-4" />;
    }
    return <FaChevronDown className="w-4 h-4 opacity-50" />;
  };

  // Generate page numbers to display
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Always show pagination if pagination is enabled and data is not empty
  const showPagination = pagination && sortedData.length > 0;

  return (
    <div className={`bg-white rounded-lg ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={`bg-gray-50 ${headerClassName}`}>
            <tr>
              {selectable && (
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
              {columns.map((column: TableColumn<T>, index: number) => (
                <th
                  key={index}
                  className={`
                    px-3 py-3
                    text-xs font-medium text-gray-500 uppercase tracking-wider
                    ${column.sortable && sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                    ${getHeaderAlignClass(column.headerAlign)}
                    ${column.className || ''}
                  `}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key as string)}
                >
                  <div className={`flex items-center ${column.headerAlign === 'center' ? 'justify-center' : column.headerAlign === 'right' ? 'justify-end' : 'justify-start'} space-x-1`}>
                    <span>{column.label}</span>
                    {column.sortable && sortable && getSortIcon(column.key as string)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row: T, rowIndex: number) => (
                <tr
                  key={getRowId(row)}
                  className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''} ${rowClassName}`}
                  onClick={() => onRowClick?.(row, rowIndex)}
                >
                  {selectable && (
                    <td className="px-4 py-3 whitespace-nowrap w-12">
                      <input
                        type="checkbox"
                        checked={isRowSelected(row)}
                        onChange={(e) => {
                          e.stopPropagation(); // Prevent row click when clicking checkbox
                          handleRowSelect(row, e.target.checked);
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent row click when clicking checkbox
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                      />
                    </td>
                  )}
                  {columns.map((column: TableColumn<T>, colIndex: number) => (
                    <td
                      key={colIndex}
                      className={`px-3 py-3 whitespace-nowrap text-sm ${column.className || ''}`}
                      style={{ width: column.width }}
                    >
                      {column.render
                        ? column.render(row[column.key as keyof T], row, rowIndex)
                        : row[column.key as keyof T]
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* New Pagination UI */}
      {showPagination && (
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
              className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
            >
              <FiChevronsLeft /> Prev
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
            >
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
                  }`}
              >
                {page}
              </button>
            ))}

            {/* Next buttons */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
            >
              Next <FiChevronRight />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
            >
              Next <FiChevronsRight />
            </button>
          </div>

          {/* Right side - Items per page */}
          <div className="flex items-center space-x-2">
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
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

export default DataTable;