const stripe = Stripe("pk_test_51OXfFbL2md4Fp61O4DnFTwa2iVfGWtWn5o03jJ89RsD3oHLS9OkF8DAp5TUWxuyIZJSZ2JwgCnAXnY2GJZtp87A600rEXyo8Fk");

const addItemBtn = document.getElementById('additem');
export const addToCart = async (id) => {
    try {
        // 1) get checkout session from the server
        console.log('add to cart with id', id)
        const session = await axios(`http://localhost:3000/api/v1/cart/checkout-session/${id}`)
        console.log(session);

        // 2) create a checkout form + charge
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        })
    }
    catch(error) {
        alert(error);
    }
}

    addItemBtn.addEventListener('click', e => {
        e.target.textContent= 'מעביר אותך לקופה...'
        const id = addItemBtn.getAttribute('data-item-id');
        console.log(id)
        addToCart(id);
    })

