import { BlockDefinition } from "./types";

export const BLOCK_DEFINITIONS: BlockDefinition[] = [
  {
    type: "trigger.onClick",
    category: "trigger",
    title: "On Click",
    description: "Starts a workflow when an element is clicked.",
    inputs: [],
    outputs: [
      { id: "out-element", key: "element", label: "Element", type: "ElementRef" },
      { id: "out-url", key: "url", label: "URL", type: "URL" },
    ],
  },
  {
    type: "page.getElement",
    category: "page",
    title: "Get Element",
    description: "Finds an element by selector.",
    inputs: [
      { id: "in-selector", key: "selector", label: "Selector", type: "Text", required: true },
    ],
    outputs: [
      { id: "out-element", key: "element", label: "Element", type: "ElementRef" },
    ],
    defaultData: { selector: "" },
  },
  {
    type: "data.setVariable",
    category: "data",
    title: "Set Variable",
    description: "Writes a typed value to a named variable.",
    inputs: [
      { id: "in-name", key: "name", label: "Name", type: "Text", required: true },
      { id: "in-value", key: "value", label: "Value", type: "Object", required: true },
    ],
    outputs: [
      { id: "out-value", key: "value", label: "Value", type: "Object" },
    ],
    defaultData: { name: "", value: null },
  },
  {
    type: "logic.if",
    category: "logic",
    title: "If",
    description: "Routes execution based on a boolean condition.",
    inputs: [
      { id: "in-condition", key: "condition", label: "Condition", type: "Boolean", required: true },
    ],
    outputs: [
      { id: "out-true", key: "true", label: "True", type: "Boolean" },
      { id: "out-false", key: "false", label: "False", type: "Boolean" },
    ],
    defaultData: { condition: false },
  },
  {
    type: "system.log",
    category: "system",
    title: "Log",
    description: "Logs a text message.",
    inputs: [
      { id: "in-message", key: "message", label: "Message", type: "Text", required: true },
    ],
    outputs: [],
    defaultData: { message: "" },
  },
];

export const BLOCK_DEFINITION_MAP = new Map(
  BLOCK_DEFINITIONS.map((definition) => [definition.type, definition]),
);

export function getBlockDefinition(blockType: string) {
  return BLOCK_DEFINITION_MAP.get(blockType);
}
