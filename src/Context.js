import React,{ useState,useEffect } from "react";
const Context = React.createContext()

function ContextProvider(props){
    const [allPhotos, setAllPhotos] = useState([])
    const [cartItems, setCartItems] = useState([])
    const url = "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"
    useEffect(() => {
      fetch(url)
      .then(res=>res.json())
      .then(data => setAllPhotos(data))
    }, [])


    const toggleFavorites = (id) =>{
        const updatedArray = allPhotos.map(photo=> {
            if (photo.id === id){
                return {...photo, isFavorite: !photo.isFavorite}
            } return photo
        })
        setAllPhotos(updatedArray)
        window.localStorage.setItem(`PHOTO_SETTINGS`, JSON.stringify(updatedArray))
    }

    const addItem = (newItem) => {
        setCartItems(prevItems=>([...prevItems,newItem]))
    }
 
    const removeItem = (id) => {
        setCartItems(prevItems=>(prevItems.filter(item=>item.id !== id)))
    }

    function emptyCart(){
        setCartItems([])
    }

    useEffect(()=> {
        try{
        const cartData = window.localStorage.getItem("CART_SETTINGS")
        if (cartData !== null) setCartItems(JSON.parse(cartData))}
        catch (err){
            console.log(err)
        }

    },[])

    useEffect(()=> {
        try{
        const photoData = window.localStorage.getItem("PHOTO_SETTINGS")
        if (photoData !== null) setAllPhotos(JSON.parse(photoData))
        }catch (err)
        {
            console.log(err)
        }
    },[allPhotos])


    useEffect(()=> {
        try{
            window.localStorage.setItem(`CART_SETTINGS`, JSON.stringify(cartItems))
        }catch (err){
            console.log(err)
        }
    },[cartItems])

    
    return (
        <Context.Provider value={{
            allPhotos, 
        toggleFavorites,
        cartItems, 
        addItem,
        removeItem, 
        emptyCart}}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}