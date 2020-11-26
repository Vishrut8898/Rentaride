// login page-------------------------------------------
const form_2 = document.querySelector("#form-2");
const username_2 = document.querySelector("#username-2");
const password_2 = document.querySelector("#password-2");

// check required function
function checkRequired_2(inputEl_2) {
  inputEl_2.forEach((input_2) => {
    if (input_2.value.trim() === "") {
      showError_2(input_2, `${getFieldName_2(input_2)} is required`);
    } else {
      showSuccess_2(input_2);
    }
  });
}

// show success function
function showSuccess_2(input_2) {
  const formControl_2 = input_2.parentElement;
  formControl_2.className = "form-control-2 success-2";
  const small = formControl_2.querySelector("small");
  small.innerText = "";
}

// function for showing error
function showError_2(input_2, message_2) {
  const formControl_2 = input_2.parentElement;
  formControl_2.className = "form-control-2 error-2";
  const small = formControl_2.querySelector("small");
  small.innerText = message_2;
}

// get field name function
function getFieldName_2(input_2) {
  return input_2.id.charAt(0).toUpperCase() + input_2.id.slice(1, -2);
}

// check length function
function checkLength_2(input_2, min_2, max_2) {
  if (input_2.value.length < min_2) {
    showError_2(
      input_2,
      `${getFieldName_2(input_2)} must be atleast of ${min_2} characters.`
    );
  } else if (input_2.value.length > max_2) {
    showError(
      input_2,
      `${getFieldName_2(input_2)} must be below ${max_2} characters.`
    );
  } else {
    showSuccess_2(input_2);
  }
}

form_2.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired_2([username_2, password_2]);
  checkLength_2(username_2, 3, 15);
  checkLength_2(password_2, 6, 25);
});

const formControl_2 = document.querySelectorAll(".form-control-2");

form_2.addEventListener("submit", () => {
  if (
    formControl_2[0].className === "form-control-2 success-2" &&
    formControl_2[1].className === "form-control-2 success-2"
  ) {
    window.location = "http://www.google.com";
  }
});

console.log(localStorage.getItem("textvalue"));
