import { Home, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-serif font-semibold text-foreground">
                Haven <span className="text-primary">Estates</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted partner in finding the perfect property. Excellence
              in real estate since 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/listings"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-foreground">
              Property Types
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/listings?type=residential"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Residential
                </Link>
              </li>
              <li>
                <Link
                  href="/listings?type=commercial"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Commercial
                </Link>
              </li>
              <li>
                <Link
                  href="/listings?type=land"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Land
                </Link>
              </li>
              <li>
                <Link
                  href="/listings?type=luxury"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Luxury Estates
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-foreground">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  123 Estate Avenue, Property District, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">info@havenestates.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground text-sm">
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
