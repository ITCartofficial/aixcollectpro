declare module 'react-big-calendar' {
  import { Component, ReactNode } from 'react';

  export interface Event {
    start: Date;
    end: Date;
    title: string;
    resource?: any;
    [key: string]: any;
  }

  export interface View {
    month: 'month';
    week: 'week';
    work_week: 'work_week';
    day: 'day';
    agenda: 'agenda';
  }

  export const Views: View;

  export type ViewType = 'month' | 'week' | 'work_week' | 'day' | 'agenda';

  export interface CalendarProps {
    localizer: any;
    events: Event[];
    startAccessor?: string | ((event: Event) => Date);
    endAccessor?: string | ((event: Event) => Date);
    titleAccessor?: string | ((event: Event) => string);
    resourceAccessor?: string | ((event: Event) => any);
    views?: ViewType[] | { [key: string]: boolean | ReactNode };
    view?: ViewType;
    date?: Date;
    onNavigate?: (date: Date, view?: ViewType) => void;
    onView?: (view: ViewType) => void;
    onSelectEvent?: (event: Event) => void;
    onSelectSlot?: (slotInfo: { start: Date; end: Date; slots: Date[] }) => void;
    className?: string;
    style?: React.CSSProperties;
    components?: any;
    eventPropGetter?: (event: Event) => { className?: string; style?: React.CSSProperties };
    dayPropGetter?: (date: Date) => { className?: string; style?: React.CSSProperties };
    [key: string]: any;
  }

  export class Calendar extends Component<CalendarProps> {}

  export function momentLocalizer(moment: any): any;
  export function globalizeLocalizer(globalize: any): any;
  export function dateFnsLocalizer(dateFns: any): any;

  export default Calendar;
}