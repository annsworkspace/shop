const listPage = document.querySelector("[data-list-page]");
const listType = listPage.dataset.listPage;
const storageKey = `belle-${listType}`;
const emptyMessage = document.querySelector("#list-empty");
const listContent = document.querySelector("#list-content");
const listContainer = document.querySelector("#list-items");
const countMessage = document.querySelector("#list-count");
const subtotalMessage = document.querySelector("#list-subtotal");

function readList() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(saved)
      ? saved.map((item) => ({ ...item, quantity: Math.max(1, Number(item.quantity) || 1) }))
      : [];
  } catch {
    return [];
  }
}

let items = readList();

function saveList() {
  localStorage.setItem(storageKey, JSON.stringify(items));
}

function formatPrice(amount) {
  const locale = getSiteLanguage() === "pt" ? "pt-BR" : "en-US";
  return new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }).format(amount);
}

function renderList() {
  const isEmpty = items.length === 0;
  emptyMessage.hidden = !isEmpty;
  listContent.hidden = isEmpty;
  listContainer.replaceChildren();

  if (isEmpty) return;

  const quantityTotal = items.reduce((total, item) => total + item.quantity, 0);
  countMessage.textContent = siteText(quantityTotal === 1 ? "list.item" : "list.items", { count: quantityTotal });

  if (listType === "cart") {
    const subtotal = items.reduce((total, item) => total + Number(item.price || 0) * item.quantity, 0);
    subtotalMessage.hidden = false;
    subtotalMessage.textContent = `${siteText("cart.subtotal")}: ${formatPrice(subtotal)}`;
  }

  items.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = listType === "cart" ? "cart-card" : "wishlist-card";

    const image = document.createElement("img");
    image.src = item.image || "";
    image.alt = item.title || "";
    image.loading = "lazy";

    const title = document.createElement("h2");
    title.textContent = item.title || "Product";

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = formatPrice(Number(item.price) || 0);
    const details = document.createElement("div");
    details.className = "list-item-details";
    details.append(title, price);
    const actions = document.createElement("div");
    actions.className = "list-item-actions";

    if (listType === "cart") {
      const quantityControls = document.createElement("div");
      quantityControls.className = "quantity-control";

      const decrease = document.createElement("button");
      decrease.type = "button";
      decrease.textContent = "−";
      decrease.setAttribute("aria-label", siteText("list.decrease"));
      decrease.addEventListener("click", () => changeQuantity(index, -1));

      const quantity = document.createElement("span");
      quantity.textContent = siteText("list.quantity", { count: item.quantity });

      const increase = document.createElement("button");
      increase.type = "button";
      increase.textContent = "+";
      increase.setAttribute("aria-label", siteText("list.increase"));
      increase.addEventListener("click", () => changeQuantity(index, 1));
      quantityControls.append(decrease, quantity, increase);
      actions.append(quantityControls);
    }

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-item";
    remove.textContent = siteText("list.remove");
    remove.addEventListener("click", () => removeItem(index));
    actions.append(remove);
    card.append(image, details, actions);
    listContainer.append(card);
  });
}

function changeQuantity(index, difference) {
  items[index].quantity += difference;
  if (items[index].quantity < 1) items.splice(index, 1);
  saveList();
  renderList();
}

function removeItem(index) {
  items.splice(index, 1);
  saveList();
  renderList();
  showSiteToast("toast.itemRemoved");
}

document.addEventListener("site-language-change", renderList);
window.addEventListener("storage", (event) => {
  if (event.key === storageKey) {
    items = readList();
    renderList();
  }
});

renderList();
