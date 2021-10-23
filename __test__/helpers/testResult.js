export function testResult (statusTest) {
  let testIsWorking = true;

  for (let test of statusTest) {
    if (test.status === "failed") {
      console.log(`Is test "${test.testName}" not working correctly`);
      testIsWorking = false;
    }
  }

  if (testIsWorking) {
    console.log("This test is working");
  }
}
