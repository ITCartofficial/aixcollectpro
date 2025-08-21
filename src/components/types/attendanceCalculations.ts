// attendanceCalculations.ts

// Define the types that match your existing implementation
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
  currentStatus: string;
  todayCheckInOut: string;
  avatar: string;
}

export class AttendanceCalculator {
  private static readonly LATE_CHECKIN_CUTOFF = '10:00 AM';
  private static readonly OVERTIME_CUTOFF = '06:00 PM';
  private static readonly TOTAL_WORKING_DAYS = 26;

  static parseTime(timeStr: string): Date | null {  // Fix: return type should allow null
    if (!timeStr || timeStr === '—' || timeStr === 'â€"') return null;
    
    const cleanTime = timeStr.trim().replace(/\s+/g, ' ');
    const [time, period] = cleanTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    const date = new Date();
    let hour24 = hours;
    
    if (period?.toUpperCase() === 'PM' && hours !== 12) {
      hour24 += 12;
    } else if (period?.toUpperCase() === 'AM' && hours === 12) {
      hour24 = 0;
    }
    
    date.setHours(hour24, minutes || 0, 0, 0);
    return date;
  }

  static calculateHoursDifference(checkIn: string, checkOut: string): number {
    const inTime = this.parseTime(checkIn);
    const outTime = this.parseTime(checkOut);
    
    if (!inTime || !outTime) return 0;
    
    const diffMs = outTime.getTime() - inTime.getTime();
    return Math.max(0, diffMs / (1000 * 60 * 60));
  }

  static isLateCheckIn(checkInTime: string): boolean {
    const checkIn = this.parseTime(checkInTime);
    const cutoff = this.parseTime(this.LATE_CHECKIN_CUTOFF);
    
    if (!checkIn || !cutoff) return false;
    return checkIn > cutoff;
  }

  static calculateOvertime(checkOutTime: string): number {
    const checkOut = this.parseTime(checkOutTime);
    const overtimeCutoff = this.parseTime(this.OVERTIME_CUTOFF);
    
    if (!checkOut || !overtimeCutoff) return 0;
    
    if (checkOut > overtimeCutoff) {
      const diffMs = checkOut.getTime() - overtimeCutoff.getTime();
      return Math.max(0, diffMs / (1000 * 60 * 60));
    }
    
    return 0;
  }

  static generateAttendanceRecords(agentData: any): AttendanceRecord[] {
    // Generate sample attendance records for the past 26 days
    const records: AttendanceRecord[] = [];
    const today = new Date();
    
    for (let i = 25; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Simulate attendance patterns
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isPresent = Math.random() > 0.15 && !isWeekend; // 85% attendance rate
      
      if (isPresent) {
        const baseCheckIn = 9; // 9 AM base
        const checkInVariation = Math.random() * 2 - 0.5; // ±30 minutes
        const actualCheckIn = baseCheckIn + checkInVariation;
        
        const baseCheckOut = 18; // 6 PM base
        const checkOutVariation = Math.random() * 4; // 0-4 hours overtime
        const actualCheckOut = baseCheckOut + checkOutVariation;
        
        const checkInTime = this.formatTime(actualCheckIn);
        const checkOutTime = this.formatTime(actualCheckOut);
        
        records.push({
          id: `${agentData.agentId}-${date.toISOString().split('T')[0]}`,
          agentId: agentData.agentId,
          agentName: agentData.name,
          date: date.toLocaleDateString('en-US', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
          }),
          checkInTime,
          checkOutTime,
          totalHours: this.calculateHoursDifference(checkInTime, checkOutTime),
          lateLogin: this.isLateCheckIn(checkInTime),
          overtime: this.calculateOvertime(checkOutTime),
          status: this.isLateCheckIn(checkInTime) ? 'late' : 'present'
        });
      } else {
        records.push({
          id: `${agentData.agentId}-${date.toISOString().split('T')[0]}`,
          agentId: agentData.agentId,
          agentName: agentData.name,
          date: date.toLocaleDateString('en-US', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
          }),
          checkInTime: '—',
          checkOutTime: '—',
          totalHours: 0,
          lateLogin: false,
          overtime: 0,
          status: 'absent'
        });
      }
    }
    
    return records;
  }

  private static formatTime(hour: number): string {
    const wholeHour = Math.floor(hour);
    const minutes = Math.round((hour - wholeHour) * 60);
    const period = wholeHour >= 12 ? 'PM' : 'AM';
    const displayHour = wholeHour > 12 ? wholeHour - 12 : wholeHour === 0 ? 12 : wholeHour;
    
    return `${displayHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  static calculateAttendanceSummary(agentData: any): AttendanceSummary {
    const records = this.generateAttendanceRecords(agentData);
    const presentRecords = records.filter(r => r.status === 'present' || r.status === 'late');
    const absentRecords = records.filter(r => r.status === 'absent');
    const lateRecords = records.filter(r => r.lateLogin);
    const overtimeRecords = records.filter(r => r.overtime > 0);
    
    const totalHours = presentRecords.reduce((sum, r) => sum + r.totalHours, 0);
    const avgDailyHours = presentRecords.length > 0 ? totalHours / presentRecords.length : 0;
    const totalOvertimeHours = records.reduce((sum, r) => sum + r.overtime, 0);
    
    // Get today's status
    const today = new Date().toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
    const todayRecord = records.find(r => r.date === today);
    const todayCheckInOut = todayRecord && todayRecord.status !== 'absent' 
      ? `${todayRecord.checkInTime} / ${todayRecord.checkOutTime}`
      : '— / —';

    return {
      agentId: agentData.agentId,
      agentName: agentData.name,
      role: agentData.role,
      totalWorkingDays: this.TOTAL_WORKING_DAYS,
      presentDays: presentRecords.length,
      absentDays: absentRecords.length,
      lateCheckIns: lateRecords.length,
      avgDailyHours: Math.round(avgDailyHours * 10) / 10,
      totalOvertimeDays: overtimeRecords.length,
      totalOvertimeHours: Math.round(totalOvertimeHours * 10) / 10,
      currentStatus: agentData.status,
      todayCheckInOut,
      avatar: agentData.avatar
    };
  }

  static getAttendanceRecords(agentData: any): AttendanceRecord[] {
    return this.generateAttendanceRecords(agentData);
  }
}