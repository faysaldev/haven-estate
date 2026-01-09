export interface ScheduleViewingForm {
  name: string;
  email: string;
  phone: string;
  view_date: Date;
  view_time: string;
}

export interface RequestInfoForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface BookPropertyForm {
  name: string;
  email: string;
  phone: string;
  price: number;
  date: Date;
}
