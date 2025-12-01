import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

interface AgentFormProps {
  agentName: string;
  agentNumber: string;
  agentEmail: string;
  onNameChange: (value: string) => void;
  onNumberChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onAddAgent: () => void;
  onCancel: () => void;
}

export const AgentForm = ({ agentName, agentNumber, agentEmail, onNameChange, onNumberChange, onEmailChange, onAddAgent, onCancel }: AgentFormProps) => {
  const isFormValid = agentName && agentNumber && agentEmail;
  
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="agentName">Agent Name</Label>
        <Input
          id="agentName"
          value={agentName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter agent name"
          className="bg-[#F9F7F6]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="agentNumber">Phone Number</Label>
        <Input
          id="agentNumber"
          value={agentNumber}
          onChange={(e) => onNumberChange(e.target.value)}
          placeholder="Enter phone number"
          className="bg-[#F9F7F6]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="agentEmail">Email</Label>
        <Input
          id="agentEmail"
          type="email"
          value={agentEmail}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="Enter email address"
          className="bg-[#F9F7F6]"
        />
      </div>
      <div className="flex justify-end space-x-3 pt-2">
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-[#235C47] text-[#235C47]"
        >
          Cancel
        </Button>
        <Button
          onClick={onAddAgent}
          className="bg-[#235C47] hover:bg-[#235C47]/90"
          disabled={!isFormValid}
        >
          Add Agent
        </Button>
      </div>
    </div>
  );
};