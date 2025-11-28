import Navbar from "@/src/components/Common/Navbar";
import Footer from "@/src/components/Common/Footer";
import { Building2, Users, Award, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-5xl sm:text-6xl font-serif font-bold mb-6">
                About Haven Estates
              </h1>
              <p className="text-xl text-white/90">
                Your trusted partner in finding the perfect property since 2010
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-serif font-bold mb-6 text-center text-foreground">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-center mb-12">
                At Haven Estates, we{`'`}re committed to making real estate
                simple, transparent, and accessible for everyone. We believe
                that finding your dream property should be an exciting journey,
                not a stressful process.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                {[
                  {
                    icon: Building2,
                    title: "500+ Properties",
                    description: "Carefully curated listings",
                  },
                  {
                    icon: Users,
                    title: "1,200+ Clients",
                    description: "Satisfied homeowners",
                  },
                  {
                    icon: Award,
                    title: "50+ Agents",
                    description: "Expert professionals",
                  },
                  {
                    icon: TrendingUp,
                    title: "$2.5B+ Value",
                    description: "Properties managed",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-6 rounded-lg bg-card hover:shadow-lg transition-smooth animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-serif font-bold mb-2 text-foreground">
                      {stat.title}
                    </h3>
                    <p className="text-muted-foreground">{stat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-serif font-bold mb-12 text-center text-foreground">
                Our Values
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Integrity",
                    description:
                      "We believe in honest, transparent dealings with every client and partner.",
                  },
                  {
                    title: "Excellence",
                    description:
                      "We strive for excellence in every property we list and every service we provide.",
                  },
                  {
                    title: "Innovation",
                    description:
                      "We embrace technology to make property search and management easier than ever.",
                  },
                ].map((value, index) => (
                  <div
                    key={index}
                    className="bg-card p-8 rounded-lg shadow-sm hover:shadow-md transition-smooth animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <h3 className="text-2xl font-serif font-bold mb-4 text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-serif font-bold mb-6 text-foreground">
                Our Leadership Team
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                Meet the experts dedicated to helping you find your perfect
                property
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
