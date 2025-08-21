export interface AttendanceRecord {
  id: string;
  agentId: string;
  agentName: string;
  date: string;
  checkInTime: string;
  checkOutTime: string;
  totalHours: number;
  lateLogin: boolean;
  overtime: number;
  status: 'present' | 'absent' | 'late';
}

export interface AttendanceSummary {
  agentId: string;
  agentName: string;
  role: string;
  totalWorkingDays: number;
  presentDays: number;
  absentDays: number;
  lateCheckIns: number;
  avgDailyHours: number;
  totalOvertimeDays: number;
  totalOvertimeHours: number;
  currentStatus: 'On-Road' | 'Inactive' | 'Active' | 'Disabled' | 'On Leave';
  todayCheckInOut: string;
  avatar?: string;
}
