import Footer from "@/src/components/Common/Footer";
import Navbar from "@/src/components/Common/Navbar";
import PrivacyPolicy from "@/src/Page/PrivacyPolicy/PrivacyPolicy";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PrivacyPolicy />
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
