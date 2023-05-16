import React, {useContext, useState} from "react"
import {Context} from "../Context"
import PropTypes from "prop-types"

function CartItem({item}) {
    const {removeItem} = useContext(Context)
    const [hovered, setHovered] = useState(false)

    function hover(){
        setHovered(true)
    }

    function notHovered(){
        setHovered(false)
    }

    const trashClass = hovered ? "ri-delete-bin-fill" : "ri-delete-bin-line"

    return (
        <div className="cart-item">
            <i 
            className={trashClass}
            onClick={()=>removeItem(item.id)}
            onMouseEnter={hover} 
            onMouseLeave={notHovered} 
            ></i>
            <img src={item.url} width="130px" />
            <p>$5.99</p>
        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.shape({
        url: PropTypes.string.isRequired
    })
}

export default CartItem