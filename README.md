# Haven Estates - Premium Real Estate Platform

Haven Estates is a comprehensive real estate platform that connects property buyers, sellers, and agents in a seamless digital experience. Our platform offers advanced property search, booking capabilities, viewing scheduling, and information request features to make real estate transactions effortless.

## Features

### 🏠 Property Discovery

- Browse extensive property listings with detailed information
- Advanced filtering by property type, location, price range, and status
- Featured properties section highlighting premium listings
- Responsive design for seamless experience across devices

### 📋 Property Booking

- Secure online booking system for properties
- Stripe integration for secure payment processing
- Automated booking confirmation workflow
- Booking management dashboard for users

### 👀 Viewing Requests

- Schedule property viewings with ease
- Request property viewing appointments
- Manage upcoming viewing schedules
- Receive notifications for viewing confirmations

### ℹ️ Information Requests

- Request additional information about properties
- Connect with real estate agents directly
- Track information request status
- Receive detailed property documentation

### 👤 User Management

- Comprehensive buyer dashboard
- Admin panel for property management
- Secure authentication system
- Profile management and settings

### 🛠️ Admin Features

- Property management interface
- Booking and viewing request oversight
- User management capabilities
- Analytics and reporting tools

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS with custom components
- **State Management**: Redux Toolkit with RTK Query
- **UI Components**: Custom-built reusable components
- **Authentication**: JWT-based authentication system
- **Payments**: Stripe integration for secure transactions
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Optimized for Vercel deployment

## Getting Started

### Prerequisites

Make sure you have Node.js (v18 or later) and pnpm installed on your system.

### Installation

1. Clone the repository:

```bash
git clone <https://github.com/faysaldev/haven-estate>
cd haven-estate
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_BASE_URL=<your-api-base-url>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
JWT_SECRET=<your-jwt-secret>
MONGODB_URI=<your-mongodb-uri>
NEXTAUTH_URL=<your-app-url>
```

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
haven-estate/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── bookings/          # Booking management
│   ├── admin/             # Admin dashboard
│   ├── buyer/             # Buyer dashboard
│   └── listings/          # Property listings
├── src/
│   ├── components/        # Reusable UI components
│   ├── Page/              # Main page components
│   ├── redux/             # State management
│   ├── utils/             # Utility functions
│   └── hooks/             # Custom React hooks
├── assets/                # Static assets
├── public/                # Public assets
└── lib/                   # Library functions
```

## Key Pages

- **Home** (`/`) - Landing page with featured properties and search
- **Listings** (`/listings`) - Browse all available properties
- **Property Detail** (`/listings/[id]`) - Detailed property information
- **Booking Flow** (`/bookings/*`) - Complete booking process
- **User Dashboard** (`/buyer/*`) - Personal account management
- **Admin Panel** (`/admin/*`) - Administrative controls

## API Integration

The application integrates with a backend API for:

- Property management
- User authentication
- Booking and payment processing
- Viewing request management
- Information requests

## Deployment

This application is optimized for deployment on Vercel:

1. Push your code to a Git repository
2. Import the project in Vercel
3. Configure environment variables
4. Deploy!

## Contributing

We welcome contributions to improve Haven Estates! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please contact our development team or open an issue in the repository.

---

Built with ❤️ by the Faysal Mridha
