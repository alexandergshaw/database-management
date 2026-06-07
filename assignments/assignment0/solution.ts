export interface AssignmentResult {
  isComplete: boolean;
  topic: string;
  artifact: Record<string, unknown>;
}

export const result: AssignmentResult = {
  isComplete: true,
  topic: "Week 1 Onboarding Setup",
  artifact: {"onboarding": "verified"},
};
