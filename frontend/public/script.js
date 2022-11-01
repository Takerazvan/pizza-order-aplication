let packageSchema = {
    pizza: [
        {
            id: '',
            name: '',
            ingredients: [],
            price: '',
            allergens: []
        }
    ]
};
function reInitPackageSchema() {
    packageSchema = {
        pizza: [
            {
                id: '',
                name: '',
                ingredients: [],
                price: '',
                allergens: []
            }
        ]
    };
}



function pizzaHtmlComponent(item,price,imgsrc) {
    return `<div class="pizzaContainer">
   <img src="${imgsrc}" class="pizza-image"/>
    <p>
     ${item}
    </p>
     <div class="buttons" class="buttonContainer">
    <button type="button"  class="Addbutton">+</button>
    <p class="counter">
      1
    </p>
    <button type="button" class="Removebutton">-</button>
    </div>
    <p class="prices">
    ${price}
    </p>
    </div>`;
}



function allPizzasComponent(pizzas) {
    return `<div class="AllPizzaContainer">
        ${pizzas.map((elem)=>pizzaHtmlComponent(elem.name,elem.price,elem.image)).join("")}
    </div>`
}




let pizzas;
let allergens;
async function getData(str) {
    const response = await fetch(`http://127.0.0.1:9000/api/${str}`);

    const data = await response.json();
    console.log(data);

    if (str == 'allergens') {
        allergens = data.allergens;
    } else {
        pizzas = data.pizza;
    }
    return data;
}



const loadEvent = async () => {
    

    
    const menuButton = document.querySelector('.menu-button-container');
    const navBar = document.querySelector('nav');
    const menuList = document.querySelector('#menu-list');
    const shoppingCart = document.querySelector('#shopping-cart');
    const orderList = document.querySelector('#order-list');

    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('change');
        menuList.classList.toggle('hide');
        orderList.classList.add('hide');
    });

    if (window.innerWidth > 1000) {
        menuList.classList.remove('hide');
        navBar.removeChild(shoppingCart);
        navBar.appendChild(shoppingCart);
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1000) {
            menuList.classList.remove('hide');
            navBar.removeChild(shoppingCart);
            navBar.appendChild(shoppingCart);
        } else {
            menuButton.classList.remove('change');
            menuList.classList.add('hide');
        }
    });

    shoppingCart.addEventListener('click', () => {
        orderList.classList.toggle('hide');
        if (window.innerHeight < 1000) {
            menuList.classList.add('hide');
            menuButton.classList.remove('change');
        }
    });

    //creare elemente
    const rootElement = document.getElementById('root');
    const pizzas = document.createElement('h1');
    rootElement.appendChild(pizzas);

    //getData pizzas
    const datapizza = await getData('pizza');
    const dataAllergens = await getData('allergens');
    console.log(datapizza);
    console.log(dataAllergens);

    //adaugare package schema
    packageSchema.pizza = datapizza;
    console.log(packageSchema);

    //afisare pizza
   
        //exemplu test
    rootElement.insertAdjacentHTML('afterend', allPizzasComponent(datapizza));
    
        //add pizzasto/Price
    
document.querySelectorAll('.Addbutton').forEach((elem,index) =>
    elem.addEventListener('click', (e) => {
        
        e.preventDefault();
        // e.target.parentElement.parentElement.querySelector('.counter').innerText= counter++
       e.target.parentElement.parentElement.querySelector('.prices').innerText =
           String(
               parseInt(
                   e.target.parentElement.parentElement.querySelector('.prices')
                       .innerText
               )+datapizza[index].price
           );
    })
);
};

window.addEventListener('load', loadEvent);
