"use client";

import { useState } from "react";
import { Printer } from "./Printer";

interface SnapshotPickerProps {
  snapshotTypes: string[];
  customNodesData: Record<string, any>;
  modelsData: Record<string, any[]>; // Changed to array
}

export default function SnapshotPicker({
  snapshotTypes,
  customNodesData,
  modelsData,
}: SnapshotPickerProps) {
  console.log("modelsData", modelsData);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["essential"]);
  const [jsonOutput, setJsonOutput] = useState<string>("");
  const [models, setModels] = useState<any[]>([]);

  const handleCheckboxChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };
  const generateJson = () => {
    if (selectedTypes.length === 0) {
      setJsonOutput("No types selected");
      return;
    }

    const result: Record<string, any> = {
      comfyui: customNodesData.essential.comfyui,
      file_custom_nodes: customNodesData.essential.file_custom_nodes,
      git_custom_nodes: {},
    };

    let models = [];

    selectedTypes.forEach((type) => {
      if (customNodesData[type] && customNodesData[type].git_custom_nodes) {
        result.git_custom_nodes = {
          ...result.git_custom_nodes,
          ...customNodesData[type].git_custom_nodes,
        };
      }
      if (modelsData[type]) {
        models = [...models, ...modelsData[type]];
      }
    });

    setJsonOutput(JSON.stringify(result, null, 2));
    setModels(models);
  };

  return (
    <div>
      {snapshotTypes.map((type) => (
        <div key={type} className="flex gap-2 items-center">
          <input
            type="checkbox"
            id={type}
            checked={selectedTypes.includes(type)}
            onChange={() => handleCheckboxChange(type)}
            defaultChecked={type === "essential"}
          />
          <label htmlFor={type} className="text-xl">
            {type}
          </label>
        </div>
      ))}
      <br />
      <button
        onClick={generateJson}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Generate JSON
      </button>

      <br />
      <br />
      <br />
      {jsonOutput && (
        <div className="flex gap-5">
          <div>
            <h3 className="text-lg font-bold">
              {`Custom Nodes (${
                Object.keys(JSON.parse(jsonOutput).git_custom_nodes).length
              })`}{" "}
            </h3>
            <Printer jsonOutput={jsonOutput} />
          </div>

          <div>
            <h3 className="text-lg font-bold">
              {`Models (${models.length})`}{" "}
            </h3>
            <Printer jsonOutput={JSON.stringify(models, null, 2)} />
          </div>
        </div>
      )}
    </div>
  );
}
