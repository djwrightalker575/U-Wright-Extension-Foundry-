import {
  WorkflowEdge,
  WorkflowGraph,
  WorkflowNode,
  parseAndValidateWorkflowGraph,
} from "./graphSchema";

function sortObject(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortObject);
  }

  if (value && typeof value === "object") {
    const sortedEntries = Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, child]) => [key, sortObject(child)]);

    return Object.fromEntries(sortedEntries);
  }

  return value;
}

function normalizeNode(node: WorkflowNode): WorkflowNode {
  return {
    ...node,
    data: sortObject(node.data) as Record<string, unknown>,
  };
}

function normalizeEdge(edge: WorkflowEdge): WorkflowEdge {
  return { ...edge };
}

function sortGraph(graph: WorkflowGraph): WorkflowGraph {
  const nodes = [...graph.nodes]
    .map(normalizeNode)
    .sort((a, b) => a.id.localeCompare(b.id));

  const edges = [...graph.edges]
    .map(normalizeEdge)
    .sort((a, b) => a.id.localeCompare(b.id));

  return {
    version: graph.version,
    nodes,
    edges,
  };
}

export function serializeWorkflowGraph(graph: WorkflowGraph): string {
  const normalized = sortGraph(parseAndValidateWorkflowGraph(graph));
  return JSON.stringify(normalized, null, 2);
}

export function deserializeWorkflowGraph(serialized: string): WorkflowGraph {
  const parsed = JSON.parse(serialized);
  return parseAndValidateWorkflowGraph(parsed);
}
