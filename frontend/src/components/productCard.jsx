import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCart } from '../context/cart/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth/AuthContext';

// eslint-disable-next-line react/prop-types
export default function ProductCard({ _id, title, price, image, description }) {
    const { addItemToCart } = useCart();
    const navigate = useNavigate();
    const { token } = useAuth();

    return (
        <Card>
            <CardMedia
                component="img"
                alt="product"
                height="200"
                image={image}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography height={100} sx={{
                    overflowY: 'scroll',
                    '::-webkit-scrollbar': {
                        width: '5px',
                        backgroundColor: '#f1f1f1',
                        display: 'inline-block',
                        margin: '4px',
                        transition: 'background-color 0.3s ease'
                    },
                    '::-webkit-scrollbar-thumb': {
                        backgroundColor: '#888',
                        width: '100%',
                        transition: 'background-color 0.3s ease'
                    },
                }}>
                    {description}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    EGP {price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant='contained' onClick={() => { if (!token) { navigate('/login'); return; } addItemToCart({ id: _id, title, price, image }) }} size="small">Add to Cart</Button>
            </CardActions>
        </Card>
    );
}
