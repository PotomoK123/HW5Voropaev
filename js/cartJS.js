function showBasket() {
    var cart = [];
    cart = JSON.parse(localStorage.getItem("cartListV"));
    let menuSection = document.getElementById("menuSection");
    let total = 0;
    menuSection.innerHTML = "";
    for (let i = 0; i < cart.length; i++) {
        let div = document.createElement("div");
        div.classList.add("pizzaIconList");
        menuSection.appendChild(div);
        let img = document.createElement('img');
        img.classList.add("pizzaLogo");
        img.src = "img/pizzaLogo.png";
        div.appendChild(img);
        let calories = document.createElement("p");
        calories.classList.add("pList");
        calories.innerHTML = cart[i].title + " Калории: " + cart[i].calories + " Цена: " + cart[i].price + "грн.";
        div.appendChild(calories);
        total+=cart[i].price;
    }
        let totalValue = document.createElement("p");
        totalValue.classList.add("totalList");
        totalValue.innerHTML = "Итого: " + total + "грн.";
        menuSection.appendChild(totalValue);
    document.getElementById("clearCart").addEventListener("click", () => {
        localStorage.removeItem("cartListV");
        showBasket();
    })
}
function init() {
    let content = document.createElement("section");
    content.className = "content";
    content.innerHTML = `<section class="pizza">
    <h1>Корзина:</h1>
    <div id="menuSection">Корзина пуста.</div>

    </section>
    <button class="cartButton" id="clearCart">Очистить корзину</button>`;
    footer.before(content);
    showBasket();
}
init();
