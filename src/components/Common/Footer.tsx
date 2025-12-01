import { Home, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#FFFFFF] border-t border-[#F9F7F6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#235C47] rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-serif font-semibold text-[#235C47]">
                Haven <span className="text-[#235C47]">Estates</span>
              </span>
            </Link>
            <p className="text-[#235C47]/80 text-sm leading-relaxed">
              Your trusted partner in finding the perfect property. Excellence
              in real estate since 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-[#235C47]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-[#235C47]/80 hover:text-[#235C47] transition-smooth"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/listings"
                  className="text-[#235C47]/80 hover:text-[#235C47] transition-smooth"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#235C47]/80 hover:text-[#235C47] transition-smooth"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#235C47]/80 hover:text-[#235C47] transition-smooth"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-[#235C47]/80 hover:text-[#235C47] transition-smooth"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="text-[#235C47]/80 hover:text-[#235C47] transition-smooth"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-[#235C47]">
              Property Types
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/listings?type=residential"
                  className="text-[#235C47]/80 hover:text-[#235C47] transition-smooth"
                >
                  Residential
                </Link>
              </li>
              <li>
                <Link
                  href="/listings?type=commercial"
                  className="text-[#235C47]/80 hover:text-[#235C47] transition-smooth"
                >
                  Commercial
                </Link>
              </li>
              <li>
                <Link
                  href="/listings?type=land"
                  className="text-[#235C47]/80 hover:text-[#235C47] transition-smooth"
                >
                  Land
                </Link>
              </li>
              <li>
                <Link
                  href="/listings?type=luxury"
                  className="text-[#235C47]/80 hover:text-[#235C47] transition-smooth"
                >
                  Luxury Estates
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-[#235C47]">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-[#235C47]/80">
                <MapPin className="w-5 h-5 text-[#235C47] mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  123 Estate Avenue, Property District, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-2 text-[#235C47]/80">
                <Phone className="w-5 h-5 text-[#235C47] flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-[#235C47]/80">
                <Mail className="w-5 h-5 text-[#235C47] flex-shrink-0" />
                <span className="text-sm">info@havenestates.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#F9F7F6] mt-12 pt-8 text-center text-[#235C47]/80 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Haven Estates. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
