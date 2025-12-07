"use client";

import { useState, useEffect } from "react";
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
import {
  useCreateAgentsMutation,
  useGetAgentsQuery,
  useGetPrivacyPolicyQuery,
  useGetTermsConditionsQuery,
  useUpdatePrivacyPolicyMutation,
  useUpdateTermsConditionsMutation,
} from "@/src/redux/features/Admin/Generals/generalApi";
import { Agents } from "@/src/types/admin.type";

const GeneralSettings = () => {
  const [createAgents] = useCreateAgentsMutation();
  const [updatePrivacyPolicy] = useUpdatePrivacyPolicyMutation();
  const [updateTermsConditions] = useUpdateTermsConditionsMutation();
  const { data: allAgents } = useGetAgentsQuery({});
  console.log(allAgents);
  const { data: allTermsConditions } = useGetTermsConditionsQuery({});
  const { data: allPrivacyPolicy } = useGetPrivacyPolicyQuery({});
  console.log(allPrivacyPolicy);
  console.log(allTermsConditions);

  // State for privacy policy and terms & conditions
  const [privacyPolicy, setPrivacyPolicy] = useState<string>(
    allPrivacyPolicy?.privacy || ""
  );
  const [termsConditions, setTermsConditions] = useState<string>(
    allTermsConditions?.terms || ""
  );

  // State for agent dialog
  const [isAgentDialogOpen, setIsAgentDialogOpen] = useState(false);

  // State for agent form
  const [agentName, setAgentName] = useState("");
  const [agentNumber, setAgentNumber] = useState("");
  const [agentEmail, setAgentEmail] = useState("");

  // Format agents data for the AgentList component
  const agents =
    allAgents?.map((agent: Agents) => ({
      id: agent._id,
      name: agent.name,
      number: agent.number,
      email: agent.email,
    })) || [];

  // Update local state when API data changes
  useEffect(() => {
    if (allPrivacyPolicy) {
      setPrivacyPolicy(allPrivacyPolicy);
    }
  }, [allPrivacyPolicy]);

  useEffect(() => {
    if (allTermsConditions) {
      setTermsConditions(allTermsConditions);
    }
  }, [allTermsConditions]);

  // Handle saving privacy policy
  const handleSavePrivacyPolicy = async () => {
    if (!privacyPolicy.trim()) {
      alert("Please enter privacy policy content");
      return;
    }

    try {
      await updatePrivacyPolicy({ privacy: privacyPolicy }).unwrap();
      alert("Privacy Policy updated successfully!");
    } catch (error) {
      console.error("Error updating privacy policy:", error);
      alert("Failed to update privacy policy");
    }
  };

  // Handle saving terms & conditions
  const handleSaveTermsConditions = async () => {
    if (!termsConditions.trim()) {
      alert("Please enter terms & conditions content");
      return;
    }

    try {
      await updateTermsConditions({ terms: termsConditions }).unwrap();
      alert("Terms & Conditions updated successfully!");
    } catch (error) {
      console.error("Error updating terms & conditions:", error);
      alert("Failed to update terms & conditions");
    }
  };

  // Handle adding new agent
  const handleAddAgent = async () => {
    if (!agentName || !agentNumber || !agentEmail) {
      alert("Please fill all fields");
      return;
    }

    try {
      const agentData = {
        name: agentName,
        number: agentNumber,
        email: agentEmail,
      };

      await createAgents(agentData).unwrap();
      alert("Agent added successfully!");

      // Reset form fields and close dialog
      setAgentName("");
      setAgentNumber("");
      setAgentEmail("");
      setIsAgentDialogOpen(false);
    } catch (error) {
      console.error("Error adding agent:", error);
      alert("Failed to add agent");
    }
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
