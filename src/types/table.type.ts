export const ACTION_TABLE = {
  DELETE: "DELETE",
  UPDATE: "UPDATE",
} as const;
export type EnumActionTable = (typeof ACTION_TABLE)[keyof typeof ACTION_TABLE];
