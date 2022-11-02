

function addTocart(img, amount,total) {
    return `<div class="cartItems">
    <img src="${img}" class="pizzaOrder"/>
    
    <button type="button" class="addItems">+</button>
    ${amount}
    <button type="button" class="removeItems">-</button>
    <p>
     Total price : ${total}
    </p>
    
    </div>`;

}


function cartItems(pizzas) {
    return `<div class="AllPizzaContainer">
        ${pizzas
           
            .map((elem) =>
                addTocart(
                    elem.name,
                    elem.price,
                    elem.image
                )
            )
            .join('')}
    </div>`;
}











