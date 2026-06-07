export interface AssignmentResult {
  isComplete: boolean;
  topic: string;
  artifact: Record<string, unknown>;
}

export const result: AssignmentResult = {
  isComplete: false,
  topic: "Week 3 ERD Design",
  artifact: {},
};
