import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line react/prop-types
export default function ProductCard({ title, price, image }) {
    console.log(`${import.meta.env.VITE_BASE_URL}${image}`);
    return (
        <Card>
            <CardMedia
                component="img"
                alt="product"
                height="200"
                image="/pro.png"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    EGP {price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant='contained' size="small">Add to Cart</Button>
            </CardActions>
        </Card>
    );
}
