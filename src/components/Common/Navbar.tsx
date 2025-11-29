"use client";
import { Button } from "@/src/components/ui/button";
import { Home, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-sm border-b border-[#F9F7F6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#235C47] rounded-lg flex items-center justify-center transition-smooth group-hover:scale-110">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-serif font-semibold text-[#235C47]">
              Haven <span className="text-[#235C47]">Estates</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-[#235C47] hover:text-[#1a4a38] transition-smooth font-medium"
            >
              Home
            </Link>
            <Link
              href="/listings"
              className="text-[#235C47] hover:text-[#1a4a38] transition-smooth font-medium"
            >
              Properties
            </Link>
            <Link
              href="/about"
              className="text-[#235C47] hover:text-[#1a4a38] transition-smooth font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-[#235C47] hover:text-[#1a4a38] transition-smooth font-medium"
            >
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="outline"
              asChild
              className="px-8 bg-[#235C47] hover:bg-[#1a4a38] text-white hover:text-white"
            >
              <Link href="/listings">Browse Properties</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#235C47] hover:text-[#1a4a38] transition-smooth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-[#F9F7F6] animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-[#235C47] hover:text-[#1a4a38] transition-smooth font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/listings"
                className="text-[#235C47] hover:text-[#1a4a38] transition-smooth font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link
                href="/about"
                className="text-[#235C47] hover:text-[#1a4a38] transition-smooth font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-[#235C47] hover:text-[#1a4a38] transition-smooth font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button
                asChild
                className="mt-4 bg-[#235C47] hover:bg-[#1a4a38] text-white"
              >
                <Link href="/listings" onClick={() => setIsMenuOpen(false)}>
                  Browse Properties
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
