export default function (
  { "active-card": activeCard, "available-limit": avalialableLimit },
  account
) {
  if (account.account !== null) {
    account.violations = ["accountalready-initialized"];
    return account
  }

  account.account = {
    "active-card": activeCard,
    "available-limit": avalialableLimit,
  };
  account.violations = [];

  return account
}
