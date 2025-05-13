"use server";

import { writeFile } from "fs/promises";
import path from "path";

export async function saveJsonToFile(
  name: string,
  jsonContent: string,
  type: "custom-nodes" | "models"
) {
  const filePath = path.join(
    process.cwd(),
    "machine-snapshots",
    name,
    type === "custom-nodes" ? "custom-nodes.json" : "models.json"
  );
  await writeFile(filePath, jsonContent);
}
