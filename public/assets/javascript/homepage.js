const burger = document.getElementById("burger");
const hiddenNav = document.getElementById("hidden-nav");
const closeBtn = document.getElementById("close");
const link1 = document.getElementById("link-1");
const link2 = document.getElementById("link-2");
const link3 = document.getElementById("link-3");
const result1 = document.getElementById("result-1");
const result2 = document.getElementById("result-2");
const result3 = document.getElementById("result-3");
const slide = document.querySelector(".s1");
const liEl = document.querySelectorAll(".hidden li");

burger.addEventListener("click", () => {
  hiddenNav.classList.add("show-hidden");
});
liEl.forEach((li) => {
  li.addEventListener("click", () => {
    hiddenNav.classList.remove("show-hidden");
  });
});

closeBtn.addEventListener("click", () => {
  hiddenNav.classList.remove("show-hidden");
});

link1.addEventListener("click", () => {
  result2.classList.remove("show-result");
  result3.classList.remove("show-result");
  result1.classList.add("show-result");
  link1.classList.add("blue");
  link2.classList.remove("blue");
  link3.classList.remove("blue");
});
link2.addEventListener("click", () => {
  result1.classList.remove("show-result");
  result3.classList.remove("show-result");
  result2.classList.add("show-result");
  link2.classList.add("blue");
  link1.classList.remove("blue");
  link3.classList.remove("blue");
});
link3.addEventListener("click", () => {
  result1.classList.remove("show-result");
  result2.classList.remove("show-result");
  result3.classList.add("show-result");
  link3.classList.add("blue");
  link1.classList.remove("blue");
  link2.classList.remove("blue");
});

let margin = -20;

function slider() {
  slide.style.marginLeft = margin + "%";
  margin += -20;
  if (margin === -100) {
    margin = 0;
  }
}

setInterval(slider, 4000);
