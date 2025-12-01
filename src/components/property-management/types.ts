import { Agent } from "./Agent";

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
  images?: string[];
  description: string;
  features: string[];
  agent: Agent;
  impressions: number;
}