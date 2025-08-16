import RevisionGenerator from "@/components/revision/RevisionGenerator";
import { Bot } from "lucide-react";

export default function RevisionPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Bot className="h-8 w-8" />
        <h1 className="text-3xl font-bold font-headline">AI Revision Prompts</h1>
      </div>
      <p className="text-muted-foreground max-w-3xl">
        Our AI-powered tool analyzes your performance and study habits to generate personalized revision prompts. This helps you focus on your weak areas and optimize your study sessions for maximum retention.
      </p>
      <RevisionGenerator />
    </div>
  );
}
