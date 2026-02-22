
import { sorting } from '../Activities/sorted.mjs';

import { reduceAsk } from "../Activities/reduce.mjs";
import { filterAsk } from "../Activities/filter.mjs";
import { mapAsk } from "../Activities/map.mjs";
import { deleteAcc } from "../Activities/deleteAccount.mjs";
import { recoverAcc } from "../Activities/recoverAccount.mjs";
import { register, login } from "../Log/login.mjs";

import readline from "readline";
import { fileURLToPath } from "url";

// =====================
// Create ONE Interface
// =====================
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promise-based question wrapper
function ask(question) {
  return new Promise(resolve => {
    rl.question(question, answer => resolve(answer.trim()));
  });
}

// =====================
// Activities Menu
// =====================
async function activitiesMenu(ask) {
  while (true) {
    console.log("\n===List of Actions:===");
    console.log("1. Sorting");
    console.log("2. Filtering");
    console.log("3. Mapping");
    console.log("4. Reducing");
    console.log("5. Back to Main Menu");

    const answer = await ask("\nSelect an action (1-5): ");

    if (answer === "1") {
      await sorting(ask);
    }
    else if (answer === "2") {
      await filterAsk(ask);
    }
    else if (answer === "3") {
      await mapAsk(ask);
    }
    else if (answer === "4") {
      await reduceAsk(ask);
    }
    else if (answer === "5") {
      return; // Exit activities loop'
    }
    else {
      console.log("Invalid action. Please try again.");
    }
  }
}




// =====================
// Main Menu
// =====================
async function mainMenu() {
  while (true) {
    console.log("\n======================");
    console.log("Welcome to WebJS!");
    console.log("======================");

    console.log("\n1. Login");
    console.log("2. Register");
    console.log("3. Delete Account");
    console.log("4. Recover Account");
    console.log("5. Exit");

    const answer = await ask("\nSelect an option (1-5): ");

    if (answer === "1") {
      const success = await login(ask);
      if (success) {
        await activitiesMenu(ask);
      }
    }
    else if (answer === "2") {
      await register(ask);
    }
    else if (answer === "3") {
      await deleteAcc(ask);
    }
    else if (answer === "4") {
      await recoverAcc(ask);
    }
    else if (answer === "5") {
      console.log("\nThank you for using WebJS.");
      rl.close();
      break;
    }
    else {
      console.log("Invalid option. Please try again.");
    }
  }
}

// =====================
// Entry Point
// =====================
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  mainMenu();
}
