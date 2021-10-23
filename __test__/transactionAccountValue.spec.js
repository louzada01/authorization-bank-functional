import { accountState, clearState } from "./helpers/state.js";
import { helperStd } from "./helpers/stdInput.js";
import { testResult } from "./helpers/testResult.js";

const statusTest = [];

function main() {
  const transactionSucces = () => {
    const payloadTest = [
      '{"account": {"active-card": true, "available-limit": 100}}',
      '{"transaction": {"merchant": "Burger King", "amount": 20, "time": "2019-02-13T11:00:00.000Z"}}',
    ];

    const [, { account, violations }] = helperStd(accountState, payloadTest);

    if (
      account?.["active-card"] &&
      account?.["available-limit"] === 80 &&
      violations.length === 0
    ) {
      return { testName: "transactionSucces", status: "succes" };
    }
    return { testName: "transactionSucces", status: "failed" };
  };
  statusTest.push(transactionSucces());
  clearState();

  const accountNotInitialized = () => {
    const payloadTest = [
      '{"transaction": {"merchant": "Uber Eats", "amount": 25, "time": "2020-12-01T11:07:00.000Z"}}',
      '{"account": {"active-card": true, "available-limit": 225}}',
      '{"transaction": {"merchant": "Uber Eats", "amount": 25, "time": "2020-12-01T11:07:00.000Z"}}',
    ];
    const [{ violations }] = helperStd(accountState, payloadTest);

    if (violations[0] === "account-not-initialized") {
      return { testName: "accountNotInitialized", status: "succes" };
    }
    return { testName: "accountNotInitialized", status: "failed" };
  };
  statusTest.push(accountNotInitialized());
  clearState();

  const cardNotActive = () => {
    const payloadTest = [
      '{"account": {"active-card": false, "available-limit": 100}}',
      '{"transaction": {"merchant": "Burger King", "amount": 20, "time": "2019-02-13T11:00:00.000Z"}}',
      `{"transaction": {"merchant": "Habbib's", "amount": 15, "time": "2019-02-13T11:15:00.000Z"}}`,
    ];

    const [{ account }, { violations }] = helperStd(accountState, payloadTest);

    if (account !== null && violations[0] === "card-not-active") {
      return { testName: "cardNotActive", status: "succes" };
    }
    return { testName: "cardNotActive", status: "failed" };
  };
  statusTest.push(cardNotActive());
  clearState();

  const insufficientLimit = () => {
    const payloadTest = [
      '{"account": {"active-card": true, "available-limit": 1000}}',
      '{"transaction": {"merchant": "Vivara", "amount": 1250, "time": "2019-02-13T11:00:00.000Z"}}',
      '{"transaction": {"merchant": "Samsung", "amount": 2500, "time": "2019-02-13T11:00:01.000Z"}}',
      '{"transaction": {"merchant": "Nike", "amount": 800, "time": "2019-02-13T11:01:01.000Z"}}',
    ];

    const [{ account }, { violations }] = helperStd(accountState, payloadTest);

    if (account !== null && violations[0] === "insufficient-limit") {
      return { testName: "insufficientLimit", status: "succes" };
    }
    return { testName: "insufficientLimit", status: "failed" };
  };
  statusTest.push(insufficientLimit());
  clearState();

  const highFrequencySmallInterval = () => {
    const payloadTest = [
      `{"account": {"active-card": true, "available-limit": 100}}`,
      `{"transaction": {"merchant": "Burger King", "amount": 20, "time": "2019-02-13T11:00:00.000Z"}}`,
      `{"transaction": {"merchant": "Habbib's", "amount": 20, "time": "2019-02-13T11:00:01.000Z"}}`,
      `{"transaction": {"merchant": "McDonald's", "amount": 20, "time": "2019-02-13T11:01:01.000Z"}}`,
      `{"transaction": {"merchant": "Subway", "amount": 20, "time": "2019-02-13T11:01:31.000Z"}}`,
      `{"transaction": {"merchant": "Burger King", "amount": 10, "time": "2019-02-13T12:00:00.000Z"}}`,
    ];

    const testReturn = helperStd(accountState, payloadTest);

    if (testReturn[4]?.violations?.[0] === "high-frequency-small-interval") {
      return { testName: "highFrequencySmallInterval", status: "succes" };
    }
    return { testName: "highFrequencySmallInterval", status: "failed" };
  };
  statusTest.push(highFrequencySmallInterval());
  clearState();

  const doubledTransaction = () => {
    const payloadTest = [
      `{"account": {"active-card": true, "available-limit": 100}}`,
      `{"transaction": {"merchant": "Burger King", "amount": 20, "time": "2019-02-13T11:00:00.000Z"}}`,
      `{"transaction": {"merchant": "McDonald's", "amount": 10, "time": "2019-02-13T11:00:01.000Z"}}`,
      `{"transaction": {"merchant": "Burger King", "amount": 20, "time": "2019-02-13T11:00:02.000Z"}}`,
      `{"transaction": {"merchant": "Burger King", "amount": 15, "time": "2019-02-13T11:00:03.000Z"}}`,
    ];

    const testReturn = helperStd(accountState, payloadTest);

    if (testReturn[3]?.violations?.[0] === "doubled-transaction") {
      return { testName: "doubledTransaction", status: "succes" };
    }
    return { testName: "doubledTransaction", status: "failed" };
  };
  statusTest.push(doubledTransaction());
  clearState();

  const multiplyViolation = () => {
    const payloadTest = [
      `{"account": {"active-card": true, "available-limit": 100}}`,
      `{"transaction": {"merchant": "McDonald's", "amount": 10, "time": "2019-02-13T11:00:01.000Z"}}`,
      `{"transaction": {"merchant": "Burger King", "amount": 20, "time": "2019-02-13T11:00:02.000Z"}}`,
      `{"transaction": {"merchant": "Burger King", "amount": 5, "time": "2019-02-13T11:00:07.000Z"}}`,
      `{"transaction": {"merchant": "Burger King", "amount": 5, "time": "2019-02-13T11:00:08.000Z"}}`,
      `{"transaction": {"merchant": "Burger King", "amount": 150, "time": "2019-02-13T11:00:18.000Z"}}`,
      `{"transaction": {"merchant": "Burger King", "amount": 190, "time": "2019-02-13T11:00:22.000Z"}}`,
      `{"transaction": {"merchant": "Burger King", "amount": 15, "time": "2019-02-13T12:00:27.000Z"}}`,
    ];

    const testReturn = helperStd(accountState, payloadTest);

    const firstMultiplyViolation = testReturn[4].violations.filter(
      (transaction) =>
        transaction === "high-frequency-small-interval" ||
        transaction === "doubled-transaction"
    );
    const secondMultiplyViolation = testReturn[5].violations.filter(
      (transaction) =>
        transaction === "insufficient-limit" ||
        transaction === "high-frequency-small-interval"
    );

    const thirdMultiplyViolation = testReturn[6].violations.filter(
      (transaction) =>
        transaction === "insufficient-limit" ||
        transaction === "high-frequency-small-interval"
    );
    if (
      firstMultiplyViolation.length === 2 &&
      secondMultiplyViolation.length === 2 &&
      thirdMultiplyViolation.length === 2
    ) {
      return { testName: "multiplyViolation", status: "succes" };
    }
    return { testName: "multiplyViolation", status: "failed" };
  };
  statusTest.push(multiplyViolation());
  clearState();
}

main();

testResult(statusTest);
