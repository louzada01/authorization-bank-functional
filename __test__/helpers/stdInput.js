import { functionGateway } from "../../functions/index.js";

export function helperStd(account, arrLines, transactionHistory = []) {
  const testReturn = [];

  for (let line of arrLines) {
    account = functionGateway(account, JSON.parse(line), transactionHistory);
    
    testReturn.push(JSON.parse(JSON.stringify(account)));
  }

  return testReturn;
}
