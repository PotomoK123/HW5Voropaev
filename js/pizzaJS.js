"use strict";

var pizzaButton = document.getElementsByClassName("pizzaButton");
let cache = {};
function checkCache(key, value) {
    if (cache[key] === undefined) {
        cache[key] = value;
    }
    return cache[key]
}
class Ingredients {
    constructor(value, calories, price) {
        this.value = value;
        this.calories = calories;
        this.price = price;
    }
}
let ingedientsList = [new Ingredients("Пепперони", 50, 20), new Ingredients("Моцарелла", 10, 20), new Ingredients("Пармезан", 13, 15), new Ingredients("Колбаски баварские", 55, 15), new Ingredients("Кукуруза", 7, 5),
new Ingredients("Перец болгарский", 5, 10), new Ingredients("Ветчина", 40, 30), new Ingredients("Оливки", 30, 30), new Ingredients("Помидор", 10, 20), new Ingredients("Соус Барбекю", 20, 20), new Ingredients("Лук", 5, 5),
new Ingredients("Соус томатный", 10, 15), new Ingredients("Орегано", 5, 10), new Ingredients("Базилик", 5, 8), new Ingredients("Зелень", 4, 4), new Ingredients("Грибы", 25, 44), new Ingredients("Бекон", 60, 55),
new Ingredients("Курица", 40, 39), new Ingredients("Ананас", 33, 44), new Ingredients("Соус чесночный", 23, 23), new Ingredients("Лосось", 57, 60)];
class Pizza {
    constructor(picture, price, ingr, title) {
        this.picture = picture;
        this.calories = 0;
        for (let i = 0; i < ingr.length; i++) {
            this.calories = this.calories+ingr[i].calories;
        }
        this.price = price;
        for (let i = 0; i < ingr.length; i++) {
            this.price += ingr[i].price;
        }
        this.ingr = ingr;
        this.title = title;
    }
    addIngredient(item) {
        if (item instanceof Ingredients) {
            this.ingr.push(item);
            this.price += item.price;
            this.calories += item.calories;
        } else {
            console.log("Wrond ingredient");
        }
    }
    removeIngr(item) {
        if (item instanceof Ingredients) {
            this.ingr.splice(this.ingr.indexOf(item), 1);
            this.price -= item.price;
            this.calories -= item.calories;
        } else {
            console.log("Wrond ingredient");
        }
    }
}
class Menu {
    constructor(menuType, list) {
        this.menuList = list;
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
                let wrap = document.createElement("div");
                let div = document.createElement("div");
                let backdiv = document.createElement("div");
                let backdivWrap = document.createElement("div");
                wrap.className = "pizzaicon__wrap";
                backdivWrap.className = "pizzaicon__backdivWrap"
                div.classList.add("pizzaIcon");
                div.dataset.title = arr[i].title;
                backdiv.className = "pizzaIcon--back";
                let button = document.createElement("button");
                button.classList.add("pizzaButton");
                button.innerText = "В корзину";
                div.appendChild(button);
                let name = document.createElement("h2");
                name.classList.add("name")
                name.innerHTML = arr[i].title;
                div.appendChild(name);
                let img = document.createElement('img');
                img.src = arr[i].picture;
                img.classList.add("pizzaImg")
                backdivWrap.appendChild(img);
                let calories = document.createElement("span");
                calories.innerHTML = "Калории: " + arr[i].calories;
                div.appendChild(calories);
                let price = document.createElement("span");
                price.innerHTML = "Цена: " + arr[i].price + " грн.";
                div.appendChild(price);
                let ingr = document.createElement("span");
                ingr.innerHTML = "Ингредиетны: ";
                for (let j = 0; j < arr[i].ingr.length; j++) {
                    let ingrSpan = document.createElement("span");
                    ingrSpan.className = "pizzaicon__ingr";
                    ingrSpan.innerText = arr[i].ingr[j].value + " ";
                    ingr.appendChild(ingrSpan);
                }
                let addIngr = document.createElement("select");
                addIngr.className = "pizzaicon__addIngr";
                addIngr.dataset.title = arr[i].title;
                let defOption = document.createElement("option");
                defOption.disabled;
                defOption.innerText = "Добавить ингредиент";
                addIngr.appendChild(defOption);
                for(let i = 0;i<ingedientsList.length;i++){
                    let ingrOption = document.createElement("option");
                    ingrOption.value =ingedientsList[i].value;
                    ingrOption.innerText =ingedientsList[i].value;
                    addIngr.appendChild(ingrOption);
                }
                div.appendChild(ingr);
                div.appendChild(addIngr);
                backdiv.appendChild(backdivWrap);
                wrap.appendChild(div);
                wrap.appendChild(backdiv);
                menuSection.appendChild(wrap);
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
            let uniqueArray = elem.ingr.filter((value, index, self) =>self.indexOf(value) === index);
            console.log(uniqueArray);
            for (let i = 0; i < filterArray.length; i++) {
                console.log(elem);
                for(let j = 0;j<uniqueArray.length;j++){
                    if (uniqueArray[j].value.includes(filterArray[i])) { tmp++; }
                }
                
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
            <div class="filters__content">
                <h1 class="filters__content__heading">Фильтры:</h1>
                <ul class="filters__content__ul">
                   
                        <button id = "filterButton">Применить</button>
                </ul>
            </div>
            <div class="filters__sort">
                <h1 class="filters__sort__heading">Сортировать:</h1>
                <ul class="filters__sort__ul">
                    <li class="filters__sort__ul__li">
                        <a href="#" id="priceDown">От дорогих к дешевым</a>
                    </li>
                    <li class="filters__sort__ul__li">
                        <a href="#" id="priceUp">От дешевых к дорогим</a>
                    </li>
                    <li class="filters__sort__ul__li">
                        <a href="#" id="titleDown">По названию (А - Я)</a>
                    </li>
                    <li class="filters__sort__ul__li">
                        <a href="#" id="titleUp">По названию (Я - А)</a>
                    </li>
                </ul>
    
            </div>
        </section>
        <section class="pizza" id="menuSection">
            <h1>Меню:</h1>
    
        </section>
    </section>`;
    for(let i = 0;i<ingedientsList.length;i++){
        let ingr = document.createElement("li");
        ingr.className = "filters__content__ul__li";
        ingr.innerHTML = `<input type="checkbox" class="checkbox" id="${i}" name = "${ingedientsList[i].value}">
        <label for="${i}">${ingedientsList[i].value}</label>`
        filterButton.before(ingr);
    }

    let httpRequest;
    let result;
    if(window.XMLHttpRequest){
        httpRequest = new XMLHttpRequest();
    }else if(window.ActiveXObject){
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpRequest.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            result = JSON.parse(this.responseText);
        }
    }
    httpRequest.open("GET", "js/menulist.json", false);
    httpRequest.send();
    console.log(result.length);
    let menulist = [];

    for(let i = 0;i<result.length;i++){
        let ingr = [];
        for(let j = 0;j<result[i].ingr.length;j++){
            ingr.push(ingedientsList[result[i].ingr[j]]);
        }
        menulist.push(new Pizza(result[i].picture,result[i].price,ingr,result[i].title));
    }
    console.log(menulist);
    let menu = new Menu(type, menulist);
    // let menu = new Menu(type, new Pizza(
    //     "img/Bavarskaya.png",
    //     10,
    //     [0,1,9],
    //     "Баварская"),
    //     new Pizza(
    //         "img/Derevenskaya.png",
    //         10,
    //         [3,4,2,5,9],
    //         "Деревенская"),
    //     new Pizza(
    //         "img/Leonardo.png",
    //         10,
    //         [10,2,3,0,11],
    //         "Леонардо"),
    //     new Pizza(
    //         "img/Pepperony.png",
    //         10,
    //         [0,11,2],
    //         "Пепперони"),
    //     new Pizza(
    //         "img/Tango.png",
    //         10,
    //         [2,7,8,6,5],
    //         "Танго"),
    //     new Pizza(
    //         "img/Flamenco.png",
    //         10,
    //         [8,2],
    //         "Фламенко"),
    //     new Pizza(
    //         "img/pizza-margarita.jpg",
    //         10,
    //         [1,13,12,14],
    //         "Маргаритта"),
    //     new Pizza(
    //         "img/Техас.jpg",
    //         10,
    //         [4,10,15,3,9],
    //         "Техас"),
    //     new Pizza(
    //         "img/барбекю.jpg",
    //         10,
    //         [17,10,16,15,1,9],
    //         "Барбекю"
    //     ),
    //     new Pizza(
    //         "img/американа.jpg",
    //         10,
    //         [16,6,1,0],
    //         "Американа"
    //     ),
    //     new Pizza(
    //         "img/гавайская.jpg",
    //         10,
    //         [17,18,1],
    //         "Гавайская"
    //     ),
    //     new Pizza(
    //         "img/кантри.jpg",
    //         10,
    //         [10,16,6,15,1,19],
    //         "Кантри"
    //     ),
    //     new Pizza(
    //         "img/карбонара.jpg",
    //         10,
    //         [10,16,6,15,1],
    //         "Карбонара"
    //     ),
    //     new Pizza(
    //         "img/SalmonPhill.jpg",
    //         10,
    //         [1,2,9,20],
    //         "Лосось Филадельфия"
    //     )
    // );
   
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
            renderMenu(menu);
        }
    });
    document.getElementById("list").addEventListener("click", () => {
        if (menu.menuType.toUpperCase() != "LIST") {
            menu.menuType = "list";
            renderMenu(menu);
        }
    });
    document.getElementById("filterButton").addEventListener("click", () => {
        renderMenu(menu);
    });
    document.getElementById("constructor").addEventListener("click", () => {
        alert("В разработке.");
    });
    document.getElementById("menuSection").addEventListener("click", (event) => {
        if (event.target.tagName == "BUTTON") {
            alert("В разработке.");
        }
        if (event.target.className.indexOf("pizzaIcon") != -1) {
            if ((event.target.parentNode.lastChild != event.target && event.target.className.indexOf("pizzaIcon--rotatedoff") != -1) || event.target.className == "pizzaIcon") {
                let target = event.target.parentNode;
                target.firstChild.classList.add("pizzaIcon--rotated");
                target.firstChild.classList.remove("pizzaIcon--rotatedoff");
                target.lastChild.classList.remove("pizzaIcon--rotated");
                target.lastChild.classList.add("pizzaIcon--rotatedoff");
            } else {
                let target = event.target.parentNode;
                target.firstChild.classList.remove("pizzaIcon--rotated");
                target.firstChild.classList.add("pizzaIcon--rotatedoff");
                target.lastChild.classList.add("pizzaIcon--rotated");
                target.lastChild.classList.remove("pizzaIcon--rotatedoff");
            }
        }
        if(event.target.tagName == "SPAN"&&event.target.className == "pizzaicon__ingr"){
            let element = menu.menuList.find((elem)=> elem.title ==event.target.parentNode.parentNode.dataset.title);
            element.removeIngr(ingedientsList.find((elem)=>elem.value.indexOf(event.target.innerText.slice(0,event.target.innerText.length-1))!=-1));
            renderMenu(menu);
        }
        
    });
    document.getElementById("menuSection").addEventListener("change", (event) => {
        if(event.target.tagName == "SELECT"){
            let element = menu.menuList.find((elem)=>event.target.dataset.title==elem.title);
            element.addIngredient(ingedientsList.find((elem)=>elem.value.indexOf(event.target.value) !=-1));
            renderMenu(menu);
        }
    });

}
function renderMenu(menu){
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


init();