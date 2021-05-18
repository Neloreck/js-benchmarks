import * as crypto from "crypto";
import * as fs from "fs";

export function writeFile(path: string, data: string | Uint8Array): Promise<void> {
  return fs.promises.writeFile(path, data);
}

export function checkAccess(path: string): Promise<boolean> {
  return fs.promises.access(path)
    .then(() => true)
    .catch(() => false);
}

export function createFileHash(filePath: string): Promise<string>{
  return new Promise((resolve) => {
    const hash: crypto.Hash = crypto.createHash("sha1");

    fs.createReadStream(filePath)
      .on("data", (data) => hash.update(data))
      .on("end", () => resolve(hash.digest("hex")));
  });
}

export function listDirectoryFiles(path: string): Promise<Array<string>> {
  return fs.promises.readdir(path);
}
