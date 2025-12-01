"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { PlusCircle } from "lucide-react";
import { PolicyForm } from "@/src/components/settings/PolicyForm";
import { AgentList } from "@/src/components/settings/AgentList";
import { AgentForm } from "@/src/components/settings/AgentForm";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

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

  const handleCancel = () => {
    setAgentName("");
    setAgentNumber("");
    setAgentEmail("");
    setIsAgentDialogOpen(false);
  };

  // Prepare the agent dialog content
  const agentDialogTrigger = (
    <Button className="bg-[#235C47] hover:bg-[#235C47]/90 flex items-center gap-2">
      <PlusCircle className="w-4 h-4" />
      Add Agent
    </Button>
  );

  const agentDialogContent = (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Agent</DialogTitle>
      </DialogHeader>
      <AgentForm
        agentName={agentName}
        agentNumber={agentNumber}
        agentEmail={agentEmail}
        onNameChange={setAgentName}
        onNumberChange={setAgentNumber}
        onEmailChange={setAgentEmail}
        onAddAgent={handleAddAgent}
        onCancel={handleCancel}
      />
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-serif font-bold text-[#235C47] mb-2">
        General Settings
      </h1>

      {/* Privacy Policy Section */}
      <PolicyForm
        title="Privacy Policy"
        content={privacyPolicy}
        placeholder="Enter privacy policy content here..."
        onSave={handleSavePrivacyPolicy}
        onChange={setPrivacyPolicy}
      />

      {/* Terms & Conditions Section */}
      <PolicyForm
        title="Terms & Conditions"
        content={termsConditions}
        placeholder="Enter terms & conditions content here..."
        onSave={handleSaveTermsConditions}
        onChange={setTermsConditions}
      />

      {/* Agent List Section */}
      <AgentList
        agents={agents}
        onAddAgent={() => setIsAgentDialogOpen(true)}
        dialogTrigger={agentDialogTrigger}
        dialogContent={agentDialogContent}
      />
    </div>
  );
};

export default GeneralSettings;
