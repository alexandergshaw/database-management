export interface AssignmentResult {
  isComplete: boolean;
  topic: string;
  artifact: Record<string, unknown>;
}

export const result: AssignmentResult = {
  isComplete: false,
  topic: "Extension C Backup Recovery",
  artifact: {},
};
