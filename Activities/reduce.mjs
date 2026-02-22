import { getUsers } from "../Log/login.mjs";
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
// Reduce Operations (Ask-Based)
// ==========================

export async function reduceAsk(ask) {
  const users = getUsers();

  if (!users.length) {
    await timer();
    console.log("No users found.");
    return false;
  }

  console.log("\nReduce database options:");
  console.log("1. Total users in database.");
  console.log("2. Total GEN-Z users (18–29).");
  console.log("3. Total Millennials (30–49).");
  console.log("4. Total GEN-X users (50–69).");
  console.log("5. Total Boomers (70+).");
  console.log("6. Total male users.");
  console.log("7. Total female users.");
  console.log("8. Average age of all users.");

  const answer = await ask("\nEnter your choice (1-8): ");
  await timer();

  

    if  (answer === "1") {
      const result = users.reduce(acc => acc + 1, 0);
      console.log("Total number of users:", result);
    }

    else if (answer === "2") {
      const result = users.reduce(
        (acc, user) => (user.age >= 18 && user.age < 30 ? acc + 1 : acc),
        0
      );
      console.log("Total GEN-Z users:", result);
      

    } else if (answer === "3") {
      const result = users.reduce(
        (acc, user) => (user.age >= 30 && user.age < 50 ? acc + 1 : acc),
        0
      );
      console.log("Total Millennials:", result);
      

    } else if (answer === "4") {
      const result = users.reduce(
        (acc, user) => (user.age >= 50 && user.age < 70 ? acc + 1 : acc),
        0
      );
      console.log("Total GEN-X users:", result);
      

    } else if (answer === "5") {
      const result = users.reduce(
        (acc, user) => (user.age >= 70 ? acc + 1 : acc),
        0
      );
      console.log("Total Boomers:", result);
      

    } else if (answer === "6") {
      const result = users.reduce(
        (acc, user) => (user.sex === "male" ? acc + 1 : acc),
        0
      );
      console.log("Total male users:", result);
      

    } else if (answer === "7") {
      const result = users.reduce(
        (acc, user) => (user.sex === "female" ? acc + 1 : acc),
        0
      );
      console.log("Total female users:", result);
      

    } else if (answer === "8") {
      const totalAge = users.reduce((acc, user) => acc + (user.age || 0), 0);
      const result = (totalAge / users.length).toFixed(2);
      console.log("Average age of all users:", result);
    

    } else {
      console.log("Invalid option.");
      return false;
  }

  return true;
}
