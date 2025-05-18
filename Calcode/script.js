const questions = [
  { label: "Force (N):", key: "force" },
  { label: "Displacement (m):", key: "displacement" },
  { label: "Mass (kg):", key: "mass" },
  { label: "Height (m):", key: "height" },
  { label: "Initial Velocity (m/s):", key: "initialVelocity" },
  { label: "Final Velocity (m/s):", key: "finalVelocity" }
];

let currentStep = 0;
let data = {};

const questionLabel = document.getElementById("questionLabel");
const inputField = document.getElementById("inputField");
const nextButton = document.getElementById("nextButton");
const resultsDiv = document.getElementById("results");

nextButton.addEventListener("click", () => {
  const value = parseFloat(inputField.value);

  if (isNaN(value)) {
    alert("Please enter a valid number.");
    return;
  }

  data[questions[currentStep].key] = value;
  inputField.value = "";
  currentStep++;

  if (currentStep < questions.length) {
    questionLabel.textContent = questions[currentStep].label;
  } else {
    calculateEnergy();
  }
});

function calculateEnergy() {
  const { force, displacement, mass, height, initialVelocity, finalVelocity } = data;
  const g = 9.81;

  const work = force * displacement;
  const ke = 0.5 * mass * (finalVelocity ** 2 - initialVelocity ** 2);
  const pe = mass * g * height;

  document.querySelector(".step").style.display = "none";
  resultsDiv.style.display = "block";
  document.getElementById("workOutput").textContent = `Work Done: ${work.toFixed(2)} J`;
  document.getElementById("keOutput").textContent = `Kinetic Energy: ${ke.toFixed(2)} J`;
  document.getElementById("peOutput").textContent = `Potential Energy: ${pe.toFixed(2)} J`;
}

function restart() {
  currentStep = 0;
  data = {};
  document.querySelector(".step").style.display = "block";
  resultsDiv.style.display = "none";
  questionLabel.textContent = questions[currentStep].label;
}
