"use client";
import Navbar from "@/src/components/Common/Navbar";
import Footer from "@/src/components/Common/Footer";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSendingContactPageInfoMutation } from "@/src/redux/features/Buyer/buyers";

const Contact = () => {
  const [sendContactInfo, { isLoading }] = useSendingContactPageInfoMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the mutation with form data
      const result = await sendContactInfo(formData);

      if ("data" in result) {
        toast.success("Message sent! We'll get back to you soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending contact info:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-[#235C47] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-5xl sm:text-6xl font-serif font-bold mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-white/90">
                Have questions? We{`'`}re here to help you find your dream
                property
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-20 bg-[#FFFFFF]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Information */}
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="text-3xl font-serif font-bold mb-6 text-[#235C47]">
                    Contact Information
                  </h2>
                  <p className="text-[#235C47]/80 leading-relaxed mb-8">
                    Reach out to us through any of these channels. Our team is
                    ready to assist you.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      title: "Office Address",
                      content: "123 Real Estate Ave, Downtown City, ST 12345",
                    },
                    {
                      icon: Phone,
                      title: "Phone Number",
                      content: "+1 (555) 123-4567",
                    },
                    {
                      icon: Mail,
                      title: "Email Address",
                      content: "info@havenestates.com",
                    },
                    {
                      icon: Clock,
                      title: "Business Hours",
                      content: "Mon - Fri: 9:00 AM - 6:00 PM",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg bg-[#F9F7F6] hover:shadow-md transition-smooth"
                    >
                      <item.icon className="w-6 h-6 text-[#235C47] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-[#235C47] mb-1">
                          {item.title}
                        </h3>
                        <p className="text-[#235C47]/80">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-[#F9F7F6] p-8 rounded-lg shadow-lg animate-slide-up">
                <h2 className="text-3xl font-serif font-bold mb-6 text-[#235C47]">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-[#235C47]">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="mt-2 border-[#235C47]/30 focus:border-[#235C47] focus:ring-[#235C47]/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-[#235C47]">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="mt-2 border-[#235C47]/30 focus:border-[#235C47] focus:ring-[#235C47]/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-[#235C47]">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="mt-2 border-[#235C47]/30 focus:border-[#235C47] focus:ring-[#235C47]/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-[#235C47]">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your property requirements..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      className="mt-2 min-h-[120px] border-[#235C47]/30 focus:border-[#235C47] focus:ring-[#235C47]/20"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#235C47] hover:bg-[#1a4a38]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
