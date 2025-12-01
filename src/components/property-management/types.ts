export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  status: "sale" | "rent";
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  description: string;
  features: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
  };
  impressions: number;
}