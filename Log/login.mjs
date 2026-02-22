import fs from "fs";
import path from "path";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath } from "url";
import readline from "readline";
// ==========================
// ESM Directory Setup
// ==========================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "data.json");

// ==========================
// Utilities
// ==========================

async function Data() {
  console.log("Checking...");
  await sleep(1000);
  console.log("Checking...");
  await sleep(1000);
}

// ==========================
// Database Functions
// ==========================

export function getUsers() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

function generateId(users) {
  const maxId = users.reduce(
    (max, user) => (user.id > max ? user.id : max),
    0
  );
  return maxId + 1;
}

//
// ==========================
// Registration (Clean Version)
// ==========================
//
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export async function register(ask) {
  const users = getUsers();
  let attempts = 0;

  while (attempts < 3) {

    const username = await ask("\nCreate username: ");
    await Data();

    if (!username || !isNaN(username)) {
      console.log("Invalid username. Must contain letters.");
      attempts++;
      continue;
    }

    const ageInput = await ask("\nEnter your age: ");
    await Data();

    const age = Number(ageInput);
    if (!age || age < 18) {
      console.log("You must be at least 18.");
      attempts++;
      continue;
    }

    const email = await ask("\nEnter your email: ");
    await Data();

    if (!email.includes("@")) {
      console.log("Invalid email.");
      attempts++;
      continue;
    }

    const sex = (await ask("\nSex (male/female/other): ")).toLowerCase();
    await Data();

    if (!["male", "female", "other"].includes(sex)) {
      console.log("Invalid option.");
      attempts++;
      continue;
    }

    const password = await ask("\nCreate 6-digit password: ");
    await Data();

    if (!/^\d{6}$/.test(password)) {
      console.log("Password must be exactly 6 digits.");
      attempts++;
      continue;
    }

    // ✅ Only reaches here if everything is valid
    const id = generateId(users);

    const newUser = {
      id,
      username,
      age,
      email,
      sex,
      password
    };

    users.push(newUser);
    saveUsers(users);

    console.log("\nAccount created successfully!");
    console.log("Your User ID is:", id);

    return true;
  }

  console.log("Too many failed attempts.");
  return false;
}


//
// ==========================
// Login (Clean Version)
// ==========================
//

export async function login(ask) {
  const users = getUsers();
  let attempts = 0;

  while (attempts < 3) {
    const idInput = await ask("\nEnter your User ID: ");
    await Data();

    const password = await ask("\nEnter password: ");
    await Data();

    const id = Number(idInput);
    const user = users.find(u => u.id === id);

    if (user && user.password === password) {
      console.log("\nLogin successful!");
      console.log("Welcome,", user.username);
      return true; // success
    }

    attempts++;
    console.log("Invalid credentials.");

    if (attempts === 3) {
      console.log("Maximum attempts reached.");
      return false;
    }
  }
}
