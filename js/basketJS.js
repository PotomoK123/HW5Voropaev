function showBasket() {
    var basket = [];
    for (let i = 0; i < localStorage.length; i++) {
        basket.push(JSON.parse(localStorage.getItem(i)));
    }
    menuSection.innerHTML = "";
    for (let i = 0; i < basket.length; i++) {
        let div = document.createElement("div");
        div.classList.add("pizzaIconList");
        menuSection.appendChild(div);
        let img = document.createElement('img');
        img.classList.add("pizzaLogo");
        img.src = "img/pizzaLogo.png";
        div.appendChild(img);
        let calories = document.createElement("p");
        calories.classList.add("pList");
        if(basket[i].count>1)
        calories.innerHTML = basket[i].object.name + " Калории: " + basket[i].object.calories + " Цена: " + basket[i].object.price+" Количество: "+basket[i].count;
        else
        calories.innerHTML = basket[i].object.name + " Калории: " + basket[i].object.calories + " Цена: " + basket[i].object.price;
        div.appendChild(calories);
        


    }

}
showBasket();