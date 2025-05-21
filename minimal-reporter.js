class MinimalReporter {
  onTestResult(_, testResult) {
    testResult.testResults.forEach((test) => {
      if (test.status === "failed") {
        console.log(
          `\n❌ ${test.fullName} ⬇️\n ${test.failureMessages[0].split("\n")[0]}`
        );
      }
    });
  }
}
module.exports = MinimalReporter;
