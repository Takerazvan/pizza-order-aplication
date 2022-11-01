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

function pizzaHtmlComponent(item, price, imgsrc) {
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



function allPizzasComponent(pizzas, selectedAlergens) {
    return `<div class="AllPizzaContainer">
        ${pizzas
            .filter(element => {
                for (allergen of element.allergens) {
                    if (selectedAlergens.includes(allergen)) {
                        return false;
                    }
                }
                return true;
            })
            .map((elem) =>
                pizzaHtmlComponent(elem.name, elem.price, elem.image)
            )
            .join('')}
    </div>`;
}

async function getData(str) {
    return await (await fetch(`http://127.0.0.1:9000/api/${str}`)).json();
}

function displayallergensList(allergensList, selectedAlergens, rootElement, datapizza) {
    const allergensContainer = document.querySelector('.allergens-container');
    allergensList.forEach((element) => {
        const allergenButton = allergensContainer.appendChild(
            document.createElement('div')
        );
        allergenButton.innerText = element.name;
        allergenButton.classList.add('allergens');
        allergenButton.addEventListener('click', () => {
            if (allergenButton.className.search(/changed/g) === -1) {
                selectedAlergens.push(element.id);
            } else {
                selectedAlergens.splice(selectedAlergens.indexOf(element.id), 1);       
            }
            allergenButton.classList.toggle('changed');
            console.log(selectedAlergens);
            document.querySelector('body').removeChild(document.querySelector('.AllPizzaContainer'));
            rootElement.insertAdjacentHTML('afterend', allPizzasComponent(datapizza, selectedAlergens));
        });
    });
}



const loadEvent = async () => {
    const menuButton = document.querySelector('.menu-button-container');
    const navBar = document.querySelector('nav');
    const menuList = document.querySelector('#menu-list');
    const shoppingCart = document.querySelector('#shopping-cart');
    const orderList = document.querySelector('#order-list');
    const allergensContainer = document.querySelector('.allergens-container');
    const allergenButton = document.querySelector('.allergens-filter-button');

    const selectedAlergens = [];

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

    allergenButton.addEventListener('click', () => {
        allergenButton.classList.toggle('changed');
        allergensContainer.classList.toggle('hide');
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

    displayallergensList(dataAllergens, selectedAlergens, rootElement, datapizza);

   
        //exemplu test
    rootElement.insertAdjacentHTML('afterend', allPizzasComponent(datapizza, selectedAlergens));
    
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
