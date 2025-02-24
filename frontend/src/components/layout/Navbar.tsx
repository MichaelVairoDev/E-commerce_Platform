import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Container,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  ShoppingBag as ShoppingBagIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { logout } from "../../store/slices/authSlice";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { items } = useSelector((state: RootState) => state.cart);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    handleMenuClose();
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const menuItems = isAuthenticated
    ? [
        { text: "Mi Perfil", icon: <PersonIcon />, path: "/profile" },
        { text: "Mis Pedidos", icon: <ShoppingBagIcon />, path: "/orders" },
        {
          text: "Cerrar Sesión",
          icon: <LogoutIcon />,
          onClick: handleLogout,
        },
      ]
    : [
        { text: "Iniciar Sesión", icon: <LoginIcon />, path: "/login" },
        { text: "Registrarse", icon: <PersonAddIcon />, path: "/register" },
      ];

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
      PaperProps={{
        sx: {
          width: 240,
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <List sx={{ pt: 2 }}>
        <ListItem
          button
          component={RouterLink}
          to="/products"
          onClick={handleMobileMenuToggle}
        >
          <ListItemText primary="Productos" />
        </ListItem>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={item.path ? RouterLink : "button"}
            to={item.path}
            onClick={() => {
              if (item.onClick) item.onClick();
              else handleMobileMenuToggle();
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <AppBar position="sticky" color="default">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: { xs: 1, md: 0 },
              mr: { md: 4 },
              fontWeight: 700,
              letterSpacing: "-0.5px",
              color: "primary.main",
              textDecoration: "none",
              "&:hover": {
                color: "primary.dark",
              },
            }}
          >
            E-Commerce
          </Typography>

          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: "flex", gap: 2 }}>
              <Button
                component={RouterLink}
                to="/products"
                color="inherit"
                sx={{
                  fontWeight: 500,
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                Productos
              </Button>
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              component={RouterLink}
              to="/cart"
              color="inherit"
              sx={{
                "&:hover": {
                  color: "primary.main",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Badge
                badgeContent={items.length}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    animation: "bounce 0.3s ease-in-out",
                  },
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {isAuthenticated ? (
              <>
                <Tooltip title="Cuenta">
                  <IconButton onClick={handleProfileMenuOpen}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "primary.main",
                        fontSize: "1rem",
                      }}
                    >
                      {user?.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      borderRadius: 2,
                      minWidth: 180,
                    },
                  }}
                >
                  {menuItems.map((item) => (
                    <MenuItem
                      key={item.text}
                      component={item.path ? RouterLink : "button"}
                      to={item.path}
                      onClick={() => {
                        if (item.onClick) item.onClick();
                        else handleMenuClose();
                      }}
                      sx={{
                        gap: 1.5,
                        py: 1,
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                      }}
                    >
                      {item.icon}
                      {item.text}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              !isMobile && (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    component={RouterLink}
                    to="/login"
                    color="inherit"
                    startIcon={<LoginIcon />}
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    color="primary"
                    startIcon={<PersonAddIcon />}
                  >
                    Registrarse
                  </Button>
                </Box>
              )
            )}

            {isMobile && (
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleMobileMenuToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
      {renderMobileMenu()}
    </AppBar>
  );
};

export default Navbar;
