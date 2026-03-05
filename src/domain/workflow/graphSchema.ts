import { z } from "zod";
import { getBlockDefinition } from "./blockDefinitions";
import { PORT_TYPES, arePortTypesCompatible } from "./types";

export const WorkflowPortTypeSchema = z.enum(PORT_TYPES);

export const WorkflowNodeSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  position: z.object({ x: z.number(), y: z.number() }),
  data: z.record(z.string(), z.unknown()).default({}),
});

export const WorkflowEdgeSchema = z.object({
  id: z.string().min(1),
  source: z.string().min(1),
  sourceHandle: z.string().min(1),
  target: z.string().min(1),
  targetHandle: z.string().min(1),
});

export const WorkflowGraphSchema = z.object({
  version: z.literal(1),
  nodes: z.array(WorkflowNodeSchema),
  edges: z.array(WorkflowEdgeSchema),
});

export type WorkflowNode = z.infer<typeof WorkflowNodeSchema>;
export type WorkflowEdge = z.infer<typeof WorkflowEdgeSchema>;
export type WorkflowGraph = z.infer<typeof WorkflowGraphSchema>;

function findPortType(
  node: WorkflowNode | undefined,
  handleId: string,
  side: "inputs" | "outputs",
) {
  if (!node) {
    return null;
  }

  const definition = getBlockDefinition(node.type);
  if (!definition) {
    return null;
  }

  const port = definition[side].find((entry) => entry.id === handleId);
  return port?.type ?? null;
}

export function validateWorkflowGraph(graph: WorkflowGraph): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const nodeMap = new Map(graph.nodes.map((node) => [node.id, node]));

  for (const node of graph.nodes) {
    if (!getBlockDefinition(node.type)) {
      errors.push(`Node '${node.id}' references unknown block type '${node.type}'.`);
    }
  }

  for (const edge of graph.edges) {
    const sourceNode = nodeMap.get(edge.source);
    const targetNode = nodeMap.get(edge.target);

    if (!sourceNode) {
      errors.push(`Edge '${edge.id}' has missing source node '${edge.source}'.`);
      continue;
    }

    if (!targetNode) {
      errors.push(`Edge '${edge.id}' has missing target node '${edge.target}'.`);
      continue;
    }

    const sourceType = findPortType(sourceNode, edge.sourceHandle, "outputs");
    const targetType = findPortType(targetNode, edge.targetHandle, "inputs");

    if (!sourceType) {
      errors.push(
        `Edge '${edge.id}' uses unknown source handle '${edge.sourceHandle}' on node '${sourceNode.id}'.`,
      );
      continue;
    }

    if (!targetType) {
      errors.push(
        `Edge '${edge.id}' uses unknown target handle '${edge.targetHandle}' on node '${targetNode.id}'.`,
      );
      continue;
    }

    if (!arePortTypesCompatible(sourceType, targetType)) {
      errors.push(
        `Edge '${edge.id}' has incompatible types (${sourceType} -> ${targetType}).`,
      );
    }
  }

  return { valid: errors.length === 0, errors };
}

export function parseAndValidateWorkflowGraph(input: unknown): WorkflowGraph {
  const parsed = WorkflowGraphSchema.parse(input);
  const validated = validateWorkflowGraph(parsed);

  if (!validated.valid) {
    throw new Error(validated.errors.join("\n"));
  }

  return parsed;
}
