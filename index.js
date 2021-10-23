import readline from "readline";

import { functionGateway } from "./functions/index.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let accountState = {
  account: null,
};

const transactionHistory = [];

rl.on("line", (line) => {
  try {
    const data = JSON.parse(line);
    
    accountState.violations = []
    accountState = functionGateway(accountState, data, transactionHistory);

    return console.log(accountState);
  } catch (error) {
    console.log(error.message);
  }
});
