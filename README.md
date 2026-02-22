# Basic JS Tool

A simple Node.js CLI project for basic user account management and JavaScript data operations (`sort`, `filter`, `map`, `reduce`) on a JSON-based user database.

## Features

- Register a user (username, age, email, sex, 6-digit password)
- Login with User ID and password
- Delete account to recycle bin
- Recover account from recycle bin
- Sort users by username, age, email, or sex (ascending/descending)
- Filter users by age groups
- Map user output to hide sensitive fields
- Reduce users to compute counts and averages

## Tech Stack

- Node.js (ES Modules)
- JSON file storage
- `bcrypt` dependency (used in `TEST/passsword.mjs`)

## Project Structure

```text
Basic JS tool/
|- Main/
|  `- SYSTEM.mjs           # Main CLI entry point and menus
|- Log/
|  |- login.mjs            # Register/login + read/write users
|  |- data.json            # User database
|  `- recycleBin.json      # Deleted users
|- Activities/
|  |- sorted.mjs           # Sorting operations
|  |- filter.mjs           # Filtering operations
|  |- map.mjs              # Mapping operations
|  |- reduce.mjs           # Reduce/statistics operations
|  |- deleteAccount.mjs    # Delete (move to recycle bin)
|  `- recoverAccount.mjs   # Recover account
`- TEST/
   `- passsword.mjs        # bcrypt hashing/compare playground
```

## Requirements

- Node.js 18+ recommended

## Installation

```bash
npm install
```

## Run the App

```bash
node Main/SYSTEM.mjs
```

You will get a menu like:

1. Login
2. Register
3. Delete Account
4. Recover Account
5. Exit

After successful login, the Activities menu is available:

1. Sorting
2. Filtering
3. Mapping
4. Reducing
5. Back to Main Menu

## Data Files

- Main user records are stored in `Log/data.json`.
- Deleted users are stored in `Log/recycleBin.json`.

## Notes

- The app currently uses local JSON files as storage (no database server).
- `TEST/passsword.mjs` demonstrates bcrypt usage, but login/registration flow in `Log/login.mjs` is still mostly direct password value matching.

