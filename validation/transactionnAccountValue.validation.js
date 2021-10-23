import differenceBetweenDatesInMilesseconds from "../util/differenceBetweenDatesInMilesseconds.js";

export default function (transaction, account, transactionHistory) {
  account.violations = [];

  if (account.account === null) {
    account.account = {};
    account.violations.push("account-not-initialized");
  }

  if (account?.account?.["available-limit"] - transaction.amount < 0) {
    account.violations.push("insufficient-limit");
  }

  if (transactionHistory.length >= 3) {
    const l = transactionHistory.length;
    const firstTransaction = transactionHistory[l - 3];

    const diffDateInMilesegundos = differenceBetweenDatesInMilesseconds(
      firstTransaction.time,
      transaction.time
    );

    if (diffDateInMilesegundos < 120000) {
      account.violations.push("high-frequency-small-interval");
    }
  }

  if (account?.account?.["active-card"] === false) {
    account.violations.push("card-not-active");
  }

  if (transactionHistory.length > 0) {
    const transactionDuplicated = transactionHistory.filter((operation) => {
      return (
        operation.merchant === transaction.merchant &&
        operation.amount === transaction.amount
      );
    });

    if (transactionDuplicated.length > 0) {
      account.violations.push("doubled-transaction");
    }
  }

  const accountReturn = JSON.parse(JSON.stringify(account));

  return accountReturn;
}
