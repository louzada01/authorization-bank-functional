import { accountState, clearState} from './helpers/state.js'
import { helperStd } from './helpers/stdInput.js';
import { testResult } from "./helpers/testResult.js";

const statusTest = [];

function main() {
  const createdAccountSucces = () => {
    const payloadTest = [
      '{ "account": { "active-card": true, "available-limit": 175 } }',
    ];

    const [{ account, violations }] = helperStd(accountState, payloadTest);

    if (
      account?.["active-card"] &&
      account?.["available-limit"] === 175 &&
      violations.length === 0
    ) {
      return { testName: "createdAccountSucces", status: "succes" };
    }
    return { testName: "createdAccountSucces", status: "failed" };
  };
  statusTest.push(createdAccountSucces());
  clearState();

  const cretedAccountDuplicated = () => {
    const payloadTest = [
      '{ "account": { "active-card": true, "available-limit": 175 } }',
      '{ "account": { "active-card": true, "available-limit": 300 } }',
    ];

    const [, { violations }] = helperStd(accountState, payloadTest);

    if (violations?.[0] === "accountalready-initialized") {
      return { testName: "cretedAccountDuplicated", status: "succes" };
    }
    return { testName: "cretedAccountDuplicated", status: "failed" };
  };
  statusTest.push(cretedAccountDuplicated());
  
}

main();
testResult(statusTest)