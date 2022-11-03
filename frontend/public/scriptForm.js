function addTocart(name, amount) {
    return `<div class="cartItems">
     
                        <div class="orders">
                            <div><i class="bi bi-x-circle remove-item"></i></div>
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

    const removeButton = document.querySelectorAll('.remove-item');
    const cartContainer = document.querySelector('.cartItems');
    removeButton.forEach((element) => {
        element.addEventListener('click', async (elem) => {
            const datapizza = await (await fetch(`/api/pizza`)).json();
            const pizza = datapizza.filter(
                (e) =>
                    element.parentElement.parentElement.children[2].firstChild
                        .innerText === e.name
            )[0];
            console.log(pizza);
            for (let i = 0; i < orderItems.list.length; i++) {
                if (orderItems.list[i].name === pizza.name) {
                    orderItems.total -= orderItems.list[i].amount * pizza.price;
                    total.innerText = 'Total: ' + orderItems.total;
                    orderItems.numberOfItems -= orderItems.list[i].amount;
                    orderItems.list.splice(i,1);
                    break;
                }
            }
            cartContainer.removeChild(element.parentElement.parentElement);
            await fetch(`http://127.0.0.1:9000/pizza/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderItems)
        });
        });
    });
};

window.addEventListener('load', loadEvent);
