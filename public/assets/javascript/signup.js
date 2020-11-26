const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmEl = document.querySelector("#confirm");
const numberEl = document.querySelector("#number");

// check required function
function checkRequired(inputEl) {
  inputEl.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// show success function
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
  const small = formControl.querySelector("small");
  small.innerText = "";
}

// function for showing error
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// get field name function
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// check length function
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be atleast of ${min} characters.`
    );
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be below ${max} characters.`);
  } else {
    showSuccess(input);
  }
}

// check email
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim() === "")) {
    showError(input, "Email is not valid");
  }
}

// confirm password function
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password didn't match");
  }
}

function checkNum(input) {
  if (numberEl.value.length === 0) {
    showError(input, `${getFieldName(input)} is required.`);
  } else if (numberEl.value.length < 10 || numberEl.value.length > 10) {
    showError(input, `${getFieldName(input)} length must be 10`);
  } else {
    showSuccess(input);
  }
}

// Event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, password, email, confirmEl]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkNum(numberEl);
  checkPasswordsMatch(password, confirmEl);
});
