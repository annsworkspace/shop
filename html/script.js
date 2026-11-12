const productsContainer = document.querySelector("#products");
const productMessage = document.querySelector("#product-message");
// Bad or stale saved JSON should not stop the storefront from loading.
const savedCart = readSavedList("belle-cart");
const savedWishlist = readSavedList("belle-wishlist");
let allProducts = [];
let activeFilter = "all";
let productLoadFailed = false;
let productsLoaded = false;

function readSavedList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function addProductToList(product, listName) {
  const list = listName === "cart" ? savedCart : savedWishlist;
  const existingItem = list.find((item) => item.id === product.id);
  if (listName === "cart" && existingItem) {
    existingItem.quantity = (Number(existingItem.quantity) || 1) + 1;
  } else if (!existingItem) {
    list.push(listName === "cart" ? { ...product, quantity: 1 } : product);
  }
  localStorage.setItem(`belle-${listName}`, JSON.stringify(list));
  const countLabel = siteText(list.length === 1 ? "home.item" : "home.items");
  productMessage.textContent = listName === "cart"
    ? siteText("home.addedCart", { title: product.title, count: list.length, label: countLabel })
    : siteText("home.addedWishlist", { title: product.title, count: list.length, label: countLabel });
  showSiteToast(listName === "cart" ? "toast.cartAdded" : "toast.wishlistAdded", { title: product.title });
}

function renderProducts(products) {
  productsContainer.replaceChildren();

  if (products.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "empty-state";
    emptyState.textContent = siteText("home.empty");
    productsContainer.append(emptyState);
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.title;
    image.loading = "lazy";

    const title = document.createElement("h2");
    title.textContent = product.title;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = `$${product.price.toFixed(2)}`;

    const description = document.createElement("p");
    description.textContent = product.description;

    const actions = document.createElement("div");
    actions.className = "product-actions";
    ["cart", "wishlist"].forEach((listName) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.status = listName;
      const labelKey = listName === "cart" ? "home.addCart" : "home.addWishlist";
      button.textContent = siteText(labelKey);
      button.addEventListener("click", () => addProductToList(product, listName));
      actions.append(button);

      button.textContent = listName === "cart"
        ? `🛒 ${siteText("home.addCart")}`
        : `♡ ${siteText("home.addWishlist")}`;
    });

    card.append(image, title, price, description, actions);
    productsContainer.append(card);
  });
}

async function loadProducts() {
  try {
    productLoadFailed = false;
    const response = await fetch("https://fakestoreapi.com/products"); // works synchronously until this point
    if (!response.ok) throw new Error(`Request failed (${response.status})`);  
    //checks if http response status code is outside successful range and if not will throw error
    allProducts = await response.json(); //incoming raw response body 
    if (!Array.isArray(allProducts)) throw new Error("Unexpected product response"); 
    productsLoaded = true;
    renderFilteredProducts();
  } catch (error) {
    productLoadFailed = true;
    productMessage.textContent = siteText("home.loadError");
    productsContainer.replaceChildren();
    const retry = document.createElement("button");
    retry.className = "retry-button";
    retry.type = "button";
    retry.textContent = siteText("home.retry");
    retry.addEventListener("click", loadProducts);
    productsContainer.append(retry);
    console.error("Product API error:", error);
  }
}

function renderFilteredProducts() {
  // The selected button's data-filter matches each product.category value.
  const filtered = activeFilter === "all"
    ? allProducts
    : allProducts.filter((product) => product.category === activeFilter);
  renderProducts(filtered);
  productMessage.textContent = siteText("home.loaded", {
    count: filtered.length,
    label: siteText(filtered.length === 1 ? "home.item" : "home.items")
  });
}

// Rebuild dynamic text when the shared account toggle changes the language.
document.addEventListener("site-language-change", () => {
  if (productLoadFailed) {
    productMessage.textContent = siteText("home.loadError");
    const retry = productsContainer.querySelector(".retry-button");
    if (retry) retry.textContent = siteText("home.retry");
  } else if (productsLoaded) {
    renderFilteredProducts();
  }
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  // Mark the selected category for both styling and screen-reader state.
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    if (productsLoaded) renderFilteredProducts();
  });
});

loadProducts();

