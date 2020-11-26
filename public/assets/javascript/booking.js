const mileSelect = document.querySelectorAll(".kilo");
const hiddenNav = document.getElementById("aside");
const burger = document.getElementById("burger");
const priceElements = document.querySelectorAll(".price");
const bookNow = document.querySelectorAll(".book-now");
const pickDate = document.querySelector(".pick-up-date");
const dropDate = document.querySelector(".drop-off-date");
const dropPlace = document.querySelector("#start-name");
const returnPlace = document.querySelector("#return-name");
const amount = 3000;

pickDate.innerHTML = localStorage.getItem("pick_date");
dropDate.innerHTML = localStorage.getItem("drop_date");
dropPlace.innerHTML = localStorage.getItem("departPlace");
returnPlace.innerHTML = localStorage.getItem("returnPlace");

// selecting kilo elements
const kilo_1 = document.querySelector(".kilo-1");
const kilo_2 = document.querySelector(".kilo-2");
const kilo_3 = document.querySelector(".kilo-3");
const kilo_4 = document.querySelector(".kilo-4");
const kilo_5 = document.querySelector(".kilo-5");
const kilo_6 = document.querySelector(".kilo-6");
const kilo_7 = document.querySelector(".kilo-7");
const kilo_8 = document.querySelector(".kilo-8");
const kilo_9 = document.querySelector(".kilo-9");

// showing hidden aside
mileSelect.forEach((mile) => {
  mile.addEventListener("click", () => {
    for (var i = 0; i < mileSelect.length; i++) {
      mileSelect[i].classList.remove("orange");
    }
    mile.classList.add("orange");
    if (mile.classList.contains("orange")) {
      let selectedDistance = mile.innerHTML;
      localStorage.setItem("distance", selectedDistance);
    }
  });
});

// adding event listeners
burger.addEventListener("click", () => {
  hiddenNav.classList.toggle("show");
});

// price updata event listeners
kilo_1.addEventListener("click", () => {
  priceElements.forEach((price) => {
    price.innerHTML = amount * 1;
  });
});
kilo_2.addEventListener("click", () => {
  priceElements.forEach((price) => {
    price.innerHTML = amount * 2;
  });
});
kilo_3.addEventListener("click", () => {
  priceElements.forEach((price) => {
    price.innerHTML = amount * 3;
  });
});
kilo_4.addEventListener("click", () => {
  priceElements.forEach((price) => {
    price.innerHTML = amount * 4;
  });
});
kilo_5.addEventListener("click", () => {
  priceElements.forEach((price) => {
    price.innerHTML = amount * 5;
  });
});
kilo_6.addEventListener("click", () => {
  priceElements.forEach((price) => {
    price.innerHTML = amount * 6;
  });
});
kilo_7.addEventListener("click", () => {
  priceElements.forEach((price) => {
    price.innerHTML = amount * 7;
  });
});
kilo_8.addEventListener("click", () => {
  priceElements.forEach((price) => {
    price.innerHTML = amount * 8;
  });
});
kilo_9.addEventListener("click", () => {
  priceElements.forEach((price) => {
    price.innerHTML = amount * 9;
  });
});

// PRICE ELEMENTS CLICK EVENT
function loadFunction() {
  bookNow.forEach((book) => {
    book.addEventListener("click", () => {
      let block = book.parentElement.parentElement.parentElement;
      let carName = block.querySelector(".car-name").innerText;
      let seater = block.querySelector(".seater").innerHTML;
      let gear = block.querySelector(".gear").innerHTML;
      let mileage = block.querySelector(".mileage").innerHTML;
      let price = block.querySelector(".price").innerText;
      let image = block.querySelector("img").src;
      localStorage.setItem("carName", carName);
      localStorage.setItem("seater", seater);
      localStorage.setItem("gear", gear);
      localStorage.setItem("mileage", mileage);
      localStorage.setItem("price", price);
      localStorage.setItem("image", image);
    });
  });
}
loadFunction();
