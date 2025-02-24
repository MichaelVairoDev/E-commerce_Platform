import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: <Facebook />, url: "#", label: "Facebook" },
    { icon: <Twitter />, url: "#", label: "Twitter" },
    { icon: <Instagram />, url: "#", label: "Instagram" },
    { icon: <LinkedIn />, url: "#", label: "LinkedIn" },
  ];

  const contactInfo = [
    { icon: <Email />, text: "info@ecommerce.com" },
    { icon: <Phone />, text: "+1 234 567 890" },
    { icon: <LocationOn />, text: "Ciudad, País" },
  ];

  const footerLinks = {
    Navegación: [
      { text: "Inicio", url: "/" },
      { text: "Productos", url: "/products" },
      { text: "Mi Cuenta", url: "/profile" },
      { text: "Carrito", url: "/cart" },
    ],
    Categorías: [
      { text: "Electrónicos", url: "/products?category=electronics" },
      { text: "Ropa", url: "/products?category=clothing" },
      { text: "Libros", url: "/products?category=books" },
      { text: "Deportes", url: "/products?category=sports" },
    ],
    Ayuda: [
      { text: "Centro de Ayuda", url: "#" },
      { text: "Términos y Condiciones", url: "#" },
      { text: "Política de Privacidad", url: "#" },
      { text: "Envíos y Devoluciones", url: "#" },
    ],
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        py: 6,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Información de la empresa */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                fontWeight: 700,
                mb: 2,
                display: "block",
              }}
            >
              E-Commerce
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Tu destino de compras en línea para encontrar los mejores
              productos con la mejor calidad y precios competitivos.
            </Typography>
            <Box sx={{ mt: 2 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    mr: 1,
                    color: "text.secondary",
                    "&:hover": {
                      color: "primary.main",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s",
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Enlaces de navegación */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid item xs={6} sm={4} md={2} key={title}>
              <Typography
                variant="subtitle1"
                color="text.primary"
                fontWeight={600}
                gutterBottom
              >
                {title}
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  p: 0,
                  m: 0,
                }}
              >
                {links.map((link) => (
                  <Box
                    component="li"
                    key={link.text}
                    sx={{
                      mb: 1,
                    }}
                  >
                    <Link
                      component={RouterLink}
                      to={link.url}
                      color="text.secondary"
                      sx={{
                        textDecoration: "none",
                        "&:hover": {
                          color: "primary.main",
                          textDecoration: "underline",
                        },
                        transition: "color 0.2s",
                      }}
                    >
                      {link.text}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}

          {/* Información de contacto */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="subtitle1"
              color="text.primary"
              fontWeight={600}
              gutterBottom
            >
              Contacto
            </Typography>
            <Box>
              {contactInfo.map((info, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                    color: "text.secondary",
                  }}
                >
                  <Box
                    sx={{
                      mr: 1,
                      color: "primary.main",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {info.icon}
                  </Box>
                  <Typography variant="body2">{info.text}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: "1px solid",
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} E-Commerce Platform. Todos los derechos
            reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
