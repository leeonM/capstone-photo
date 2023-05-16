import React,{useState, useContext} from 'react'
import {Context} from "../Context"
import PropTypes from "prop-types"

const Image = ({className,img}) => {
    const [hovered, setHovered] = useState(false)
    const {toggleFavorites, addItem, cartItems, removeItem} = useContext(Context)

    function hover(){
        setHovered(true)
    }

    function notHovered(){
        setHovered(false)
    }

    const heartIcon = ()=>{
        if (img.isFavorite){
            return <i className="ri-heart-fill favorite" onClick={()=>toggleFavorites(img.id)}></i>
        } else if (hovered){
            return <i className="ri-heart-line favorite" onClick={()=>toggleFavorites(img.id)}></i>
        }
    } 
    const cartIcon = () =>{
        if(cartItems.find(item => img.id === item.id)){
            return <i className="ri-shopping-cart-fill cart" onClick={()=>removeItem(img.id)}></i>
        } else if (hovered){
            return <i className="ri-add-circle-line cart" onClick={()=>addItem(img)}></i>
        }
    }
  
    return (
    <div 
    onMouseEnter={hover} 
    onMouseLeave={notHovered} 
    className={`${className} image-container`}>
        <img src={img.url} className="image-grid" />
        {heartIcon()}
        {cartIcon()}
    </div>
  )
}

Image.propTypes = {
    className: PropTypes.string,
    img: PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool
    })
}

export default Image