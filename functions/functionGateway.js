import createAccount from "./createAccount.js";
import transactionAccountValue from "./transactionAccountValue.js";

export default (accountState, data, transactionHistory) => {
  
  if (data?.account) {
    return createAccount(data.account, accountState);
  }
  if (data?.transaction) {
    return transactionAccountValue(
      data.transaction,
      accountState,
      transactionHistory
    );
  }

  return accountState;
};
