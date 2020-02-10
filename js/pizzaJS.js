"use strict";

var pizzaButton = document.getElementsByClassName("pizzaButton");
let cache = {};
function checkCache(key, value) {
    if (cache[key] === undefined) {
        cache[key] = value;
    }
    return cache[key]
}

class Pizza {
    constructor(picture, calories, price, ingr, title) {
        this.picture = picture;
        this.calories = calories;
        this.price = price;
        this.ingr = ingr;
        this.title = title;
    }
}
class Menu {
    constructor(menuType, ...rest) {
        this.menuList = rest;
        this.menuType = menuType;
        this.sortType = "default";
    }
    addPizza(item) {
        if (item instanceof Pizza) {
            this.menuList.push(item);
        } else {
            console.log("You can add only pizza.")
        }
    }
    render(arr) {
        if (this.menuType.toUpperCase() === "GRID") {
            menuSection.innerHTML = "";
            for (let i = 0; i < arr.length; i++) {
                let div = document.createElement("div");
                div.classList.add("pizzaIcon");
                div.id = i;
                let button = document.createElement("button");
                button.classList.add("pizzaButton");
                button.innerText = "В корзину";
                button.id = i;
                div.appendChild(button);
                let name = document.createElement("p");
                name.classList.add("name")
                name.innerHTML = arr[i].title;
                div.appendChild(name);
                let img = document.createElement('img');
                img.src = arr[i].picture;
                img.classList.add("pizzaImg")
                div.appendChild(img);
                let calories = document.createElement("p");
                calories.innerHTML = "Калории: " + arr[i].calories;
                div.appendChild(calories);
                let price = document.createElement("p");
                price.innerHTML = "Цена: " + arr[i].price + " грн.";
                div.appendChild(price);
                let ingr = document.createElement("p");
                ingr.innerHTML = "Ингредиетны: " + arr[i].ingr.join(", ");
                div.appendChild(ingr);
                menuSection.appendChild(div);
            }
        } else if (this.menuType.toUpperCase() === "LIST") {
            menuSection.innerHTML = "";
            for (let i = 0; i < arr.length; i++) {
                let div = document.createElement("div");
                div.classList.add("pizzaIconList");
                let img = document.createElement('img');
                img.classList.add("pizzaLogo");
                img.src = "img/pizzaLogo.png";
                div.appendChild(img);
                let calories = document.createElement("p");
                calories.classList.add("pList");
                calories.innerHTML = arr[i].title + " Калории: " + arr[i].calories + " Цена: " + arr[i].price;
                div.appendChild(calories);
                menuSection.appendChild(div);
            }
        } else {
            console.log("Wrong type of menu. Return to default value.");
            this.menuType = "GRID";
            alert(this.menuType);
            this.render(arr);
        }
    }
    sortPriceDown() {
        if (!checkCache("sortedDown")) {
            let sortedDownArr = [];
            for (let i = 0; i < this.menuList.length; i++) {
                sortedDownArr.push(this.menuList[i]);
            }
            sortedDownArr.sort((prev, next) => {
                return prev.price < next.price ? 0 : -1;
            });
            checkCache("sortedDown", sortedDownArr);
        }
        return checkCache("sortedDown");
    }
    sortPriceUp() {

        if (!checkCache("sortedUp")) {
            let sortedUpArr = [];
            for (let i = 0; i < this.menuList.length; i++) {
                sortedUpArr.push(this.menuList[i]);
            }
            sortedUpArr.sort((prev, next) => {
                return prev.price > next.price ? 0 : -1;
            });
            checkCache("sortedUp", sortedUpArr);
        }
        return checkCache("sortedUp");
    }
    sortTitleUp() {

        if (!checkCache("sortedUpTitle")) {
            let sortedUpTitleArr = [];
            for (let i = 0; i < this.menuList.length; i++) {
                sortedUpTitleArr.push(this.menuList[i]);
            }
            sortedUpTitleArr.sort((prev, next) => {
                return prev.title < next.title ? 0 : -1;
            });
            checkCache("sortedUpTitle", sortedUpTitleArr);
        }
        return checkCache("sortedUpTitle");
    }
    sortTitleDown() {

        if (!checkCache("sortedDownTitle")) {
            let sortedDownTitleArr = [];
            for (let i = 0; i < this.menuList.length; i++) {
                sortedDownTitleArr.push(this.menuList[i]);
            }
            sortedDownTitleArr.sort((prev, next) => {
                return prev.title > next.title ? 0 : -1;
            });
            checkCache("sortedDownTitle", sortedDownTitleArr);
        }
        return checkCache("sortedDownTitle");
    }
    filter(arr) {
        let filterArray = [];
        var checkbox = document.getElementsByClassName("checkbox");
        Array.from(checkbox).forEach(elem => {
            if (elem.checked) {
                filterArray.push(elem.name);
            }
        });
        let filteredPizza = arr.filter((elem) => {
            let tmp = 0;
            for (let i = 0; i < filterArray.length; i++) {
                if (elem.ingr.includes(filterArray[i])) { tmp++; }
            }
            return tmp == filterArray.length ? true : false;
        });
        return filteredPizza;
    }

}
function init() {
    let div = document.createElement("div");
    div.className = "start-modal";
    let question = document.createElement("div");
    question.className = "start-modal__question";
    div.appendChild(question);
    let questionText = document.createElement("p");
    questionText.className = "start-modal__question__text";
    question.appendChild(questionText);
    let buttonContainer = document.createElement("div");
    question.appendChild(buttonContainer);
    let buttonGrid = document.createElement("button");
    let buttonList = document.createElement("button");
    buttonGrid.className = "start-modal__question__button";
    buttonList.className = "start-modal__question__button";
    buttonGrid.innerText = "Сетка";
    buttonList.innerText = "Список";
    questionText.innerText = "Выберите в каком виде отображать меню."
    question.appendChild(questionText);
    question.appendChild(buttonGrid);
    question.appendChild(buttonList);
    document.body.appendChild(div);
    buttonGrid.onclick = function () {
        renderPage("grid");
        document.body.removeChild(div);
    }
    buttonList.onclick = function () {
        renderPage("list");
        document.body.removeChild(div);
    }

}
function renderPage(type) {
    let content = document.createElement("main");
    footer.before(content);
    content.innerHTML = `<section class="content">
    <section class="filters">
        <div id="constructorModal" class="modal">
            <div class="modal-content">
                <span id="close">&times;</span>
                <h1>Конструктор</h1>
                <ul>
                    <li>
                        <p class="inputs-p">Калории</p>
                        <input class="inputs" type="number" id="caloriesInput" placeholder="Калории">
                    </li>
                    <li>
                        <p class="inputs-p">Цена</p>
                        <input class="inputs" type="number" id="priceInput" placeholder="Цена">
                    </li>
                    <li>
                        <p class="inputs-p">Ингредиенты</p>
                        <input class="inputs" type="text" id="ingrInput" placeholder="Ингредиенты">
                    </li>
                    <li>
                        <p class="inputs-p">Название</p>
                        <input class="inputs" type="text" id="nameInput" placeholder="Название">
                    </li>
                    
                </ul>
                <div id = "modal-div">
                    <button id="modal-button">Применить</button>
                </div>
                
            </div>
        </div>
        <div id="iconModal" class="modal">

            <div id="iconModalContent" class="modal-content">
               <span id="close2">&times;</span>    
            </div>
        </div>
        <div class="filters-content">
            <h1>Фильтры:</h1>
            <ul>
                <li>
                    <input type="checkbox" class="checkbox" id="pepperoni" name = "Пепперони">
                    <label for="pepperoni">Пепперони</label>
                </li>
                <li>
                    <input type="checkbox" class="checkbox" id="mozzarella" name = "Моцарелла">
                    <label for="mozzarella">Моцарелла</label>
                </li>
                <li>
                    <input type="checkbox" class="checkbox" id="parmezan" name = "Пармезан">
                    <label for="parmezan">Пармезан</label>
                </li>                    
                <li>
                    <input type="checkbox" class="checkbox" id="bavarskie" name = "Колбаски баварские">
                    <label for="bavarskie">Колбаски баварские</label>
                </li>                    
                <li>
                    <input type="checkbox" class="checkbox" id="corn" name = "Кукуруза">
                    <label for="corn">Кукуруза</label>
                </li>                    
                <li>
                    <input type="checkbox" class="checkbox" id="pepperBolgar" name = "Перец болгарский">
                    <label for="pepperBolgar">Перец болгарский</label>
                </li>
                <li>
                    <input type="checkbox" class="checkbox" id="ham" name = "Ветчина">
                    <label for="ham">Ветчина</label>
                </li>
                <li>
                    <input type="checkbox" class="checkbox" id="olives" name = "Оливки">
                    <label for="olives">Оливки</label>
                </li>
                <li>
                    <input type="checkbox" class="checkbox" id="tomato" name = "Помидор">
                    <label for="tomato">Помидор</label>
                </li>
                    <button id = "filterButton">Применить</button>
            </ul>
        </div>
        <div class="sort">
            <h1>Сортировать:</h1>
            <ul>
                <li>
                    <a href="#" id="priceDown">От дорогих к дешевым</a>
                </li>
                <li>
                    <a href="#" id="priceUp">От дешевых к дорогим</a>
                </li>
                <li>
                    <a href="#" id="titleDown">По названию (А - Я)</a>
                </li>
                <li>
                    <a href="#" id="titleUp">По названию (Я - А)</a>
                </li>
            </ul>

        </div>
    </section>
    <section class="pizza" id="menuSection">
        <h1>Меню:</h1>

    </section>
</section>`;
    let menu = new Menu(type, new Pizza(
        "img/Bavarskaya.png",
        780,
        79,
        ["Пепперони", "Моцарелла", "Соус Барбекю"],
        "Баварская"),
        new Pizza(
            "img/Derevenskaya.png",
            1450,
            119,
            ["Колбаски баварские", "Кукуруза", "Моцарелла", "Перец богарский", "Соус барбекю"],
            "Деревенская"),
        new Pizza(
            "img/Leonardo.png",
            1280,
            120,
            ["Лук", "Моцарелла", "Пармезан", "Пепперони", "Соус томатный"],
            "Леонардо"),
        new Pizza(
            "img/Pepperony.png",
            800,
            140,
            ["Пепперони", "Соус томатный", "Пармезан"],
            "Пепперони"),
        new Pizza(
            "img/Tango.png",
            1100,
            130,
            ["Пармезан", "Оливки", "Помидор", "Ветчина", "Перец болгарский"],
            "Танго"),
        new Pizza(
            "img/Flamenco.png",
            700,
            135,
            ["Помидор", "Пармезан"],
            "Фламенко"),
        new Pizza(
            "img/pizza-margarita.jpg",
            500,
            110,
            ["Моцарелла","Базилик","Орегано","Зелень"],
            "Маргаритта"),
        new Pizza(
            "img/Техас.jpg",
            600,
            120,
            ["Кукуруза","Лук","Грибы","Колбаски баварские","Соус барбекю"],
            "Техас"),
        new Pizza(
            "img/барбекю.jpg",
            500,
            125,
            ["Курица","Лук","Бекон","Грибы","Моцарелла","Соус барбекю"],
            "Барбекю"
        ),
        new Pizza(
            "img/американа.jpg",
            700,
            150,
            ["Бекон","Ветчина","Моцарелла","Пепперони"],
            "Американа"
        ),
        new Pizza(
            "img/гавайская.jpg",
            600,
            130,
            ["Курица","Ананас","Моцарелла"],
            "Гавайская"
        ),
        new Pizza(
            "img/кантри.jpg",
            650,
            135,
            ["Лук","Бекон","Ветчина","Грибы","Моцарелла","Соус чесночный"],
            "Кантри"
        ),
        new Pizza(
            "img/карбонара.jpg",
            550,
            125,
            ["Лук","Бекон","Ветчина","Грибы","Моцарелла"],
            "Карбонара"
        ),
        new Pizza(
            "img/SalmonPhill.jpg",
            670,
            160,
            ["Моцарелла","Пармезан","Соус барбекю","Лосось"],
            "Лосось Филадельфия"
        )
            );
    menu.render(menu.menuList);
    document.getElementById("priceDown").addEventListener("click", () => {
        menu.render(menu.filter(menu.sortPriceDown()));
        menu.sortType = "priceDown";
    });
    document.getElementById("priceUp").addEventListener("click", () => {
        menu.render(menu.filter(menu.sortPriceUp()));
        menu.sortType = "priceUp";
    });
    document.getElementById("titleDown").addEventListener("click", () => {
        menu.render(menu.filter(menu.sortTitleDown()));
        menu.sortType = "titleDown";
    });
    document.getElementById("titleUp").addEventListener("click", () => {
        menu.render(menu.filter(menu.sortTitleUp()));
        menu.sortType = "titleUp";
    });
    document.getElementById("grid").addEventListener("click", () => {
        if (menu.menuType.toUpperCase() != "GRID") {
            menu.menuType = "grid";
            switch (menu.sortType) {
                case "priceDown":
                    menu.render(menu.filter(menu.sortPriceDown()));
                    break;
                case "priceUp":
                    menu.render(menu.filter(menu.sortPriceUp()));
                    break;
                case "titleDown":
                    menu.render(menu.filter(menu.sortTitleDown()));
                    break;
                case "titleUp":
                    menu.render(menu.filter(menu.sortTitleUp()));
                    break;
                default:
                    menu.render(menu.filter(menu.menuList));
                    break;
            }
        }
    });
    document.getElementById("list").addEventListener("click", () => {
        if (menu.menuType.toUpperCase() != "LIST") {
            menu.menuType = "list";
            switch (menu.sortType) {
                case "priceDown":
                    menu.render(menu.filter(menu.sortPriceDown()));
                    break;
                case "priceUp":
                    menu.render(menu.filter(menu.sortPriceUp()));
                    break;
                case "titleDown":
                    menu.render(menu.filter(menu.sortTitleDown()));
                    break;
                case "titleUp":
                    menu.render(menu.filter(menu.sortTitleUp()));
                    break;
                default:
                    menu.render(menu.filter(menu.menuList));
                    break;
            }
        }
    });
    document.getElementById("filterButton").addEventListener("click", () => {
        switch (menu.sortType) {
            case "priceDown":
                menu.render(menu.filter(menu.sortPriceDown()));
                break;
            case "priceUp":
                menu.render(menu.filter(menu.sortPriceUp()));
                break;
            case "titleDown":
                menu.render(menu.filter(menu.sortTitleDown()));
                break;
            case "titleUp":
                menu.render(menu.filter(menu.sortTitleUp()));
                break;
            default:
                menu.render(menu.filter(menu.menuList));
                break;
        }
    });
    document.getElementById("constructor").addEventListener("click", () => {
        alert("В разработке.");
    });
    document.getElementById("menuSection").addEventListener("click", (event) => {
        if (event.target.tagName == "BUTTON") {
            alert("В разработке.");
        }
    })


}
init();

/* Как было реализовано раньше
function Gird(picture, calories, price, ingr, name) {
    this.picture = picture;
    this.calories = calories;
    this.price = price;
    this.ingr = ingr;
    this.name = name;

}

girdArray.push(
    new Gird(
        "img/Bavarskaya.png",
        780,
        79,
        ["Пепперони", "Моцарелла", "Соус Барбекю"],
        "Баварская"),
    new Gird(
        "img/Derevenskaya.png",
        1450,
        119,
        ["Колбаски баварские", "Кукуруза", "Моцарелла", "Перец богарский", "Соус барбекю"],
        "Деревенская"),
    new Gird(
        "img/Leonardo.png",
        1280,
        120,
        ["Лук", "Моцарелла", "Пармезан", "Пепперони", "Соус томатный"],
        "Леонардо"),
    new Gird(
        "img/Pepperony.png",
        800,
        140,
        ["Пепперони", "Соус томатный", "Пармезан"],
        "Пепперони"),
    new Gird(
        "img/Tango.png",
        1100,
        130,
        ["Пармезан", "Оливки", "Помидор", "Ветчина", "Перец болгарский"],
        "Танго"),
    new Gird(
        "img/Flamenco.png",
        700,
        135,
        ["Помидор", "Пармезан"],
        "Фламенко")
);

function showGrid(arr) {
    menuSection.innerHTML = "";

    for (let i = 0; i < arr.length; i++) {
        let div = document.createElement("div");
        div.classList.add("pizzaIcon");
        div.id = i;
        let button = document.createElement("button");
        button.classList.add("pizzaButton");
        button.innerText = "В корзину";
        button.id = i;
        div.appendChild(button);
        menuSection.appendChild(div);
        let name = document.createElement("p");
        name.classList.add("name")
        name.innerHTML = arr[i].name;
        div.appendChild(name);
        let img = document.createElement('img');
        img.src = arr[i].picture;
        img.classList.add("pizzaImg")
        div.appendChild(img);

        let calories = document.createElement("p");
        calories.innerHTML = "Калории: " + arr[i].calories;
        div.appendChild(calories);
        let price = document.createElement("p");
        price.innerHTML = "Цена: " + arr[i].price + " грн.";
        div.appendChild(price);
        let ingr = document.createElement("p");
        ingr.innerHTML = "Ингредиетны: " + arr[i].ingr.join(", ");
        div.appendChild(ingr);
    }
}
function showList(girdArray) {
    menuSection.innerHTML = "";
    for (let i = 0; i < girdArray.length; i++) {
        let div = document.createElement("div");
        div.classList.add("pizzaIconList");
        menuSection.appendChild(div);
        let img = document.createElement('img');
        img.classList.add("pizzaLogo");
        img.src = "img/pizzaLogo.png";
        div.appendChild(img);
        let calories = document.createElement("p");
        calories.classList.add("pList");
        calories.innerHTML = girdArray[i].name + " Калории: " + girdArray[i].calories + " Цена: " + girdArray[i].price;
        div.appendChild(calories);


    }
}

function priceSort() {
    priceDownArray.length = 0;
    priceUpArray.length = 0;
    calDownArray.length = 0;
    calUpArray.length = 0;
    for (let i = 0; i < girdArray.length; i++) {
        priceDownArray.push(girdArray[i]);
        calDownArray.push(girdArray[i]);
    }
    for (let i = 0; i < priceDownArray.length; i++) {
        for (let j = 1; j < priceDownArray.length - i; j++) {
            if (priceDownArray[j - 1].price < priceDownArray[j].price) {
                let tmp = priceDownArray[j - 1];
                priceDownArray[j - 1] = priceDownArray[j];
                priceDownArray[j] = tmp;
            }
        }
    }
    for (let i = 0; i < calDownArray.length; i++) {
        for (let j = 1; j < calDownArray.length - i; j++) {
            if (calDownArray[j - 1].calories < calDownArray[j].calories) {
                let tmp = calDownArray[j - 1];
                calDownArray[j - 1] = calDownArray[j];
                calDownArray[j] = tmp;
            }
        }
    }
    for (let i = 0; i < priceDownArray.length; i++) {
        priceUpArray.unshift(priceDownArray[i]);
    }
    for (let i = 0; i < calDownArray.length; i++) {
        calUpArray.unshift(calDownArray[i]);
    }

}

function constructor(arr) {
    let modal = document.getElementById("constructorModal");
    modal.style.display = "block";
    document.getElementById("modal-button").addEventListener('click', () => {
        if (caloriesInput.valueAsNumber == NaN || caloriesInput.valueAsNumber <= 0) {
            alert("Введите количество калорий больше 0");
        } else if (priceInput.valueAsNumber == NaN || priceInput.valueAsNumber <= 0) {
            alert("Введите цену больше 0");
        } else if (ingrInput.value == "") {
            alert("Введите ингредиенты");
        } else if (nameInput.value == "") {
            alert("Введите название");
        } else {
            arr.push(new Gird(
                "img/table.jpg",
                caloriesInput.valueAsNumber,
                priceInput.valueAsNumber,
                ingrInput.value.split(', '),
                nameInput.value
            ));
            priceSort();
            showGrid(arr);
            modal.style.display = "none";

        }

    });



}
function addToBasket(elem, array) {
    let tmp = true;

    // for(let i = 0;i<localStorage.length;i++){
    //     if(localStorage.getItem(i)==JSON.stringify(girdArray[elem])){
    //         localStorage.removeItem(i);
    //         tmp++;

    //     }

    // }
    for (let i = 0; i < basketArray.length; i++) {
        if (basketArray[i].object == array[elem]) {
            tmp = false;
            basketArray[i].count++;
            break;
        }
    }
    if (tmp == true) {
        var p = {
            count: 1,
            object: array[elem]
        }


        basketArray.push(p);
    }
    console.log(basketArray);


}
// var iconButtons = document.getElementsByClassName("pizzaIcon");
// function largeIcon(elem, array){
//     let modal = document.getElementById("iconModal");
//     let div = document.getElementById("iconModalContent")
//     modal.style.display = "block";
//     let name = document.createElement("p");
//     name.classList.add("name")
//     name.innerHTML = array[elem].name;
//     div.appendChild(name);
//     let img = document.createElement('img');
//     img.src = array[elem].picture;
//     img.classList.add("pizzaImg")
//     div.appendChild(img);

//     let calories = document.createElement("p");
//     calories.innerHTML = "Калории: " + array[elem].calories;
//     div.appendChild(calories);
//     let price = document.createElement("p");
//     price.innerHTML = "Цена: " + array[elem].price + " грн.";
//     div.appendChild(price);
//     let ingr = document.createElement("p");
//     ingr.innerHTML = "Ингредиетны: " + array[elem].ingr.join(", ");
//     div.appendChild(ingr);

// }
function pushBasketToStorage(arr) {
    localStorage.clear();
    for (let i = 0; i < arr.length; i++) {
        localStorage.setItem(i, JSON.stringify(arr[i]));
    }
}
function filter(arr) {
    var filterArray = [];
    var filteredPizza = [];
    var tmp = 0;
    var checkbox = document.getElementsByClassName("checkbox");
    Array.from(checkbox).forEach(elem => {
        if (elem.checked) {
            filterArray.push(elem.name);
        }
    })
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < filterArray.length; j++) {
            for (let k = 0; k < arr[i].ingr.length; k++) {
                if (filterArray[j] == (arr[i].ingr[k])) {
                    tmp++;
                }
            }
        }
        if (tmp == filterArray.length) {
            filteredPizza.push(arr[i])
        }
        tmp = 0;
    }
    showGrid(filteredPizza);
}
showGrid(girdArray);
priceSort();
document.getElementById("grid").addEventListener("click", () => {
    showGrid(girdArray);
    sort = "Standart";
    view = "Grid";
});
document.getElementById("list").addEventListener("click", () => {
    showList(girdArray);
    sort = "Standart";
    view = "List";
});
document.getElementById("priceUp").addEventListener('click', () => {
    if (view == "Grid") {
        filter(priceUpArray);
        //basketBtns(iconButtons, largeIcon, priceUpArray);
        basketBtns(pizzaButton, addToBasket, priceUpArray);
        //showGrid(priceUpArray);
    } else
        showList(priceUpArray);
    sort = "priceUp";
});
document.getElementById("priceDown").addEventListener('click', () => {
    if (view == "Grid") {
        filter(priceDownArray);
        //basketBtns(iconButtons, largeIcon, priceDownArray);
        basketBtns(pizzaButton, addToBasket, priceDownArray);
        //showGrid(priceDownArray);
    } else
        showList(priceDownArray);
    sort = "priceDown";
});
document.getElementById("calUp").addEventListener('click', () => {
    if (view == "Grid") {
        filter(calUpArray);
        // basketBtns(iconButtons, largeIcon, calUpArray);
        basketBtns(pizzaButton, addToBasket, calUpArray);
        //showGrid(calUpArray);
    } else
        showList(calUpArray);
    sort = "calUp";
});
document.getElementById("calDown").addEventListener('click', () => {
    if (view == "Grid") {
        filter(calDownArray);
        // basketBtns(iconButtons, largeIcon, calDownArray);
        basketBtns(pizzaButton, addToBasket, calDownArray);
        //showGrid(calDownArray);
    } else
        showList(calDownArray);
    sort = "calDown";
});
document.getElementById("constructor").addEventListener('click', () => {
    constructor(girdArray);
    caloriesInput.valueAsNumber = undefined;
    priceInput.valueAsNumber = undefined;
    ingrInput.value = "";
    nameInput.value = "";
});
document.getElementById("close").addEventListener("click", () => {
    constructorModal.style.display = "none";
});
// document.getElementById("close2").addEventListener("click", () => {
//     iconModal.style.display = "none";
//     iconModalContent.innerHTML = "";
// });

function basketBtns(arr, foo, array) {
    Array.from(arr).forEach(element => {
        element.addEventListener("click", () => {
            foo(element.id, array);
        });

    });
}
// basketBtns(iconButtons, largeIcon, girdArray);
basketBtns(pizzaButton, addToBasket, girdArray);
document.getElementById("filterButton").addEventListener("click", () => {
    if (view == "List")
        alert("Фильтры работают только в режиме сетки.");
    switch (sort) {
        case "priceUp":
            filter(priceUpArray);
            break;
        case "priceDown":
            filter(priceDownArray);
            break;
        case "calUp":
            filter(calUpArray);
            break;
        case "calDown":
            filter(calDownArray);
            break;
        default:
            filter(girdArray);
    }
});
document.getElementById("basket").addEventListener("click", () => { pushBasketToStorage(basketArray); });*/