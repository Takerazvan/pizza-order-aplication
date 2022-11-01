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
    packageSchema.pizza.forEach((elem) => {
        //exemplu test
        pizzas.insertAdjacentHTML(
            'afterend',
            elem.name + ' ' + elem.price + ' '
        );
    });
};

window.addEventListener('load', loadEvent);
