export interface MatrixCellData {
  segments: { value: number; color: string }[];
}

export interface MatrixChartData {
  [rowKey: string]: {
    [columnKey: string]: MatrixCellData;
  };
}

interface MatrixBarChartProps {
  rows: string[];
  columns: string[];
  data: MatrixChartData;
  height?: number;
  className?: string;
  rowWidth?: number;
  cellHeight?: number;
  gap?: number;
  barWidth?: number;
  verticalGap?: number; // New prop for vertical gap between bars
}

const MatrixBarChart: React.FC<MatrixBarChartProps> = ({
  rows,
  columns,
  data,
  height = 320,
  className = "",
  rowWidth = 120,
  cellHeight = 32,
  gap = 12,
  barWidth = 24,
  verticalGap = 8, // Default vertical gap
}) => {
  const getSegmentHeights = (cellData: MatrixCellData) => {
    const total = cellData.segments.reduce((sum, segment) => sum + segment.value, 0);
    if (total === 0) return cellData.segments.map(() => 0);

    return cellData.segments.map(segment => (segment.value / total) * 100);
  };

  return (
    <div className={`${className}`} style={{ height }}>
      <div className="grid grid-rows-[1fr_auto] h-full">
        {/* Matrix Grid */}
        <div
          className="grid"
          style={{
            gridTemplateRows: `repeat(${rows.length}, 1fr)`,
            gap: `${verticalGap}px`
          }}
        >
          {rows.map((row) => (
            <div
              key={row}
              className="grid items-center"
              style={{ gridTemplateColumns: `${rowWidth}px 1fr` }}
            >
              {/* Row Label */}
              <div className="text-sm text-gray-600 pr-4">
                {row}
              </div>

              {/* Row Cells */}
              <div className="grid"
                style={{
                  gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
                  gap: `${gap}px`
                }}>
                {columns.map((column) => {
                  const cellData = data[row]?.[column] || { segments: [] };
                  const heights = getSegmentHeights(cellData);

                  return (
                    <div
                      key={`${row}-${column}`}
                      className="flex justify-center">
                      <div className="flex flex-col rounded"
                        style={{ 
                          height: `${cellHeight}px`,
                          width: `${barWidth}px`
                        }}>
                        {cellData.segments.map((segment, index) => (
                          heights[index] > 0 && (
                            <div
                              key={index}
                              style={{
                                backgroundColor: segment.color,
                                height: `${heights[index]}%`,
                              }}
                            />
                          )
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Column Headers (X-axis labels below) */}
        <div className="grid mt-4" style={{ gridTemplateColumns: `${rowWidth}px 1fr` }}>
          <div></div>
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
              gap: `${gap}px`
            }}
          >
            {columns.map((column) => (
              <div key={column} className="text-center text-sm text-gray-600 font-medium">
                {column}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrixBarChart;