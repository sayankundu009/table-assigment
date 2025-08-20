const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 99.99,
    image: "https://picsum.photos/200/100?random=1",
  },
  {
    id: 2,
    name: "Smartphone Case",
    description: "Durable protective case for smartphones.",
    price: 24.99,
    image: "https://picsum.photos/200/100?random=2",
  },
  {
    id: 3,
    name: "Laptop Stand",
    description: "Adjustable aluminum laptop stand for better ergonomics.",
    price: 49.99,
    image: "https://picsum.photos/200/100?random=3",
  },
  {
    id: 4,
    name: "USB-C Cable",
    description: "Fast charging USB-C cable, 6ft length.",
    price: 12.99,
    image: "https://picsum.photos/200/100?random=4",
  },
  {
    id: 5,
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with precision tracking.",
    price: 34.99,
    image: "https://picsum.photos/200/100?random=5",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 20W output.",
    price: 79.99,
    image: "https://picsum.photos/200/100?random=6",
  },
  {
    id: 7,
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with Cherry MX switches.",
    price: 129.99,
    image: "https://picsum.photos/200/100?random=7",
  },
  {
    id: 8,
    name: "Webcam",
    description: "1080p HD webcam with built-in microphone.",
    price: 59.99,
    image: "https://picsum.photos/200/100?random=8",
  },
];

const coupons = [
  {
    key: "SAVE10",
    discount: 10,
  },
  {
    key: "WELCOME20",
    discount: 20,
  },
  {
    key: "FREESHIP",
    discount: null,
  },
];

const productPage = document.getElementById("product"),
  cartPage = document.getElementById("cart"),
  checkoutPage = document.getElementById("checkout"),
  backToProduct = document.getElementById("back_to_product"),
  toCart = document.getElementById("to_cart"),
  toCheckout = document.getElementById("to_checkout"),
  backToCart = document.getElementById("back_to_cart"),
  productDisplay = document.getElementById("product_display"),
  searchButton = document.getElementById("search_button"),
  searchField = document.getElementById("search_field"),
  cartCount = document.getElementById("cart_count"),
  cartContent = document.getElementById("cart_content"),
  discount = document.getElementById("discount"),
  subtotal = document.getElementById("subtotal"),
  tax = document.getElementById("tax"),
  shipping = document.getElementById("shipping"),
  total = document.getElementById("total"),
  subtotalCheckout = document.getElementById("subtotal-checkout"),
  discountCheckout = document.getElementById("discount-checkout"),
  taxCheckout = document.getElementById("tax-checkout"),
  totalCheckout = document.getElementById("total-checkout"),
  shippingCheckout = document.getElementById("shipping-checkout"),
  couponCheck = document.getElementById("couponCode"),
  couponCheckButton = document.getElementById("couponCodeButton"),
  couponSection = document.getElementById("coupon-section"),
  orderSummary = {
    subtotal: 0,
    shipping: 50,
    tax: 0,
    discount: 0.00
  },
  firstName = document.getElementById("firstName"),
  lastName = document.getElementById("lastName"),
  email = document.getElementById("email"),
  address = document.getElementById("address"),
  city = document.getElementById("city"),
  state = document.getElementById("state"),
  zip = document.getElementById("zip"),
  checkoutForm = document.getElementById("checkout-form"),
  fNameError = document.getElementById("fname-error"),
  lNameError = document.getElementById("lname-error"),
  emailError = document.getElementById("email-error"),
  addressError = document.getElementById("address-error"),
  cityError = document.getElementById("city-error"),
  stateError = document.getElementById("state-error"),
  zipError = document.getElementById("zip-error");

toCart.addEventListener("click", () => {
  productPage.classList.toggle("hidden");
  cartPage.classList.toggle("hidden");
  if(cart.length === 0)
    couponCheck.setAttribute('disabled', '');
});

toCheckout.addEventListener("click", () => {
  checkoutPage.classList.toggle("hidden");
  cartPage.classList.toggle("hidden");
});

backToProduct.addEventListener("click", () => {
  productPage.classList.toggle("hidden");
  cartPage.classList.toggle("hidden");
});

backToCart.addEventListener("click", () => {
  checkoutPage.classList.toggle("hidden");
  cartPage.classList.toggle("hidden");
});

function renderProducts(data) {
  productDisplay.innerHTML = "";
  data.forEach((item) => {
    productDisplay.innerHTML += `<div class="col">
                                        <div class="card h-100">
                                            <img src="https://picsum.photos/200/100" class="card-img-top" alt="Product 1">
                                            <div class="card-body">
                                                <h5 class="card-title"> ${item.name}</h5>
                                                <p class="card-text"> ${item.description}</p>
                                                <p class="card-text"> ₹<strong>${item.price}</strong></p>
                                                <button class="btn btn-primary add_to_cart" data-id="${item.id}">Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>`;
  });
  attachCartListeners();
}

function searchFilter() {
  const searched = searchField.value.toLowerCase();
  const result = products.filter((item) => {
    if (item.name.toLowerCase().match(searched)) return true;
  });
  renderProducts(result);
}

function renderCart(data) {
  cartContent.innerHTML = "";
  let subtotalValue = 0;
  data.forEach((item) => {
    const row = document.createElement("tr");
    subtotalValue += item.price;
    row.innerHTML = `<td> ${item.name}</td>
                        <td>₹ ${item.price}</td>
                        <td>
                            <input type="number" class="form-control" style="width: 80px;" value="1" min="1">
                        </td>
                        <td class = "itemTotal">₹ ${item.price}</td>
                        <td>
                            <button class="btn btn-danger btn-sm delete" data-id="${item.id}">Remove</button>
                        </td>`;
    cartContent.appendChild(row);
    const input = row.querySelector("input");
    const itemTotal = row.querySelector(".itemTotal");
    input.addEventListener("input", () => {
      itemTotal.innerHTML = `₹ ${(item.price * input.value).toFixed(2)}`;
      updateSubtotal();
    });

    const remove = row.querySelector(".delete");
    remove.addEventListener("click", () => {
      const deletionIndex = cart.findIndex((cartItem) => cartItem.id === item.id );
      if (deletionIndex !== -1) cart.splice(deletionIndex, 1);
      row.remove();
      cartCount.innerHTML = cart.length;
      updateSubtotal();
      if(cart.length === 0){
        subtotal.innerHTML = subtotalCheckout.innerHTML = discount.innerHTML = tax.innerHTML = shipping.innerHTML = total.innerHTML = discountCheckout.innerHTML = taxCheckout.innerHTML = totalCheckout.innerHTML = shippingCheckout.innerHTML = "";
        couponCheck.setAttribute('disabled', '');
      }
    });
  });
  updateSubtotal();
}

function discountcalculator() {
  let discountValue = 0;
  coupons.forEach((items) => {
    if (items.key === couponCheck.value) {
      discountValue = items.discount;
      orderSummary.discount = orderSummary.subtotal * discountValue * 0.01;
      couponCheck.classList.toggle("hidden");
      couponCheckButton.classList.toggle("hidden");
      const couponDisplay = document.createElement("div");
      const couponApplied = document.createElement("span");
      const applied = document.createElement("span");
      const cancel = document.createElement("button");
      couponDisplay.style.display = "flex";
      couponDisplay.style.justifyContent = "space-around";
      couponDisplay.style.color = "rgba(46, 188, 67, 1)";
      cancel.innerHTML = `Cancel`;
      couponApplied.innerHTML = `${couponCheck.value}`;
      couponDisplay.appendChild(couponApplied);
      couponDisplay.appendChild(applied);
      couponDisplay.appendChild(cancel);
      couponSection.appendChild(couponDisplay);
      cancel.style.backgroundColor = "white";
      cancel.style.border = "none";
      cancel.style.textDecoration = "underline";
      cancel.style.textUnderlineOffset = "0.3rem";
      applied.innerHTML = `(Applied)`;
      cancel.addEventListener("click", () => {
        orderSummary.discount = 0;
        updateSubtotal();
        couponCheck.classList.toggle("hidden");
        couponCheckButton.classList.toggle("hidden");
        couponDisplay.remove();
      })
      var defaults = { //Confetti
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
      };

      function shoot() {
        confetti({
          ...defaults,
          particleCount: 40,
          scalar: 1.2,
          shapes: ["star"],
        });

        confetti({
          ...defaults,
          particleCount: 10,
          scalar: 0.75,
          shapes: ["circle"],
        });
      }

      setTimeout(shoot, 0);
      setTimeout(shoot, 100);
      setTimeout(shoot, 200);
    }
  });
  if(discountValue === 0){
    couponCheck.style.color = "rgba(231, 80, 80, 1)";
    const error = document.createElement("span");
    error.innerHTML = `The coupon is invalid`;
    error.style.color = "rgba(231, 82, 82, 1)";
    couponSection.append(error);
    setTimeout(() => { error.remove();  couponCheck.value = ""}, 2000);
  }
  else if(discountValue === null){
    shipping.innerHTML = `<strong>FREE</strong>`;
    if (orderSummary.subtotal < 500)
      total.innerHTML = `<strong> ₹ ${orderSummary.subtotal + orderSummary.tax} </strong>`;
      totalCheckout.innerHTML = total.innerHTML;
  }
  else{
    discount.innerHTML = `- ₹ ${orderSummary.discount.toFixed(2)}`;
    discountCheckout.innerHTML = discount.innerHTML;
    total.innerHTML =  `<strong> ₹ ${(orderSummary.subtotal + orderSummary.tax + orderSummary.shipping - orderSummary.discount).toFixed(2)} </strong>`;
    totalCheckout.innerHTML = total.innerHTML;
  }
}

function updateSubtotal() {
  const allTotal = document.querySelectorAll(".itemTotal");
  orderSummary.subtotal = 0;
  allTotal.forEach((items) => {
    orderSummary.subtotal += parseFloat(items.innerText.replace(/[^\d.]/g, ""));
  });
  subtotal.innerHTML = `₹ ${(orderSummary.subtotal).toFixed(2)}`;
  subtotalCheckout.innerHTML = subtotal.innerHTML;
  discount.innerHTML = `- ₹ ${orderSummary.discount}.00`;
  discountCheckout.innerHTML = discount.innerHTML;
  orderSummary.tax = parseFloat((orderSummary.subtotal * 0.085).toFixed(2));
  tax.innerHTML = `₹ ${orderSummary.tax}`;
  taxCheckout.innerHTML = tax.innerHTML;
  if (orderSummary.subtotal >= 500) {
    shipping.innerHTML = `<strong>FREE</strong>`;
    total.innerHTML = `<strong> ₹ ${orderSummary.subtotal + orderSummary.tax} </strong>`;
  } else {
    shipping.innerHTML = `₹ ${orderSummary.shipping}`;
    total.innerHTML = `<strong> ₹ ${(orderSummary.subtotal + orderSummary.tax + orderSummary.shipping).toFixed(2)} </strong>`;
  }
  totalCheckout.innerHTML = total.innerHTML;
  shippingCheckout.innerHTML = shipping.innerHTML;
}

couponCheck.addEventListener("keydown", (event) => {
  if (event.key === "Enter") discountcalculator();
});

couponCheckButton.addEventListener("click", () => {
  discountcalculator();
});

renderProducts(products);

searchButton.addEventListener("click", () => {
  searchFilter();
});

searchField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchFilter();
  }
});

let cart = [];
function attachCartListeners() {
  const buttonArray = document.querySelectorAll(".add_to_cart");
  buttonArray.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id;
      const item = products.find((item) => item.id == productId);
      if (item && !cart.find((collection) => collection.id === item.id)) {
        cart.push(item);
      }
      cartCount.innerHTML = cart.length;
      couponCheck.removeAttribute('disabled');
      renderCart(cart);
    });
  });
}

checkoutForm.addEventListener("submit", (event) =>{
  event.preventDefault();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if( firstName.value.trim() === ""){
    fNameError.classList.toggle("hidden");
    setTimeout(() => {fNameError.classList.toggle("hidden")}, 2000);
  }
  if( lastName.value.trim() === ""){
    lNameError.classList.toggle("hidden");
    setTimeout(() => {lNameError.classList.toggle("hidden")}, 2000);
  }
  if( !emailRegex.test(email.value)){
    emailError.classList.toggle("hidden");
    setTimeout(() => {emailError.classList.toggle("hidden")}, 2000);
  }
  if( address.value.trim() === ""){
    addressError.classList.toggle("hidden");
    setTimeout(() => {addressError.classList.toggle("hidden")}, 2000);
  }
  if( city.value.trim() === ""){
    cityError.classList.toggle("hidden");
    setTimeout(() => {cityError.classList.toggle("hidden")}, 2000);
  }
  if( state.value.trim() === ""){
    stateError.classList.toggle("hidden");
    setTimeout(() => {stateError.classList.toggle("hidden")}, 2000);
  }
  if( !(parseInt(zip.value) / 100000 > 1 && parseInt(zip.value) / 100000 < 10)){
    zipError.classList.toggle("hidden");
    setTimeout(() => {zipError.classList.toggle("hidden")}, 2000);
  }
})