export const PORT_TYPES = [
  "Text",
  "Number",
  "Boolean",
  "List",
  "ElementRef",
  "URL",
  "Object",
] as const;

export type PortType = (typeof PORT_TYPES)[number];

export type BlockCategory =
  | "trigger"
  | "page"
  | "data"
  | "logic"
  | "system";

export interface PortDefinition {
  id: string;
  key: string;
  label: string;
  type: PortType;
  required?: boolean;
  isList?: boolean;
}

export interface BlockDefinition {
  type: string;
  category: BlockCategory;
  title: string;
  description?: string;
  inputs: PortDefinition[];
  outputs: PortDefinition[];
  defaultData?: Record<string, unknown>;
}

const exactCompatibilities: Partial<Record<PortType, PortType[]>> = {
  Text: ["Text", "URL"],
  Number: ["Number"],
  Boolean: ["Boolean"],
  List: ["List"],
  ElementRef: ["ElementRef"],
  URL: ["URL", "Text"],
  Object: ["Object"],
};

export function arePortTypesCompatible(
  sourceType: PortType,
  targetType: PortType,
): boolean {
  if (sourceType === targetType) {
    return true;
  }

  const allowedTargets = exactCompatibilities[sourceType] ?? [];
  return allowedTargets.includes(targetType);
}
