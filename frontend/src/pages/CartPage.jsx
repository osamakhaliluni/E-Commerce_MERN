import { useCart } from "../context/cart/CartContext";
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";

const CartPage = () => {
    const { cartItems, totalPrice } = useCart();

    return (
        <Container>
            <Typography variant="h3" textAlign={"center"} sx={{ mt: 2 }}>My Cart</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {cartItems.map((cartItem) => (
                    <Grid item key={cartItem.id} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt="product"
                                height="200"
                                image={cartItem.image}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {cartItem.title}
                                </Typography>

                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    EGP {cartItem.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant='contained' size="small">Delete From Cart</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h5" color="info" sx={{ mt: 3 }}>Total Price: {totalPrice}</Typography>
        </Container>
    )
}

export default CartPage;