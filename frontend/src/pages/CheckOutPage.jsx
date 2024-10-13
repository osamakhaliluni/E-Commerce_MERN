import { useCart } from "../context/cart/CartContext";
import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const CheckOutPage = () => {
    const { cartItems, totalPrice } = useCart();
    const [message, setMessage] = React.useState("");
    const addressRef = React.useRef();
    const navigate = useNavigate();
    const { token } = useAuth();
    const afterDelay = () => {
        setTimeout(() => {
            setMessage("");
            navigate('/');
            window.location.reload();
        }, 5000);  // Clears the error after 5 seconds
    };

    const handleConfirmOrder = async () => {
        const address = addressRef.current.value;
        if (!address) {
            alert("Please enter your delivery address");
            return;
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cart/checkout`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        address,
                    }),
                }
            );
            if (!response.ok) {
                var errorMessage = await response.json();
                throw new Error(`Error clearing cart: ${errorMessage.message}`);
            }
            setMessage("Order successfully done");
            afterDelay();
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }

    return (
        <Container sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            {message ? <Alert severity="success">{message} </Alert> :
                <Box>
                    <Typography variant="h3" textAlign={"center"} sx={{ mt: 2 }}>CheckOut</Typography>
                    <Box> <List sx={{ width: '100%', maxWidth: 600, borderWidth: 0.5, borderColor: "black", borderStyle: "solid", borderRadius: 5 }}>
                        {cartItems.map((cartItem) => (
                            <ListItem alignItems="flex-start" key={cartItem.id} >
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
                                            </Box>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>))}
                    </List>
                        <Typography variant="h5" color="info" sx={{ m: 3 }}>Total Price: {totalPrice} EGP</Typography>
                        <TextField label="Delivery Address" name="address" inputRef={addressRef} fullWidth />
                        <Button onClick={handleConfirmOrder} variant="contained" color="warning" fullWidth sx={{ mt: 2 }}>Pay Now</Button>
                    </Box>
                </Box>
            }
        </Container>
    );
}

export default CheckOutPage;