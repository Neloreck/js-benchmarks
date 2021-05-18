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

export async function ensureDirExists(path: string): Promise<void> {
  if (!await checkAccess(path)) {
    await createDir(path);
  }
}

export async function ensureFileExists(path: string, data: string | Uint8Array): Promise<void> {
  if (!await checkAccess(path)) {
    await writeFile(path, data);
  }
}

export function createDir(path:string): Promise<void> {
  return fs.promises.mkdir(path);
}

export function createFileHash(path: string): Promise<string>{
  return new Promise((resolve) => {
    const hash: crypto.Hash = crypto.createHash("sha1");

    fs.createReadStream(path)
      .on("data", (data) => hash.update(data))
      .on("end", () => resolve(hash.digest("hex")));
  });
}

export function listDirectoryFiles(path: string): Promise<Array<string>> {
  return fs.promises.readdir(path);
}
