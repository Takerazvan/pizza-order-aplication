let id = window.location.href.split('/').reverse()[0];
let packageSchema = {
    pizza: [
        {
            "id": "",
            "name": "",
            "ingredients": [],
            "price": "",
            "allergens": []
        }]
    }
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

        pizzas = data.pizza;
        allergens = data.allergens
       
        return data;
}
    

const loadEvent = async () => {



}

window.addEventListener('load', loadEvent);