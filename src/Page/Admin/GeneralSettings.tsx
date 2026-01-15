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
import {
  useCreateAgentsMutation,
  useGetAgentsQuery,
  useGetPrivacyPolicyQuery,
  useGetTermsConditionsQuery,
  useUpdatePrivacyPolicyMutation,
  useUpdateTermsConditionsMutation,
} from "@/src/redux/features/Admin/Generals/generalApi";
import { Agents } from "@/src/types/admin.type";
import { toast } from "sonner";

const GeneralSettings = () => {
  /* =====================
     API Hooks
  ===================== */
  const { data: allAgents } = useGetAgentsQuery({});
  const { data: privacyPolicyData } = useGetPrivacyPolicyQuery({});
  const { data: termsConditionsData } = useGetTermsConditionsQuery({});

  const [createAgents] = useCreateAgentsMutation();
  const [updatePrivacyPolicy] = useUpdatePrivacyPolicyMutation();
  const [updateTermsConditions] = useUpdateTermsConditionsMutation();

  /* =====================
     Local State
  ===================== */
  const [privacyPolicy, setPrivacyPolicy] = useState(
    privacyPolicyData?.privacy ?? ""
  );
  const [termsConditions, setTermsConditions] = useState(
    termsConditionsData?.terms ?? ""
  );

  const [isAgentDialogOpen, setIsAgentDialogOpen] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [agentNumber, setAgentNumber] = useState("");
  const [agentEmail, setAgentEmail] = useState("");

  /* =====================
     Derived Data
  ===================== */
  const agents =
    allAgents?.map((agent: Agents) => ({
      id: agent._id,
      name: agent.name,
      number: agent.number,
      email: agent.email,
    })) ?? [];

  /* =====================
     Handlers
  ===================== */

  const handleSavePrivacyPolicy = async () => {
    if (!privacyPolicy.trim()) {
      toast.error("Please enter privacy policy content");
      return;
    }

    try {
      await updatePrivacyPolicy({ privacy: privacyPolicy }).unwrap();
      toast.success("Privacy Policy updated successfully");
    } catch {
      toast.error("Failed to update privacy policy");
    }
  };

  const handleSaveTermsConditions = async () => {
    if (!termsConditions.trim()) {
      toast.error("Please enter terms & conditions content");
      return;
    }

    try {
      await updateTermsConditions({ terms: termsConditions }).unwrap();
      toast.success("Terms & Conditions updated successfully");
    } catch {
      toast.error("Failed to update terms & conditions");
    }
  };

  const handleAddAgent = async () => {
    if (!agentName || !agentNumber || !agentEmail) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await createAgents({
        name: agentName,
        number: agentNumber,
        email: agentEmail,
      }).unwrap();

      toast.success("Agent added successfully");
      handleCancel();
    } catch {
      toast.error("Failed to add agent");
    }
  };

  const handleCancel = () => {
    setAgentName("");
    setAgentNumber("");
    setAgentEmail("");
    setIsAgentDialogOpen(false);
  };

  /* =====================
     Dialog UI
  ===================== */

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

  /* =====================
     Render
  ===================== */

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-serif font-bold text-[#235C47]">
        General Settings
      </h1>

      <PolicyForm
        title="Privacy Policy"
        content={privacyPolicy}
        placeholder="Enter privacy policy content here..."
        onSave={handleSavePrivacyPolicy}
        onChange={setPrivacyPolicy}
      />

      <PolicyForm
        title="Terms & Conditions"
        content={termsConditions}
        placeholder="Enter terms & conditions content here..."
        onSave={handleSaveTermsConditions}
        onChange={setTermsConditions}
      />

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
