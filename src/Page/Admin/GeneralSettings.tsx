"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { PlusCircle } from "lucide-react";

const GeneralSettings = () => {
  // State for privacy policy and terms & conditions
  const [privacyPolicy, setPrivacyPolicy] = useState<string>("");
  const [termsConditions, setTermsConditions] = useState<string>("");

  // State for agent dialog
  const [isAgentDialogOpen, setIsAgentDialogOpen] = useState(false);

  // State for agent form
  const [agentName, setAgentName] = useState("");
  const [agentNumber, setAgentNumber] = useState("");
  const [agentEmail, setAgentEmail] = useState("");

  // State for agents list
  const [agents, setAgents] = useState<
    Array<{ id: number; name: string; number: string; email: string }>
  >([]);

  // Handle saving privacy policy
  const handleSavePrivacyPolicy = () => {
    // Here we would typically make an API call to save the privacy policy
    console.log("Saving Privacy Policy:", privacyPolicy);
    // Show a success message to the user
    alert("Privacy Policy saved successfully!");
  };

  // Handle saving terms & conditions
  const handleSaveTermsConditions = () => {
    // Here we would typically make an API call to save the terms & conditions
    console.log("Saving Terms & Conditions:", termsConditions);
    // Show a success message to the user
    alert("Terms & Conditions saved successfully!");
  };

  // Handle adding new agent
  const handleAddAgent = () => {
    if (!agentName || !agentNumber || !agentEmail) {
      alert("Please fill all fields");
      return;
    }

    // Here we would typically make an API call to add the agent
    console.log("Adding Agent:", {
      name: agentName,
      number: agentNumber,
      email: agentEmail,
    });

    // Add agent to the list
    const newAgent = {
      id: agents.length + 1,
      name: agentName,
      number: agentNumber,
      email: agentEmail,
    };

    setAgents([...agents, newAgent]);

    // Reset form fields and close dialog
    setAgentName("");
    setAgentNumber("");
    setAgentEmail("");
    setIsAgentDialogOpen(false);

    alert("Agent added successfully!");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[#235C47]">
        General Settings
      </h1>

      {/* Privacy Policy Section */}
      <Card className="border border-[#235C47]/20">
        <CardHeader>
          <CardTitle className="text-[#235C47]">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={privacyPolicy}
            onChange={(e) => setPrivacyPolicy(e.target.value)}
            placeholder="Enter privacy policy content here..."
            className="min-h-[200px] bg-[#F9F7F6] border-[#235C47]/20"
          />
          <Button
            onClick={handleSavePrivacyPolicy}
            className="bg-[#235C47] hover:bg-[#235C47]/90"
          >
            Save Privacy Policy
          </Button>
        </CardContent>
      </Card>

      {/* Terms & Conditions Section */}
      <Card className="border border-[#235C47]/20">
        <CardHeader>
          <CardTitle className="text-[#235C47]">Terms & Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={termsConditions}
            onChange={(e) => setTermsConditions(e.target.value)}
            placeholder="Enter terms & conditions content here..."
            className="min-h-[200px] bg-[#F9F7F6] border-[#235C47]/20"
          />
          <Button
            onClick={handleSaveTermsConditions}
            className="bg-[#235C47] hover:bg-[#235C47]/90"
          >
            Save Terms & Conditions
          </Button>
        </CardContent>
      </Card>

      {/* Add Agent Section */}
      <Card className="border border-[#235C47]/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-[#235C47]">
            <span>Agents</span>
            <Dialog
              open={isAgentDialogOpen}
              onOpenChange={setIsAgentDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-[#235C47] hover:bg-[#235C47]/90 flex items-center gap-2">
                  <PlusCircle className="w-4 h-4" />
                  Add Agent
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Agent</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="agentName">Agent Name</Label>
                    <Input
                      id="agentName"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      placeholder="Enter agent name"
                      className="bg-[#F9F7F6]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agentNumber">Phone Number</Label>
                    <Input
                      id="agentNumber"
                      value={agentNumber}
                      onChange={(e) => setAgentNumber(e.target.value)}
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
                      onChange={(e) => setAgentEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="bg-[#F9F7F6]"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsAgentDialogOpen(false)}
                    className="border-[#235C47] text-[#235C47]"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddAgent}
                    className="bg-[#235C47] hover:bg-[#235C47]/90"
                  >
                    Add Agent
                  </Button>
                </div>
              </DialogContent>
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
    </div>
  );
};

export default GeneralSettings;
