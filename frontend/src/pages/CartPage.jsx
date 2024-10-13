import { useCart } from "../context/cart/CartContext";
import { Alert, Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import * as React from 'react';
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const { cartItems, totalPrice, updateItemInCart, removeItemFromCart, clearCart } = useCart();
    const [error, setError] = React.useState("");
    const navigate = useNavigate();

    const clearErrorAfterDelay = () => {
        setTimeout(() => {
            setError(null);
        }, 5000);  // Clears the error after 5 seconds
    };

    return (
        <Container sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            {error ? <Alert severity="error">{error}</Alert> : null}

            <Typography variant="h3" textAlign={"center"} sx={{ mt: 2 }}>My Cart</Typography>
            <Button variant="outlined" onClick={() => { clearCart() }}>Clear Cart</Button>
            {cartItems.length ? <Box> <List sx={{ width: '100%', maxWidth: 600 }}>
                {cartItems.map((cartItem) => (
                    <ListItem alignItems="flex-start" key={cartItem.id} sx={{
                        marginTop: 2,
                        borderWidth: 1,
                        borderColor: "blue",
                        borderStyle: "solid",
                        borderRadius: 5
                    }}>
                        <ListItemAvatar>
                            <Avatar sx={{ width: 60, height: 60, mr: 2 }} alt={cartItem.title} src={cartItem.image} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={cartItem.title}
                            secondary={
                                <React.Fragment>
                                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            sx={{ color: 'text.primary', display: 'inline' }}
                                        >
                                            {cartItem.price} EGP
                                        </Typography>
                                        {cartItem.quantity} items
                                        <ButtonGroup variant="contained">
                                            <Button onClick={async () => {
                                                if (cartItem.quantity <= 1) { return; }
                                                try {
                                                    await updateItemInCart(cartItem.id, cartItem.quantity - 1)
                                                } catch (e) {
                                                    setError(e.message);
                                                    clearErrorAfterDelay();
                                                }
                                            }}>-</Button>
                                            <Button onClick={async () => {
                                                try {
                                                    await updateItemInCart(cartItem.id, cartItem.quantity + 1)
                                                } catch (e) {
                                                    setError(e.message);
                                                    clearErrorAfterDelay();
                                                }
                                            }}>+</Button>
                                        </ButtonGroup>
                                    </Box>
                                    <Button variant="outlined" onClick={() => { removeItemFromCart(cartItem.id) }}>Remove Item</Button>
                                </React.Fragment>
                            }
                        />
                    </ListItem>))}
            </List>
                <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} mt={2}>
                    <Typography variant="h5" color="info" sx={{ mt: 3 }}>Total Price: {totalPrice} EGP</Typography>
                    <Button variant="outlined" onClick={() => { navigate('/checkout') }}>CheckOut</Button>
                </Box>
            </Box> : <Typography>Your Cart is empty</Typography>}
        </Container>
    );
}

export default CartPage;