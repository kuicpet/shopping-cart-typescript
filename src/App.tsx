import { useState } from "react";
import { useQuery } from "react-query";

// Components
import { Drawer, Grid, Badge, CircularProgress } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import Item from "./item/Item";
import Cart from "./Cart/Cart";
// Styles
import { Wrapper, Loading, StyledButton } from "./App.styles";
import "./App.css";
// Types
export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
}


const getProducts = async (): Promise<CartItemType[]> => {
    return await(await fetch("https://fakestoreapi.herokuapp.com/products/")).json();
};


const App = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[])
    
    const { data, isLoading, error } = useQuery<CartItemType[]>("products", getProducts);
    console.log(data)

    const getTotalItems = (items: CartItemType[]) => 
        cartItems.reduce((acc: number, item) => acc + item.amount, 0);

    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems(prev => {
            const isItemInCart = prev.find(item => item.id === clickedItem.id);
            // Is the item already added in cart
            if(isItemInCart){
                return prev.map(item => 
                    item.id === clickedItem.id
                    ? { ...item, amount: item.amount + 1 }
                    : item
                    );
            }
            // First time the item is added
            return [...prev, { ...clickedItem, amount: 1 }]
        })
    };

    const handleRemoveToCart = (id: number) => {
        setCartItems(
            prev => prev.reduce((acc, item) => {
                if (item.id === id) {
                    if (item.amount === 1)
                        return acc;
                    return [...acc, { ...item, amount: item.amount - 1 }];
                } else {
                    return [...acc, item];
                }
            }, [] as CartItemType[]))
    };



    if(isLoading){
        return (
            <Loading>
                <CircularProgress/>
                <p>Loading...</p>
            </Loading>
        )
    }
    if(error){
        return (
            <Loading>
                <b>Something went wrong...</b>
            </Loading>
        )
    }

    return (
        <Wrapper>
            <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveToCart} />
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color="error">
                    <AddShoppingCart/>
                </Badge>
            </StyledButton>
            <Grid container spacing={3} className="wrapper">
                {data?.map(item => (
                    <Grid item key={item.id} xs={12} sm={4}>
                        <Item item={item} handleAddToCart={handleAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    )
};

export default App;