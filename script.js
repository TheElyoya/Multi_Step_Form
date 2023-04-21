const mainForm = document.getElementById("form");
const formSteps = [...mainForm.querySelectorAll("[data-form-steps]")];
const password = document.getElementById("password");
const passTwo = document.getElementById("pass2");
const passDoesNotMatchMessage = document.querySelector(".small");
let currentStep = formSteps.findIndex((step) => {
  return step.classList.contains("active");
});
if (currentStep < 0) {
  currentStep = 0;

  showCurrentStep();
}

mainForm.addEventListener("click", (e) => {
  let incrementor;
  let inputs = [...formSteps[currentStep].querySelectorAll("input")];
  if (e.target.matches("[data-next]")) {
    incrementor = 1;
    let allValid = inputs.every((input) => {
      return input.reportValidity();
    });
    if (password.value.trim() !== passTwo.value.trim()) {
      allValid = false;
      passDoesNotMatchMessage.style.visibility = "visible";
    }
    if (allValid) {
      passDoesNotMatchMessage.style.visibility = "hidden";
      currentStep += incrementor;
      showCurrentStep();
    }
  } else if (e.target.matches("[data-pre]")) {
    incrementor = -1;
    currentStep += incrementor;
    showCurrentStep();
  }

  if (incrementor === undefined) return;
});

// animation control
formSteps.forEach((step) => {
  step.addEventListener("animationend", (e) => {
    formSteps[currentStep].classList.remove("hide");
    e.target.classList.toggle("hide", !e.target.classList.contains("active"));
  });
});

function showCurrentStep() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });
}

//loader
const prealoder = document.getElementById("preloader");
window.addEventListener("load", () => {
  prealoder.style.display = "none";
  document.body.style.overflow = "auto";
});
