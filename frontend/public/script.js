
let endpoint = window.location.href.split('/').reverse()[0];
console.log(endpoint);
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
    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('change');


    const datapizza = await getData('pizza');
    const dataAllergens = await getData('allergens');
    console.log(datapizza);
    console.log(dataAllergens);

    packageSchema.pizza = datapizza;
    console.log(packageSchema);
};

window.addEventListener('load', loadEvent);
