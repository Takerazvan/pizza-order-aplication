function addTocart(name, amount) {
    return `<div class="cartItems">
     
                        <div class="orders">
                            <img
                                width="30%"
                                src="/public/images/pizza1.png"
                                alt="pizza image"
                            />

                            <div><h2>
                            ${name}  
                            </h2>
                                <h3></h3>
                               
                            </div>
                            <div class="quantity">
                                <i class="bi bi-patch-minus"></i>
                                <div>${amount}</div>
                                <i class="bi bi-patch-plus"></i>
                            </div>
                        </div>
    
    </div>`;
}

function cartItems(orders) {
    return `<div class="AllPizzaContainer">
        ${orders[0].list

            .map((elem) => addTocart(elem.name, elem.amount))
            .join('')}
    </div>`;
}

const loadEvent = async () => {
    async function getData() {
        return await (await fetch(`http://127.0.0.1:9000/pizza/orders`)).json();
    }
    const myOrders = await getData();
    console.log(myOrders);
    const rootElement = document.getElementById('root');

    rootElement.insertAdjacentHTML('beforeend', cartItems(myOrders));
};

window.addEventListener('load', loadEvent);
