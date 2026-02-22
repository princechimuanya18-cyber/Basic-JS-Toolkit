import { getRecycleUsers, saveRecycleUsers } from "./deleteAccount.mjs";
import { saveUsers, getUsers } from "../Log/login.mjs";

// ==========================
// Recover Account (Ask-Based)
// ==========================

export async function recoverAcc(ask) {
  const recycleUsers = getRecycleUsers();
  const users = getUsers();

  const idInput = await ask("Enter the User ID of the account to recover: ");
  const id = Number(idInput);

  if (!id) {
    console.log("Invalid ID.");
    return false;
  }

  const userToRecover = recycleUsers.find(user => user.id === id);

  if (!userToRecover) {
    console.log("No account found in recycle bin with that User ID.");
    return false;
  }

  // Remove from recycle bin
  const updatedRecycle = recycleUsers.filter(user => user.id !== id);

  // Remove metadata before restoring (optional)
  const { deletedAt, ...cleanUser } = userToRecover;

  // Restore to main DB
  users.push(cleanUser);

  saveUsers(users);
  saveRecycleUsers(updatedRecycle);

  console.log("\nAccount recovered successfully.");
  return true;
}
