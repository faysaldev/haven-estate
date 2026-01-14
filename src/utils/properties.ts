export interface Property {
  _id: string;
  title: string;
  price: number;
  location: string;
  type: "residential" | "commercial" | "land" | "luxury";
  status: "sale" | "rent";
  bedrooms?: number;
  bathrooms?: number;
  impressions?: number;
  area: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  agent: {
    _id: string;
    name: string;
    number: string;
    email: string;
  };
}
