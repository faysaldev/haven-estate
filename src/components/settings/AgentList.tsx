import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Dialog, DialogTrigger } from "@/src/components/ui/dialog";
interface Agent {
  id: number;
  name: string;
  number: string;
  email: string;
}

interface AgentListProps {
  agents: Agent[];
  onAddAgent: () => void;
  dialogTrigger: React.ReactNode;
  dialogContent: React.ReactNode;
}

export const AgentList = ({
  agents,
  onAddAgent,
  dialogTrigger,
  dialogContent,
}: AgentListProps) => {
  return (
    <Card className="border border-[#235C47]/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-[#235C47]">
          <span>Agents</span>
          <Dialog>
            <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
            {dialogContent}
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {agents.length > 0 ? (
          <div className="space-y-4">
            <h3 className="font-medium text-[#235C47]">Current Agents:</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex justify-between items-center p-3 bg-[#F9F7F6] rounded-md border border-[#235C47]/20"
                >
                  <div>
                    <p className="font-medium text-[#235C47]">{agent.name}</p>
                    <p className="text-sm text-[#235C47]/70">
                      {agent.email} | {agent.number}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-[#235C47]/70">
            No agents added yet. Click {`"`}Add Agent{`"`} to get started.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
