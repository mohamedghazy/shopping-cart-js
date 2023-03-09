const prodcuts = [
  {
    id: 1,
    name: "first Product",
    price: 20,
    added_to_cart: false,
    product_imge: "./product1.jpg",
  },
  {
    id: 2,
    name: "Second Product",
    price: 30,
    added_to_cart: false,
    product_imge: "./product2.jpg",
  },
  {
    id: 3,
    name: "Third Product",
    price: 40,
    added_to_cart: false,
    product_imge: "./product3.jpg",
  },
  {
    id: 4,
    name: "Fourth Product",
    price: 50,
    added_to_cart: false,
    product_imge: "./product4.jpg",
  },
  {
    id: 5,
    name: "Fiveth Product",
    price: 60,
    added_to_cart: false,
    product_imge: "./product5.jpg",
  },
  {
    id: 6,
    name: "sixth Product",
    price: 70,
    added_to_cart: false,
    product_imge: "./product6.jpg",
  },
];
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
console.log("cartitems", cartItems);
// cart
let cartIcon = document.querySelector(".cart_icon");
let cart = document.querySelector(".cart");
let cartClose = document.querySelector("#close_img");
let cartContainer = document.getElementById("cart_items");
const removeFromCarttage = ` <button class="cart_remove" onclick=removeFromCart()>Remove from cart</button>`;

// open and close cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};
cartClose.onclick = () => {
  cart.classList.remove("active");
};

// cart item
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
/**
 * rendering the content and add events to buttons when the DOMM is loaded
 *
 */

function ready() {
  //rendering the products list
  rendering();

  // adding add to cart functionality to Add to cart Button
  const addToCartBtns = document.querySelectorAll(".add_to_cart");
  for (let i = 0; i < addToCartBtns.length; i++) {
    let cartBtn = addToCartBtns[i];
    cartBtn.addEventListener("click", addToCart);
  }
  // adding quick view event to quick view button
  const quickViewbtns = document.querySelectorAll(".quick");
  for (let q = 0; q < quickViewbtns.length; q++) {
    let quickBtn = quickViewbtns[q];
    quickBtn.addEventListener("click", quickViewModal);
  }
  // render the cart items if there is items in the cartItema array
  if (cartItems.length === 0) {
    cartContainer.innerHTML = `<h4 >There is no items </h4>`;
  } else {
    cartItemsRendering(cartItems);
  }
}

/**
 * rendering a list of products
 */
function rendering() {
  document.getElementById("products").innerHTML = prodcuts.map((item) => {
    return `
  <div class="product-container" id=${item.id}>
  <div class="product-image-wrapper">
  <img src=${item.product_imge} alt="Avatar" width="100%" class="product-image">
  </div>
  <div class="product-info-container">
    <h2 class="product_name">${item.name}</h2>
    <h3 class="product_price">${item.price}$</h3>
    <div class="btn_container" id=${item.id}>
      <button class="add_to_cart"  >Add to cart</button>
      <button class="quick" >Quick view</button>
    </div>
    </div>
    </div>
`;
  });
}
/**
 * rendering the cart items
 */
function cartItemsRendering(items = []) {
  let total = 0;
  cartContainer.innerHTML = items
    .map((item) => {
      total += parseInt(item?.price);
      return `
    <div class="cart_item" id=${item.id}>
              <img src=${item.product_imge} width="100px" alt="" class="cart_img" />
              <div class="item_details">
                <div class="item_name">${item.name}</div>
                <div class="item_price">${item.price}</div>
              </div>
              <img src="./trash.png" alt="remove" class="cart_remove" /> 
    </div>
            
    `;
    })
    .join("");

  //  adding remove from cart fuctionality to remove from cart button
  const removeFromCartBtns = document.querySelectorAll(".cart_remove");
  for (let r = 0; r < removeFromCartBtns.length; r++) {
    let removeBtn = removeFromCartBtns[r];
    removeBtn.addEventListener("click", removeFromCart);
  }
  // calcualte the total price
  document.getElementById("total").innerHTML = `
  <div class="totalt_price">${total} $</div>
  
  `;
}

/**
 * Quick View Modal function
 */
function quickViewModal(e) {
  let button = e?.target;
  let product = button?.parentElement?.parentElement?.parentElement;
  let productTitle =
    product?.getElementsByClassName("product_name")[0]?.innerText;
  let productPrice =
    product?.getElementsByClassName("product_price")[0]?.innerText;
  let productImage = product?.getElementsByClassName("product-image")[0]?.src;
  document.getElementById("modal").innerHTML = `
  <div class="modal" id=${product?.id}>
  <div class="product-image-wrapper">
  <img src=${productImage} alt="Avatar" width="100%" class="product-image">
  </div>
  <div class="product-info-container">
    <h2 class="product_name">${productTitle}</h2>
    <h3 class="product_price">${productPrice}</h3>
    <div class="btn_container" id=${product?.id}>
      <button class="add_to_cart">Add to cart</button>
      <button class="cancele">Cancele</button>
    </div>
    </div>
    </div>
 `;
  document
    .querySelectorAll(".quick_view_container")[0]
    ?.classList?.add("active");
  document.querySelectorAll(".cancele")[0]?.addEventListener("click", () => {
    document
      .querySelectorAll(".quick_view_container")[0]
      ?.classList?.remove("active");
  });
  document
    .querySelectorAll(".add_to_cart")[0]
    .addEventListener("click", addToCart);
}

/**
 * add to cart function
 */
var addToCart = (e) => {
  let button = e?.target;
  let product = button?.parentElement?.parentElement?.parentElement;
  let productTitle =
    product?.getElementsByClassName("product_name")[0]?.innerText;
  let productPrice =
    product?.getElementsByClassName("product_price")[0]?.innerText;
  let productImage = product?.getElementsByClassName("product-image")[0]?.src;
  let cartproduct = {
    id: product?.id,
    name: productTitle,
    price: productPrice,
    added_to_cart: true,
    product_imge: productImage,
  };
  cartItems.push(cartproduct);
  cartItemsRendering(cartItems);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  const addToCartButton = product?.getElementsByClassName("add_to_cart")[0];
  const removButton = document.createElement("button");

  removButton.classList.add("cart_remove");
  removButton.textContent = "Remove from cart";
  addToCartButton?.replaceWith(removButton);
  removButton.addEventListener("click", (e) => {
    removeFromCart(e);
    removButton.replaceWith(addToCartButton);
  });
};

/**
 *remove from cart function
 */
var removeFromCart = (e) => {
  let button = e?.target;
  const newList = cartItems.filter(
    (item) => item?.id !== button?.parentElement?.id
  );
  cartItems = newList;
  localStorage.setItem("cart", JSON.stringify(newList));
  cartItemsRendering(newList);
};
