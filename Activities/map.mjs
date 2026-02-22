import {getUsers} from "../Log/login.mjs";

import { fileURLToPath} from 'url';
import {setTimeout as sleep} from "node:timers/promises";






export async function time() {
    console.log("Processing...");
    await sleep(1000);
    console.log("Processing...");
    await sleep(1000);
}


export async function mapAsk (ask) {

    const read = await getUsers();

    console.log("Map options:");
    console.log("\n1. Hide id");
    console.log("\n2. Hide password");
    console.log("\n3. Hide both");

        const rl1 = await ask("\nEnter your choice (1-3): ");

        if (rl1 === "1") {
            await time();
            const mapped = read.map(user => {
                const { id, ...rest } = user;
                
                return rest;
            });

            console.log(mapped);
            console.log("Users id successfully hidden.");
        } else if (rl1 === "2") {
            await time();
            const mapped = read.map(user => {
                const { password, ...rest } = user;
                
                return rest;
            });

            console.log(mapped);
            console.log("Users password successfully hidden.");
        } else if (rl1 === "3") {
            await time();
            const mapped = read.map(user => {
                const { id, password, ...rest } = user;
                
                return rest;
            });
            console.log(mapped);
            console.log("Users id and password successfully hidden.")
        }
        
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  mapAsk();
}
