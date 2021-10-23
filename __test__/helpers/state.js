export let accountState = {
  account: null,
  violations: [],
};

export function clearState() {
  accountState.account = null;
  accountState.violations = [];
}

export default { accountState, clearState };
