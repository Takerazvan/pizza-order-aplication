function addTocart(name, amount) {
    return `<div class="cartItems">
     
                        <div class="orders">
                            <div><i id="remove-item" class="bi bi-x-circle"></i></div>
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

    const orderItemsCopy = await (
        await fetch('http://127.0.0.1:9000/pizza/orders')
    ).json();
    let orderItems;
    if (orderItemsCopy.length > 0) {
        orderItems = orderItemsCopy[0];
    } else {
        orderItems = {
            total: 0,
            numberOfItems: 0,
            list: []
        };
    }

    const total = document.querySelector('#total');
    total.innerText = 'Total: ' + orderItems.total;

    const removeButton = document.querySelector('#remove-item');

    removeButton.addEventListener('click', (e) => {});
};

window.addEventListener('load', loadEvent);
