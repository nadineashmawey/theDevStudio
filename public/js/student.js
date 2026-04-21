const testCases = [
  {
    title: "Test Case 1",
    status: "Passed",
    time: "12ms",
    input: "nums = [2,7,11,15], target = 9",
    expected: "[0,1]",
    output: "[0,1]"
  },
  {
    title: "Test Case 2",
    status: "Passed",
    time: "8ms",
    input: "nums = [3,2,4], target = 6",
    expected: "[1,2]",
    output: "[1,2]"
  },
  {
    title: "Test Case 3",
    status: "Failed",
    time: "10ms",
    input: "nums = [3,3], target = 6",
    expected: "[0,1]",
    output: "[1,1]"
  },
  {
    title: "Test Case 4",
    status: "Passed",
    time: "15ms",
    input: "nums = [1,5,3,7,9], target = 12",
    expected: "[2,4]",
    output: "[2,4]"
  },
  {
    title: "Test Case 5",
    status: "Failed",
    time: "11ms",
    input: "nums = [2,5,5,11], target = 10",
    expected: "[1,2]",
    output: "[0,2]"
  }
];

const testList = document.getElementById("testList");

function createTestCaseCard(test) {
  const card = document.createElement("div");
  card.className = `test-card ${test.status.toLowerCase()}`;

  const isPassed = test.status === "Passed";
  const icon = isPassed ? "✓" : "✕";

  card.innerHTML = `
    <div class="test-top">
      <div class="test-title-wrap">
        <div class="test-circle ${isPassed ? "passed" : "failed"}">${icon}</div>
        <div class="test-title">${test.title}</div>
      </div>

      <div class="test-status-wrap">
        <span class="test-status ${isPassed ? "passed" : "failed"}">${test.status}</span>
        <span class="test-time">${test.time}</span>
      </div>
    </div>

    <div class="test-fields">
      <div class="test-field">
        <label>Input:</label>
        <div class="code-line">${test.input}</div>
      </div>

      <div class="output-grid">
        <div class="test-field">
          <label>Expected:</label>
          <div class="code-box">${test.expected}</div>
        </div>

        <div class="test-field">
          <label>Your Output:</label>
          <div class="code-box ${isPassed ? "" : "wrong-output"}">${test.output}</div>
        </div>
      </div>
    </div>
  `;

  return card;
}

testCases.forEach((test) => {
  testList.appendChild(createTestCaseCard(test));
});

const retryBtn = document.querySelector(".btn-outline");
const nextBtn = document.querySelector(".btn-pink");

if (retryBtn) {
  retryBtn.addEventListener("click", () => {
    window.location.href = "start-challenge.html";
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    window.location.href = "leaderboard.html";
  });
}