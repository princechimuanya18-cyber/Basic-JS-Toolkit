import { getUsers, saveUsers } from "../Log/login.mjs";
import { setTimeout as sleep } from "node:timers/promises";

// ==========================
// Timer Utility
// ==========================
async function timer() {
  console.log("Processing...");
  await sleep(500);
  console.log("Processing...");
  await sleep(500);
}

// ==========================
// Sorting Function (Ask-Based)
// ==========================

export async function sorting(ask) {
  try {
    const users = getUsers();

    if (!users.length) {
      await timer();
      console.log("No users found.");
      return false;
    }

    console.log("\nChoose sorting field:");
    console.log("1. Username");
    console.log("2. Age");
    console.log("3. Email");
    console.log("4. Sex");

    const option = await ask("\nEnter option number: ");

    const fieldMap = {
      "1": "username",
      "2": "age",
      "3": "email",
      "4": "sex"
    };

    const field = fieldMap[option];

    if (!field) {
      await timer();
      console.log("Invalid option.");
      return false;
    }

    console.log("\n1. Ascending");
    console.log("2. Descending");

    const direction = await ask("\nEnter sub-option number: ");

    if (!["1", "2"].includes(direction)) {
      await timer();
      console.log("Invalid sub-option.");
      return false;
    }

    const isAscending = direction === "1";

    users.sort((a, b) => {
      const valA = a[field];
      const valB = b[field];

      if (typeof valA === "number") {
        return isAscending
          ? (valA ?? 0) - (valB ?? 0)
          : (valB ?? 0) - (valA ?? 0);
      }

      return isAscending
        ? String(valA ?? "").localeCompare(String(valB ?? ""))
        : String(valB ?? "").localeCompare(String(valA ?? ""));
    });

    saveUsers(users);

    await timer();
    console.log("\nUsers sorted successfully.");
    console.table(users);

    return true;

  } catch (err) {
    console.error("Error during sorting:", err.message);
    return false;
  }
}
