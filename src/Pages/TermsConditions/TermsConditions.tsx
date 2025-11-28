import Navbar from "@/src/components/Common/Navbar";
import Footer from "@/src/components/Common/Footer";

const TermsConditions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl font-serif font-bold mb-4 text-foreground animate-fade-in">
                Terms & Conditions
              </h1>
              <p className="text-muted-foreground mb-12 animate-fade-in">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <div className="space-y-8 text-foreground">
                <section className="animate-slide-up">
                  <h2 className="text-2xl font-serif font-bold mb-4">
                    1. Agreement to Terms
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using Haven Estates, you agree to be bound
                    by these Terms and Conditions. If you disagree with any part
                    of these terms, you may not access the service.
                  </p>
                </section>

                <section
                  className="animate-slide-up"
                  style={{ animationDelay: "100ms" }}
                >
                  <h2 className="text-2xl font-serif font-bold mb-4">
                    2. Use of Service
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You agree to use our service only for lawful purposes and in
                    accordance with these Terms. You agree not to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>
                      Use the service in any way that violates applicable laws
                      or regulations
                    </li>
                    <li>
                      Post false, misleading, or fraudulent property listings
                    </li>
                    <li>
                      Impersonate or attempt to impersonate another user or
                      entity
                    </li>
                    <li>
                      Engage in any conduct that restricts or inhibits anyone
                      {`'`}s use of the service
                    </li>
                    <li>
                      Use automated systems to access the service without
                      permission
                    </li>
                  </ul>
                </section>

                <section
                  className="animate-slide-up"
                  style={{ animationDelay: "200ms" }}
                >
                  <h2 className="text-2xl font-serif font-bold mb-4">
                    3. User Accounts
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    When you create an account, you must provide accurate and
                    complete information. You are responsible for maintaining
                    the confidentiality of your account credentials and for all
                    activities that occur under your account. You agree to
                    notify us immediately of any unauthorized access to your
                    account.
                  </p>
                </section>

                <section
                  className="animate-slide-up"
                  style={{ animationDelay: "300ms" }}
                >
                  <h2 className="text-2xl font-serif font-bold mb-4">
                    4. Property Listings
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you list a property on our platform:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>
                      You warrant that you have the right to list the property
                    </li>
                    <li>
                      All information provided must be accurate and up-to-date
                    </li>
                    <li>
                      You retain ownership of your content but grant us a
                      license to display it
                    </li>
                    <li>
                      We reserve the right to remove listings that violate our
                      policies
                    </li>
                    <li>
                      You are responsible for all transactions between you and
                      potential buyers/renters
                    </li>
                  </ul>
                </section>

                <section
                  className="animate-slide-up"
                  style={{ animationDelay: "400ms" }}
                >
                  <h2 className="text-2xl font-serif font-bold mb-4">
                    5. Intellectual Property
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The service and its original content, features, and
                    functionality are owned by Haven Estates and are protected
                    by international copyright, trademark, and other
                    intellectual property laws. You may not copy, modify,
                    distribute, or reverse engineer any part of our service
                    without permission.
                  </p>
                </section>

                <section
                  className="animate-slide-up"
                  style={{ animationDelay: "500ms" }}
                >
                  <h2 className="text-2xl font-serif font-bold mb-4">
                    6. Disclaimer of Warranties
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The service is provided {`"`}as is{`"`} and {`"`}as
                    available{`"`} without warranties of any kind. We do not
                    warrant that the service will be uninterrupted, secure, or
                    error-free. We do not guarantee the accuracy or reliability
                    of any property listings or information provided by users.
                  </p>
                </section>

                <section
                  className="animate-slide-up"
                  style={{ animationDelay: "600ms" }}
                >
                  <h2 className="text-2xl font-serif font-bold mb-4">
                    7. Limitation of Liability
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Haven Estates shall not be liable for any indirect,
                    incidental, special, consequential, or punitive damages
                    resulting from your use of or inability to use the service.
                    We are not responsible for any transactions between users or
                    for the quality, safety, or legality of properties listed.
                  </p>
                </section>

                <section
                  className="animate-slide-up"
                  style={{ animationDelay: "700ms" }}
                >
                  <h2 className="text-2xl font-serif font-bold mb-4">
                    8. Termination
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may terminate or suspend your account and access to the
                    service immediately, without prior notice, for any reason,
                    including if you breach these Terms. Upon termination, your
                    right to use the service will immediately cease.
                  </p>
                </section>

                <section
                  className="animate-slide-up"
                  style={{ animationDelay: "800ms" }}
                >
                  <h2 className="text-2xl font-serif font-bold mb-4">
                    9. Changes to Terms
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify these Terms at any time. We
                    will notify users of any material changes. Your continued
                    use of the service after changes constitutes acceptance of
                    the new Terms.
                  </p>
                </section>

                <section
                  className="animate-slide-up"
                  style={{ animationDelay: "900ms" }}
                >
                  <h2 className="text-2xl font-serif font-bold mb-4">
                    10. Governing Law
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms shall be governed by and construed in accordance
                    with the laws of the jurisdiction in which Haven Estates
                    operates, without regard to its conflict of law provisions.
                  </p>
                </section>

                <section
                  className="animate-slide-up"
                  style={{ animationDelay: "1000ms" }}
                >
                  <h2 className="text-2xl font-serif font-bold mb-4">
                    11. Contact Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about these Terms, please contact
                    us at:
                  </p>
                  <p className="text-muted-foreground mt-4">
                    Email: legal@havenestates.com
                    <br />
                    Phone: +1 (555) 123-4567
                    <br />
                    Address: 123 Real Estate Ave, Downtown City, ST 12345
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsConditions;
