// Shared translations and language preference for every page in the shop.
(() => {
  const LANGUAGE_KEY = "checklist-language";
  const THEME_KEY = "checklist-theme";
  const translations = {
    en: {
      "home.title": "Belle & Co. | Shop",
      "home.tagline": "Thoughtful finds for every day",
      "home.profile": "Profile",
      "home.cart": "Shopping cart",
      "home.wishlist": "Wishlist",
      "home.categories": "Shop by category",
      "home.all": "All products",
      "home.women": "Women",
      "home.men": "Men",
      "home.electronics": "Electronics",
      "home.jewelry": "Jewelry",
      "home.kicker": "THE BELLE EDIT",
      "home.heroTitle": "A little lovely\ngoes a long way.",
      "home.heroDescription": "Everyday essentials and thoughtful finds, picked just for you.",
      "home.explore": "Explore the collection",
      "home.curated": "CURATED FOR YOU",
      "home.collection": "Shop the collection",
      "home.products": "Products",
      "home.loading": "Loading products…",
      "home.loaded": "{count} {label}",
      "home.item": "item",
      "home.items": "items",
      "home.empty": "No products in this category yet.",
      "home.loadError": "We couldn't load the collection. Please check your connection and try again.",
      "home.retry": "Try again",
      "home.addCart": "Add to cart",
      "home.addWishlist": "Add to wishlist",
      "home.addedCart": "{title} added to cart ({count} {label}).",
      "home.addedWishlist": "{title} added to wishlist ({count} {label}).",
      "toast.cartAdded": "{title} added to cart",
      "toast.wishlistAdded": "{title} added to wishlist",
      "toast.itemRemoved": "Item removed",
      "list.remove": "Remove",
      "list.decrease": "Decrease quantity",
      "list.increase": "Increase quantity",
      "list.quantity": "Quantity: {count}",
      "list.items": "{count} items",
      "list.item": "{count} item",
      "cart.subtotal": "Subtotal",
      "login.title": "Login | Belle & Co.",
      "login.heading": "Login",
      "login.intro": "Log in with your existing account.",
      "login.email": "Email",
      "login.password": "Password",
      "login.submit": "Log in",
      "login.noAccount": "Don't have an account yet?",
      "login.create": "Create account",
      "login.createHeading": "Create an account",
      "login.signupIntro": "Create your free account.",
      "login.name": "Name",
      "login.signupSubmit": "Create account",
      "login.hasAccount": "Already have an account?",
      "login.switchLogin": "Log in",
      "login.back": "Back to shop",
      "login.signingIn": "Signing in…",
      "login.creating": "Creating your account…",
      "login.error": "Something went wrong. Please try again.",
      "auth.secureUnavailable": "Secure password storage needs a modern browser on localhost or HTTPS.",
      "auth.duplicate": "An account with this email already exists. Please log in.",
      "auth.noAccount": "No account found for this email. Create an account first.",
      "auth.incorrectPassword": "Incorrect email or password.",
      "account.title": "My account | Belle & Co.",
      "account.back": "Back to shop",
      "account.label": "Your account",
      "account.welcome": "Welcome, {name}",
      "account.signOut": "Sign out",
      "account.preferences": "Preferences",
      "account.theme": "Theme",
      "account.language": "Language",
      "account.light": "Light",
      "account.dark": "Dark",
      "account.localNote": "This demo account is saved in this browser.",
      "account.signedOut": "You have signed out.",
      "account.chooseTheme": "Choose color theme",
      "account.chooseLanguage": "Choose language",
      "cart.title": "Shopping cart | Belle & Co.",
      "cart.heading": "Shopping cart",
      "cart.empty": "Your cart is empty.",
      "wishlist.title": "Wishlist | Belle & Co.",
      "wishlist.heading": "Wishlist",
      "wishlist.empty": "Your wishlist is empty.",
      "common.continueShopping": "Continue shopping",
      "footer.tagline": "Thoughtful finds for every day.",
      "footer.rights": "All rights reserved.",
      "account.addressTitle": "Delivery address",
      "account.postalCode": "ZIP / postal code",
      "account.street": "Street address",
      "account.number": "Number",
      "account.complement": "Complement (optional)",
      "account.neighborhood": "Neighborhood",
      "account.city": "City",
      "account.state": "State",
      "account.addressLookup": "Looking up address…",
      "account.addressFound": "Address found. Check the details and add your number.",
      "account.addressInvalid": "Enter a valid 8-digit Brazilian CEP.",
      "account.addressNotFound": "We couldn't find that CEP. Check the number and try again.",
      "account.addressError": "Address lookup failed. Try again in a moment.",
      "account.addressSaved": "Address saved to your account.",
      "account.addressSaveError": "Couldn't save the address. Please try again.",
      "account.saveAddress": "Save address"
    },
    pt: {
      "home.title": "Belle & Co. | Loja",
      "home.tagline": "Escolhas especiais para todos os dias",
      "home.profile": "Perfil",
      "home.cart": "Carrinho",
      "home.wishlist": "Lista de desejos",
      "home.categories": "Compre por categoria",
      "home.all": "Todos os produtos",
      "home.women": "Feminino",
      "home.men": "Masculino",
      "home.electronics": "Eletrônicos",
      "home.jewelry": "Joias",
      "home.kicker": "A SELEÇÃO BELLE",
      "home.heroTitle": "Pequenos encantos\npara todos os dias.",
      "home.heroDescription": "Essenciais e achados especiais, escolhidos para você.",
      "home.explore": "Explore a coleção",
      "home.curated": "ESCOLHIDOS PARA VOCÊ",
      "home.collection": "Conheça a coleção",
      "home.products": "Produtos",
      "home.loading": "Carregando produtos…",
      "home.loaded": "{count} {label}",
      "home.item": "item",
      "home.items": "itens",
      "home.empty": "Ainda não há produtos nesta categoria.",
      "home.loadError": "Não foi possível carregar a coleção. Verifique sua conexão e tente novamente.",
      "home.retry": "Tentar novamente",
      "home.addCart": "Adicionar ao carrinho",
      "home.addWishlist": "Adicionar à lista de desejos",
      "home.addedCart": "{title} adicionado ao carrinho ({count} {label}).",
      "home.addedWishlist": "{title} adicionado à lista de desejos ({count} {label}).",
      "toast.cartAdded": "{title} adicionado ao carrinho",
      "toast.wishlistAdded": "{title} adicionado à lista de desejos",
      "toast.itemRemoved": "Item removido",
      "list.remove": "Remover",
      "list.decrease": "Diminuir quantidade",
      "list.increase": "Aumentar quantidade",
      "list.quantity": "Quantidade: {count}",
      "list.items": "{count} itens",
      "list.item": "{count} item",
      "cart.subtotal": "Subtotal",
      "login.title": "Entrar | Belle & Co.",
      "login.heading": "Entrar",
      "login.intro": "Entre com sua conta.",
      "login.email": "E-mail",
      "login.password": "Senha",
      "login.submit": "Entrar",
      "login.noAccount": "Ainda não tem uma conta?",
      "login.create": "Criar conta",
      "login.createHeading": "Criar conta",
      "login.signupIntro": "Crie sua conta grátis.",
      "login.name": "Nome",
      "login.signupSubmit": "Criar conta",
      "login.hasAccount": "Já tem uma conta?",
      "login.switchLogin": "Entrar",
      "login.back": "Voltar à loja",
      "login.signingIn": "Entrando…",
      "login.creating": "Criando sua conta…",
      "login.error": "Algo deu errado. Tente novamente.",
      "auth.secureUnavailable": "O armazenamento seguro de senha requer um navegador moderno em localhost ou HTTPS.",
      "auth.duplicate": "Já existe uma conta com este e-mail. Faça login.",
      "auth.noAccount": "Não encontramos uma conta com este e-mail. Crie uma conta primeiro.",
      "auth.incorrectPassword": "E-mail ou senha incorretos.",
      "account.title": "Minha conta | Belle & Co.",
      "account.back": "Voltar à loja",
      "account.label": "Sua conta",
      "account.welcome": "Olá, {name}",
      "account.signOut": "Sair",
      "account.preferences": "Preferências",
      "account.theme": "Tema",
      "account.language": "Idioma",
      "account.light": "Claro",
      "account.dark": "Escuro",
      "account.localNote": "Esta conta de demonstração fica salva neste navegador.",
      "account.signedOut": "Você saiu da sua conta.",
      "account.chooseTheme": "Escolha o tema de cores",
      "account.chooseLanguage": "Escolha o idioma",
      "cart.title": "Carrinho | Belle & Co.",
      "cart.heading": "Carrinho de compras",
      "cart.empty": "Seu carrinho está vazio.",
      "wishlist.title": "Lista de desejos | Belle & Co.",
      "wishlist.heading": "Lista de desejos",
      "wishlist.empty": "Sua lista de desejos está vazia.",
      "common.continueShopping": "Continuar comprando",
      "footer.tagline": "Escolhas especiais para todos os dias.",
      "footer.rights": "Todos os direitos reservados.",
      "account.addressTitle": "Endereço de entrega",
      "account.postalCode": "CEP",
      "account.street": "Endereço",
      "account.number": "Número",
      "account.complement": "Complemento (opcional)",
      "account.neighborhood": "Bairro",
      "account.city": "Cidade",
      "account.state": "Estado",
      "account.addressLookup": "Buscando endereço…",
      "account.addressFound": "Endereço encontrado. Confira os dados e informe o número.",
      "account.addressInvalid": "Digite um CEP brasileiro válido com 8 números.",
      "account.addressNotFound": "Não encontramos esse CEP. Confira e tente novamente.",
      "account.addressError": "Não foi possível consultar o CEP. Tente novamente.",
      "account.addressSaved": "Endereço salvo na sua conta.",
      "account.addressSaveError": "Não foi possível salvar o endereço. Tente novamente.",
      "account.saveAddress": "Salvar endereço"
    }
  };

  let currentLanguage = localStorage.getItem(LANGUAGE_KEY) === "pt" ? "pt" : "en";
  let currentTheme = localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
  let activeToast = null;
  let toastTimer = null;

  function siteText(key, values = {}) {
    const template = translations[currentLanguage][key] || translations.en[key] || key;
    return template.replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ""));
  }

  function applySiteLanguage(language) {
    currentLanguage = language === "pt" ? "pt" : "en";
    const words = translations[currentLanguage];
    document.documentElement.lang = currentLanguage === "pt" ? "pt-BR" : "en";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      const values = {};
      if (element.dataset.i18nName) values.name = element.dataset.i18nName;
      element.textContent = siteText(key, values);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.placeholder = siteText(element.dataset.i18nPlaceholder);
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      element.setAttribute("aria-label", siteText(element.dataset.i18nAriaLabel));
    });
    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      element.title = siteText(element.dataset.i18nTitle);
    });
    document.querySelectorAll("[data-language]").forEach((button) => {
      const selected = button.dataset.language === currentLanguage;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    if (activeToast) {
      const toastElement = document.querySelector("#site-toast");
      if (toastElement) toastElement.textContent = siteText(activeToast.key, activeToast.values);
    }

    document.dispatchEvent(new CustomEvent("site-language-change", { detail: { language: currentLanguage } }));
  }

  function setSiteLanguage(language) {
    currentLanguage = language === "pt" ? "pt" : "en";
    localStorage.setItem(LANGUAGE_KEY, currentLanguage);
    applySiteLanguage(currentLanguage);
  }

  function applySiteTheme(theme) {
    currentTheme = theme === "dark" ? "dark" : "light";
    document.body.classList.toggle("dark-mode", currentTheme === "dark");
    document.querySelectorAll("[data-theme]").forEach((button) => {
      const selected = button.dataset.theme === currentTheme;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    document.dispatchEvent(new CustomEvent("site-theme-change", { detail: { theme: currentTheme } }));
  }

  function setSiteTheme(theme) {
    currentTheme = theme === "dark" ? "dark" : "light";
    localStorage.setItem(THEME_KEY, currentTheme);
    applySiteTheme(currentTheme);
  }

  function showSiteToast(key, values = {}) {
    activeToast = { key, values };
    let toast = document.querySelector("#site-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "site-toast";
      toast.className = "site-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.append(toast);
    }
    toast.textContent = siteText(key, values);
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
      activeToast = null;
    }, 2800);
  }

  window.siteText = siteText;
  window.setSiteLanguage = setSiteLanguage;
  window.applySiteLanguage = applySiteLanguage;
  window.getSiteLanguage = () => currentLanguage;
  window.applySiteTheme = applySiteTheme;
  window.setSiteTheme = setSiteTheme;
  window.getSiteTheme = () => currentTheme;
  window.showSiteToast = showSiteToast;

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => setSiteLanguage(button.dataset.language));
  });
  document.querySelectorAll("[data-theme]").forEach((button) => {
    button.addEventListener("click", () => setSiteTheme(button.dataset.theme));
  });
  window.addEventListener("storage", (event) => {
    if (event.key === LANGUAGE_KEY) applySiteLanguage(event.newValue || "en");
    if (event.key === THEME_KEY) applySiteTheme(event.newValue || "light");
  });

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  applySiteLanguage(currentLanguage);
  applySiteTheme(currentTheme);
})();
