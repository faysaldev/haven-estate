export interface Property {
  _id: string;
  title: string;
  price: number;
  location: string;
  type: "residential" | "commercial" | "land" | "luxury";
  status: "sale" | "rent";
  bedrooms?: number;
  bathrooms?: number;
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

export const properties: Property[] = [
  {
    _id: "1",
    title: "Modern Luxury Villa",
    price: 2850000,
    location: "Beverly Hills, CA",
    type: "luxury",
    status: "sale",
    bedrooms: 5,
    bathrooms: 6,
    area: 6500,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    description:
      "Experience unparalleled luxury in this stunning modern villa. Featuring floor-to-ceiling windows, state-of-the-art smart home technology, and breathtaking city views. The property boasts an infinity pool, home theater, wine cellar, and expansive outdoor entertainment areas.",
    features: [
      "Infinity Pool",
      "Home Theater",
      "Wine Cellar",
      "Smart Home System",
      "3-Car Garage",
      "Panoramic Views",
    ],
    agent: {
      _id: "agent1",
      name: "Sarah Johnson",
      number: "+1 (555) 123-4567",
      email: "sarah@havenestates.com",
    },
  },
  {
    _id: "2",
    title: "Downtown Penthouse",
    price: 1650000,
    location: "Manhattan, NY",
    type: "luxury",
    status: "sale",
    bedrooms: 3,
    bathrooms: 3,
    area: 3200,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    ],
    description:
      "Sophisticated penthouse in the heart of Manhattan. This urban oasis features high ceilings, premium finishes, and a private rooftop terrace with stunning skyline views. Perfect for those seeking luxury city living.",
    features: [
      "Rooftop Terrace",
      "Concierge Service",
      "Floor-to-Ceiling Windows",
      "Marble Bathrooms",
      "Chef's Kitchen",
      "City Views",
    ],
    agent: {
      _id: "agent2",
      name: "Michael Chen",
      number: "+1 (555) 234-5678",
      email: "michael@havenestates.com",
    },
  },
  {
    _id: "3",
    title: "Suburban Family Home",
    price: 725000,
    location: "Austin, TX",
    type: "residential",
    status: "sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 3800,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    ],
    description:
      "Perfect family home in a sought-after neighborhood. This spacious property features a modern kitchen, open floor plan, and beautifully landscaped backyard with pool. Located near top-rated schools and parks.",
    features: [
      "Swimming Pool",
      "Large Backyard",
      "Modern Kitchen",
      "Home Office",
      "2-Car Garage",
      "Near Schools",
    ],
    agent: {
      _id: "agent3",
      name: "Emily Rodriguez",
      number: "+1 (555) 345-6789",
      email: "emily@havenestates.com",
    },
  },
  {
    _id: "4",
    title: "Beachfront Condo",
    price: 3500,
    location: "Miami Beach, FL",
    type: "residential",
    status: "rent",
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    ],
    description:
      "Wake up to ocean views in this beautiful beachfront condo. Features an open layout, modern appliances, and direct beach access. Building amenities include pool, gym, and 24/7 security.",
    features: [
      "Ocean Views",
      "Beach Access",
      "Pool & Gym",
      "Balcony",
      "Secure Parking",
      "Pet Friendly",
    ],
    agent: {
      _id: "agent4",
      name: "Dav_id Martinez",
      number: "+1 (555) 456-7890",
      email: "dav_id@havenestates.com",
    },
  },
  {
    _id: "5",
    title: "Commercial Office Space",
    price: 4200000,
    location: "San Francisco, CA",
    type: "commercial",
    status: "sale",
    area: 12000,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    ],
    description:
      "Prime commercial office space in downtown San Francisco. Modern building with excellent visibility, ample parking, and close proximity to public transportation. _Ideal for tech companies or professional services.",
    features: [
      "Central Location",
      "Elevator Access",
      "Parking Garage",
      "Conference Rooms",
      "High-Speed Internet",
      "24/7 Access",
    ],
    agent: {
      name: "Jennifer Lee",
      _id: "agent5",
      number: "+1 (555) 567-8901",
      email: "jennifer@havenestates.com",
    },
  },
  {
    _id: "6",
    title: "Development Land",
    price: 1200000,
    location: "Scottsdale, AZ",
    type: "land",
    status: "sale",
    area: 50000,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    ],
    description:
      "Prime development land in rap_idly growing Scottsdale. Zoned for res_idential or mixed-use development. Utilities available. Perfect opportunity for developers or investors.",
    features: [
      "Zoned for Development",
      "Utilities Available",
      "Growing Area",
      "Mountain Views",
      "Easy Access",
      "Investment Opportunity",
    ],
    agent: {
      name: "Robert Anderson",
      _id: "agent5",
      number: "+1 (555) 567-8901",
      email: "robert@havenestates.com",
    },
  },
];
