import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { Property } from "./types";
import { ScheduleViewingDialog } from "./dialogs/ScheduleViewingDialog";
import { RequestInfoDialog } from "./dialogs/RequestInfoDialog";
import { BookPropertyDialog } from "./dialogs/BookPropertyDialog";
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { showLoginToast } from "@/src/redux/features/auth/authSlice";

interface PropertyAgentCardProps {
  property: Property;
}

export const PropertyAgentCard = ({ property }: PropertyAgentCardProps) => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleScheduleViewing = () => {
    if (!user) {
      dispatch(showLoginToast("schedule a viewing"));
    }
  };

  const handleRequestInfo = () => {
    if (!user) {
      dispatch(showLoginToast("request information"));
    }
  };

  const handleBookProperty = () => {
    if (!user) {
      dispatch(showLoginToast("book this property"));
    }
  };

  return (
    <Card className="card-shadow sticky top-32 border-[#235C47]/20">
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="text-xl font-serif font-semibold mb-2 text-[#235C47]">
            Contact Agent
          </h3>
          <p className="text-[#235C47]/80">
            Get in touch with our expert agent
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="font-semibold text-lg text-[#235C47]">
              {property.agent.name}
            </p>
            <div className="flex items-center gap-2 text-[#235C47]/70">
              <Phone className="w-4 h-4 text-[#235C47]" />
              <a
                href={`tel:${property.agent.phone}`}
                className="hover:text-[#235C47] transition-smooth"
              >
                {property.agent.phone}
              </a>
            </div>
            <div className="flex items-center gap-2 text-[#235C47]/70">
              <Mail className="w-4 h-4 text-[#235C47]" />
              <a
                href={`mailto:${property.agent.email}`}
                className="hover:text-[#235C47] transition-smooth"
              >
                {property.agent.email}
              </a>
            </div>
          </div>

          <ScheduleViewingDialog
            property={property}
            trigger={
              <Button
                className="w-full bg-[#235C47] hover:bg-[#235C47]/90 text-white"
                size="lg"
                onClick={handleScheduleViewing}
              >
                Schedule Viewing
              </Button>
            }
          />

          <RequestInfoDialog
            property={property}
            trigger={
              <Button
                variant="outline"
                className="w-full border-[#235C47] text-[#235C47] hover:bg-[#F9F7F6] hover:text-[#235C47]"
                size="lg"
                onClick={handleRequestInfo}
              >
                Request Info
              </Button>
            }
          />

          <BookPropertyDialog
            property={property}
            trigger={
              <Button
                className="w-full bg-[#235C47] hover:bg-[#235C47]/90 text-white"
                size="lg"
                onClick={handleBookProperty}
              >
                Book Property
              </Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};