const account = getCurrentAccount();
const message = document.querySelector("#account-message");
const accountTitle = document.querySelector("#account-title");
const addressForm = document.querySelector("#address-form");
const postalCodeInput = document.querySelector("#postal-code");
const lookupStatus = document.querySelector("#address-lookup-status");
const saveStatus = document.querySelector("#address-save-status");
let lookupController = null;
let lastRequestedPostalCode = "";

function setAddressStatus(element, key = "") {
  if (key) {
    element.dataset.i18n = key;
    element.textContent = siteText(key);
  } else {
    delete element.dataset.i18n;
    element.textContent = "";
  }
}

if (!account) {
  window.location.replace("../login/login.html");
} else {
  accountTitle.dataset.i18nName = account.name || account.email;
  document.querySelector("#account-email").textContent = account.email;
  if (account.address) {
    Object.entries(account.address).forEach(([field, value]) => {
      const input = addressForm.elements.namedItem(field);
      if (input) input.value = value || "";
    });
  }
  // Reapply the current language now that the personalized welcome name is available.
  applySiteLanguage(getSiteLanguage());
}

postalCodeInput.addEventListener("input", () => {
  const digits = postalCodeInput.value.replace(/\D/g, "").slice(0, 8); // removed everything but digits
  postalCodeInput.value = digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;

  if (digits.length === 8 && digits !== lastRequestedPostalCode) {
    lastRequestedPostalCode = digits;
    lookupAddress(digits);
  } else if (digits.length < 8) {
    lastRequestedPostalCode = "";
    lookupController?.abort();
    setAddressStatus(lookupStatus);
  }
});

async function lookupAddress(postalCode) {
  lookupController?.abort();
  lookupController = new AbortController();
  setAddressStatus(lookupStatus, "account.addressLookup");

  try {
    const response = await fetch(`https://viacep.com.br/ws/${postalCode}/json/`, { signal: lookupController.signal });
    if (!response.ok) throw new Error("lookup-failed");
    const addressData = await response.json();
    if (addressData.erro) {
      setAddressStatus(lookupStatus, "account.addressNotFound");
      return;
    }

    addressForm.elements.street.value = addressData.logradouro || "";
    addressForm.elements.neighborhood.value = addressData.bairro || "";
    addressForm.elements.city.value = addressData.localidade || "";
    addressForm.elements.state.value = addressData.uf || "";
    if (!addressForm.elements.complement.value) addressForm.elements.complement.value = addressData.complemento || "";
    setAddressStatus(lookupStatus, "account.addressFound");
    addressForm.elements.number.focus();
  } catch (error) {
    if (error.name !== "AbortError") setAddressStatus(lookupStatus, "account.addressError");
  }
}

addressForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const address = Object.fromEntries(new FormData(addressForm).entries());
  address.postalCode = address.postalCode.replace(/\D/g, "");
  address.state = address.state.trim().toUpperCase();

  try {
    saveCurrentAccountAddress(address);
    setAddressStatus(saveStatus, "account.addressSaved");
  } catch {
    setAddressStatus(saveStatus, "account.addressSaveError");
  }
});

document.querySelector("#sign-out").addEventListener("click", () => {
  signOut();
  message.dataset.i18n = "account.signedOut";
  message.textContent = siteText("account.signedOut");
  window.setTimeout(() => window.location.href = "../login/login.html", 500);
});

