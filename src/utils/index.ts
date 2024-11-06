import fs from "fs";
import { generateRefreshToken, generateToken, verifyToken } from "./jwt";
function logHistory(
  operation: string,
  valueA: number,
  valueB: number,
  result: number
) {
  const history = { operation, valueA, valueB, result, date: new Date() };
  const historyFile = "history.json";
  if (!fs.existsSync(historyFile)) {
    fs.writeFileSync(historyFile, "[]");
  }
  const data = JSON.parse(fs.readFileSync(historyFile, "utf-8"));
  data.push(history);
  fs.writeFileSync(historyFile, JSON.stringify(data));
}

function formatResponse(status: number, message: string, data: any = null) {
  return { status, message, data };
}

function readJSONFile(filepath: string): any[] {
  try {
    const data = fs.readFileSync(filepath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error: any) {
    console.error(`Failed to read or parse file at ${filepath}:`, error);
    return [];
  }
}

function writeJSONFile(filepath: string, data: any) {
  try {
    fs.writeFileSync(filepath, JSON.stringify(data));
  } catch (error: any) {
    console.error(`Failed to write file at ${filepath}:`, error);
  }
}

export {
  generateToken,
  generateRefreshToken,
  verifyToken,
  formatResponse,
  logHistory,
  readJSONFile,
  writeJSONFile,
};
