let orderBox = document.querySelector(".order-box");
const pickDate = document.querySelectorAll(".pick-up-date");
const dropDate = document.querySelectorAll(".drop-off-date");
const dropPlace = document.querySelectorAll("#start-name");
const returnPlace = document.querySelectorAll("#return-name");
const close = document.querySelector(".close");
const popUp = document.querySelector(".pop-up");

pickDate.forEach((e) => {
  e.innerHTML = localStorage.getItem("pick_date");
});
dropDate.forEach((e) => {
  e.innerHTML = localStorage.getItem("drop_date");
});
dropPlace.forEach((e) => {
  e.innerHTML = localStorage.getItem("departPlace");
});
returnPlace.forEach((e) => {
  e.innerHTML = localStorage.getItem("returnPlace");
});

// function for getting order data
function orderData() {
  let carName = orderBox.querySelector(".car-name");
  let seater = orderBox.querySelector(".seater");
  let gear = orderBox.querySelector(".gear");
  let mileage = orderBox.querySelector(".mileage");
  let price = orderBox.querySelector(".price");
  let image = orderBox.querySelector("img");
  carName.innerText = localStorage.getItem("carName");
  seater.innerHTML = localStorage.getItem("seater");
  gear.innerHTML = localStorage.getItem("gear");
  mileage.innerHTML = localStorage.getItem("mileage");
  price.innerText = localStorage.getItem("price");
  image.src = localStorage.getItem("image");
}
orderData();

const distance = localStorage.getItem("distance");
const mileSelect = document.querySelectorAll(".kilo");

mileSelect.forEach((mile) => {
  mile.classList.remove("orange");
  if (mile.innerHTML === distance) {
    mile.classList.add("orange");
  }
});
