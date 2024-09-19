import { Box, Container, Grid } from "@mui/material";
import ProductCard from "../components/productCArd";
import { useEffect, useState } from "react";
import Alert from '@mui/material/Alert';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/products`).then(async (response) => {
            if (response.status !== 200) {
                throw new Error(`Failed to fetch products:${response.status}`);
            }
            const data = await response.json();
            setProducts(data);
        }).catch((e) => {
            setError(true);
            setErrorMessage(e.message);
            console.error(e.json());
        });
    }, []);
    if (error) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Alert severity="error" variant="standard"> {errorMessage}, please try again</Alert>
            </Box>
        );
    }
    return (
        <Container sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                {products.map((product) => {
                    return <Grid item key={product._id} md={4}>
                        <ProductCard {...product} />
                    </Grid>;
                })}
            </Grid>
        </Container>
    );
}

export default HomePage;