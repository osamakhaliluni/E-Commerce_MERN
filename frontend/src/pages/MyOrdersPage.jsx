
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Container } from "@mui/material";

const MyOrdersPage = () => {
    const { myOrders, getMyOrders } = useAuth();

    useEffect(() => {
        getMyOrders();
    }, []);
    console.log(myOrders);
    return (
        <Container maxWidth={false} disableGutters={true} sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: 2, mt: 3, width: '100%' }}>
            {myOrders ?
                myOrders.map((order) => (
                    <Card key={order._id} variant="outlined" sx={{ width: 700 }}>
                        <Box sx={{ p: 2 }}>
                            <Stack
                                direction="row"
                                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <Typography gutterBottom variant="h5" component="div">
                                    Order Date : {order.updatedAt.slice(0, 10)}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    {order.totalPrice} EGP
                                </Typography>
                            </Stack>
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                Shipping Address : {order.address}
                            </Typography>
                            <Typography>
                                Order Items: {order.products.length}
                            </Typography>
                        </Box>
                        <Divider />
                    </Card>))
                :
                <Typography>
                    No orders found. Please make sure you have placed any orders.
                </Typography>
            }
        </Container>
    );
}

export default MyOrdersPage;