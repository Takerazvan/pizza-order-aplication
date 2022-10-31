
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
    
    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('change');
        menuList.classList.toggle('hide');
    });

    //creare elemente
    const rootElement = document.getElementById("root");
    const pizzas = document.createElement("h1");
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
        pizzas.insertAdjacentHTML('afterend',
            elem.name +" "+elem.price+ " " 
        );
        
    })
};

window.addEventListener('load', loadEvent);
