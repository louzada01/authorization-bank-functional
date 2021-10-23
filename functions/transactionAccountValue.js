import transactionnAccountValueValidation from "../validation/transactionnAccountValue.validation.js";

export default function (transaction, account, transactionHistory) {
  transactionnAccountValueValidation(
    transaction,
    account,
    transactionHistory
  );

  if(account.violations.length > 0){
    return account
  }
  
  account.account = {
    "active-card": true,
    "available-limit": account.account["available-limit"] - transaction.amount,
  };

  account.violations = [];

  transactionHistory.push(transaction);

  return account;
}
