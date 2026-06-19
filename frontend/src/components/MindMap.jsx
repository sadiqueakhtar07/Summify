import React, { useMemo } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

const MindMap = ({ summary }) => {

  const { nodes, edges } = useMemo(() => {
    if (!summary) return { nodes: [], edges: [] };

    const sentences = summary
      .split(". ")
      .map(s => s.trim())
      .filter(Boolean);

    if (!sentences.length) return { nodes: [], edges: [] };

    const nodes = [];
    const edges = [];

    const rootId = "root";
    nodes.push({
      id: rootId,
      data: { label: sentences[0] },
      position: { x: 400, y: 50 },
      style: {
        background: "#2563eb",
        color: "#ffffff",
        padding: "14px 20px",
        borderRadius: "50px",
        fontSize: "16px",
        fontWeight: "600",
        textAlign: "center",
        minWidth: "250px"
      }
    });

    let leftY = 200;
let rightY = 200;

const verticalGap = 140;   
const horizontalOffset = 320;

for (let i = 1; i < sentences.length; i++) {
  const id = `node-${i}`;
  const isLeft = i % 2 === 0;

  nodes.push({
    id,
    data: { label: sentences[i] },
    position: {
      x: isLeft ? 400 - horizontalOffset : 400 + horizontalOffset,
      y: isLeft ? leftY : rightY
    },
    style: {
      background: "#f1f5f9",
      color: "#1e293b",
      padding: "12px 16px",
      borderRadius: "30px",
      fontSize: "14px",
      fontWeight: "500",
      minWidth: "240px",
      border: "1px solid #e2e8f0"
    }
  });

  edges.push({
    id: `edge-${i}`,
    source: "root",
    target: id,
    type: "smoothstep",
    style: {
      stroke: "#cbd5e1",
      strokeWidth: 2
    }
  });

  if (isLeft) {
    leftY += verticalGap;
  } else {
    rightY += verticalGap;
  }
}

    return { nodes, edges };

  }, [summary]);

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        border: "1px solid #e2e8f0"
      }}
    >
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background color="#f1f5f9" gap={20} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default MindMap;