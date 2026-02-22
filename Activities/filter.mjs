import { getUsers } from "../Log/login.mjs";

import {fileURLToPath} from 'url';


import {time} from "./map.mjs";

export async function filterAsk (ask) {
    const readUsers = await getUsers();

    console.log("Filter age database:");
    console.log("\n1. Filter all GEN-Z");
    console.log("\n2. Filter all Milenials.");
    console.log("\n3. Filter all GEN-X");
    console.log("\n4. Filter all Boomers.");
    

    
        const rl1 = await ask ("\nEnter your choice (1-4): ");
        if (rl1 === "1") {
            
            await time();
            const filtered = readUsers.filter(user => user.age < 30);

            if (filtered.length > 0) {
                console.log("Successfully filtered GEN-Z users");
                console.table(filtered);
            }

           else {
            console.log("No GEN-Z found!");
           }
        }

        else if (rl1 === "2") {
            await time();
            const filtered = readUsers.filter(user => user.age >= 30 && user.age < 50);

            if (filtered.length > 0) {
                console.log("Successfully filtered Milenials");
                console.table(filtered);
            } else {
                console.log("No Milenials found!");
            }
        }

        else if (answer === "3") {
            await time();
            const filtered = readUsers.filter(user => user.age >= 50 && user.age < 70);

            if (filtered.length > 0) {
                console.log("Successfully filtered GEN-X users");
                console.table(filtered);
            } else {
                console.log("No GEN-X users found!");
            }
        }

        else if (answer === "4") {
            await time();
            const filtered = readUsers.filter(user => user.age >= 70);

            if (filtered.length > 0) {
                console.log("Successfully filtered Boomers");
                console.table(filtered);
            } else {
                console.log("No Boomers found!");
            }
        }

        
    
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  filterAsk();
}

