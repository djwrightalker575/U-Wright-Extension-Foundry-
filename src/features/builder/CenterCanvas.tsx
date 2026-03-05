import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  EdgeChange,
  NodeChange,
} from "reactflow";
import { getBlockDefinition, arePortTypesCompatible } from "../../domain/workflow";
import { BuilderEdge, BuilderNode } from "./types";

type CenterCanvasProps = {
  nodes: BuilderNode[];
  edges: BuilderEdge[];
  onNodesChange: (nodes: BuilderNode[]) => void;
  onEdgesChange: (edges: BuilderEdge[]) => void;
  onSelectNode: (nodeId: string | null) => void;
};

function validateConnection(
  connection: Connection,
  nodes: BuilderNode[],
): boolean {
  if (!connection.source || !connection.target || !connection.sourceHandle || !connection.targetHandle) {
    return false;
  }

  const sourceNode = nodes.find((node) => node.id === connection.source);
  const targetNode = nodes.find((node) => node.id === connection.target);

  if (!sourceNode || !targetNode) {
    return false;
  }

  const sourceDefinition = getBlockDefinition(sourceNode.data.blockType);
  const targetDefinition = getBlockDefinition(targetNode.data.blockType);

  if (!sourceDefinition || !targetDefinition) {
    return false;
  }

  const sourcePort = sourceDefinition.outputs.find((port) => port.id === connection.sourceHandle);
  const targetPort = targetDefinition.inputs.find((port) => port.id === connection.targetHandle);

  if (!sourcePort || !targetPort) {
    return false;
  }

  return arePortTypesCompatible(sourcePort.type, targetPort.type);
}

export function CenterCanvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onSelectNode,
}: CenterCanvasProps) {
  const handleNodesChange = (changes: NodeChange[]) => {
    onNodesChange(applyNodeChanges(changes, nodes));
  };

  const handleEdgesChange = (changes: EdgeChange[]) => {
    onEdgesChange(applyEdgeChanges(changes, edges));
  };

  const handleConnect = (connection: Connection) => {
    if (!validateConnection(connection, nodes)) {
      return;
    }

    onEdgesChange(addEdge(connection, edges));
  };

  return (
    <div style={{ flex: 1 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        onNodeClick={(_, node) => onSelectNode(node.id)}
        onPaneClick={() => onSelectNode(null)}
        fitView
      />
    </div>
  );
}
