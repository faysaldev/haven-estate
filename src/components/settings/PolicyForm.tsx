import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

interface PolicyFormProps {
  title: string;
  content: string;
  placeholder: string;
  onSave: (content: string) => void;
  onChange: (content: string) => void;
}

export const PolicyForm = ({ title, content, placeholder, onSave, onChange }: PolicyFormProps) => {
  return (
    <Card className="border border-[#235C47]/20">
      <CardHeader>
        <CardTitle className="text-[#235C47]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[200px] bg-[#F9F7F6] border-[#235C47]/20"
        />
        <Button
          onClick={() => onSave(content)}
          className="bg-[#235C47] hover:bg-[#235C47]/90"
        >
          Save {title.replace(" &", "")}
        </Button>
      </CardContent>
    </Card>
  );
};