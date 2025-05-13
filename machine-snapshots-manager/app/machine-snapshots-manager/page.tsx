import { promises as fs } from "fs";
import path from "path";
import SnapshotPicker from "./pickers";

export default async function Page() {
  const snapshotsDir = path.join(process.cwd(), "machine-snapshots");
  const dirContents = await fs.readdir(snapshotsDir, { withFileTypes: true });
  const snapshotTypes = dirContents
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const customNodesData = {};
  const modelsData = {};

  for (const type of snapshotTypes) {
    const customNodesPath = path.join(
      process.cwd(),
      "machine-snapshots",
      type,
      "custom-nodes.json"
    );
    const modelsPath = path.join(
      process.cwd(),
      "machine-snapshots",
      type,
      "models.json"
    );

    const customNodesContent = await fs.readFile(customNodesPath, "utf8");
    const modelsContent = await fs.readFile(modelsPath, "utf8");

    customNodesData[type] = JSON.parse(customNodesContent);
    modelsData[type] = JSON.parse(modelsContent);
  }

  return (
    <main className="p-5">
      <SnapshotPicker
        snapshotTypes={snapshotTypes}
        customNodesData={customNodesData}
        modelsData={modelsData}
      />
    </main>
  );
}
