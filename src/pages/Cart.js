import React,{useState,useContext} from "react"
import { Context } from "../Context"
import CartItem from "../components/CartItem"

function Cart() {
    const [buttonText, setButtonText] = useState("Place Order")
    const {cartItems, emptyCart} = useContext(Context)
    const cartItemElements = cartItems.map(item=> (
       <CartItem key={item.id} item={item} />
    ))


    console.log(cartItems)

    const calculateTotal = (cartItems.length * 5.99).toLocaleString("en-US", {style: "currency", currency: "USD"})
    
    const placeOrder = ()=>{
        setButtonText("Ordering...")
        setTimeout(() => {
            console.log("Order placed!")
            setButtonText("Place Order")
            emptyCart()
        }, 3000);
    }

    return (
        <main className="cart-page">
            <h1>Check out</h1>
            {cartItemElements}
            <p className="total-cost">Total: {calculateTotal}</p>
            <div className="order-button">
                {cartItems.length ? <button onClick={placeOrder}>{buttonText}</button>: <button disabled={true} onClick={placeOrder}>{buttonText}</button>}
            </div>
        </main>
    )
}

export default Cart