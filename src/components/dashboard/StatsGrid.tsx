import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

interface StatItem {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend: string;
}

interface StatsGridProps {
  stats: StatItem[];
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.title}
            className="border border-[#235C47]/20 bg-[#F9F7F6]"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#235C47]/70">
                {stat.title}
              </CardTitle>
              <Icon className="w-5 h-5 text-[#235C47]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#235C47]">
                {stat.value}
              </div>
              <p className="text-xs text-[#235C47]/70 mt-1">
                <span className="text-[#235C47] font-medium">{stat.trend}</span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
