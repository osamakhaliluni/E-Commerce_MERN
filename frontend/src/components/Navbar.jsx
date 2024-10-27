import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useAuth } from '../context/Auth/AuthContext';
import { Badge, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart/CartContext';

const settings = ['Cart', 'Orders', 'Log Out',];

function Navbar() {
    const { email, isAuthenticated, logout } = useAuth();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();
    const { cartItems } = useCart();

    const handleLogin = () => {
        navigate('/login');
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOption = (key) => {
        if (key === 'Log Out') {
            logout();
            navigate('/');
            handleCloseUserMenu();
        }
        else if (key === 'Cart') {
            navigate('/cart');
            handleCloseUserMenu();
        }
        else if (key === 'Orders') {
            navigate('/my-orders');
            handleCloseUserMenu();
        }
        else {
            handleCloseUserMenu();
        }
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCartPage = () => {
        navigate('/cart');
    }

    return (
        <AppBar position="sticky" sx={{ padding: 2 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant='text' onClick={() => navigate('/')} sx={{ color: 'white', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between' }}>
                        <StorefrontIcon sx={{ mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                fontSize: { xs: 20, md: 30 },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            E-COMMERCE APP
                        </Typography>
                    </Button>
                    <Box sx={{ flexGrow: 0 }}>
                        {isAuthenticated ? <>
                            <Tooltip title="Open settings">
                                <Grid container alignItems="center" gap={2} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between' }}>
                                    <Grid item>
                                        <IconButton aria-label="cart" onClick={handleCartPage}>
                                            <Badge badgeContent={cartItems.length} color="secondary">
                                                <ShoppingCartIcon htmlColor='white' />
                                            </Badge>
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <Typography>{email}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt={email || ''} src="/static/images/avatar/2.jpg" />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => handleOption(setting)}>
                                        <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </> : <Button variant='contained' color='warning' onClick={handleLogin}>Login</Button>}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
