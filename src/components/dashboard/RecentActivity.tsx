import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Calendar, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  type: string;
  title: string;
  time: string;
}

interface RecentActivityProps {
  activity: ActivityItem[];
}

export const RecentActivity = ({ activity }: RecentActivityProps) => {
  return (
    <Card className="border border-[#235C47]/20 bg-[#F9F7F6]">
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-[#235C47]">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activity.length > 0 ? (
            activity.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 border-b border-[#235C47]/20 pb-4 last:border-0 last:pb-0"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    item.type === "Viewing"
                      ? "bg-[#235C47]/10"
                      : "bg-[#235C47]/10"
                  )}
                >
                  {item.type === "Viewing" ? (
                    <Calendar className="w-5 h-5 text-[#235C47]" />
                  ) : (
                    <MessageSquare className="w-5 h-5 text-[#235C47]" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#235C47]">{item.title}</p>
                  <p className="text-sm text-[#235C47]/70">{item.time}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[#235C47]/70 text-center py-4">No recent activity</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};