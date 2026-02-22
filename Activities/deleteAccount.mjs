import { getUsers, saveUsers } from "../Log/login.mjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ==========================
// ESM Path Setup
// ==========================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../Log", "recycleBin.json");

// ==========================
// Recycle Bin Utilities
// ==========================




export function getRecycleUsers() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return [];
  }
}

export function saveRecycleUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

// ==========================
// Delete Account (Ask-Based)
// ==========================

export async function deleteAcc(ask) {
  const users = getUsers();
  const recycleUsers = getRecycleUsers();

  const idInput = await ask("Enter the User ID of the account to delete: ");
  const id = Number(idInput);

  if (!id) {
    console.log("Invalid ID.");
    return false;
  }

  const userToDelete = users.find(user => user.id === id);

  if (!userToDelete) {
    console.log("No account found with that User ID.");
    return false;
  }

  // Remove from main DB
  const updatedUsers = users.filter(user => user.id !== id);

  // Add to recycle bin
  recycleUsers.push({
    ...userToDelete,
    deletedAt: new Date().toISOString()
  });

  saveUsers(updatedUsers);
  saveRecycleUsers(recycleUsers);

  console.log("\nAccount moved to recycle bin successfully.");
  return true;
}

