export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  status: "sale" | "rent";
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  image: string;
  images?: string[];
  description: string;
  features: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
  };
}

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