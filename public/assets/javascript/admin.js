const doneBtn = document.querySelectorAll(".done");
const removeBtn = document.querySelectorAll(".remove");

doneBtn.forEach((done) => {
  done.addEventListener("click", () => {
    done.style.display = "none";
    const orderBox = done.parentElement;
    const removeBtn = orderBox.querySelector(".remove");
    removeBtn.style.display = "initial";
  });
});

removeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const orderBox = btn.parentElement;
    orderBox.style.display = "none";
  });
});
