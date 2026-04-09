import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { CreditCard } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: "Inicio", target: "inicio" },
    { label: "Beneficios", target: "beneficios" },
    { label: "Finanzas", target: "finanzas" },
    { label: "Reportes", target: "reportes" },
    { label: "Planes", target: "planes" },
    { label: "API", target: "api" },
  ];

  const scrollToSection = (target) => {
    const section = document.getElementById(target);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const drawer = (
    <Box sx={{ width: 260, p: 3, bgcolor: "#07090f", height: "100%" }}>
      {/* Logo en drawer */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <Box sx={{
          bgcolor: "#4f46e5",
          borderRadius: "10px",
          p: 0.8,
          display: "flex",
          alignItems: "center",
        }}>
          <CreditCard sx={{ fontSize: 20, color: "#fff" }} />
        </Box>
        <Typography sx={{ fontWeight: 700, color: "#fff", fontSize: "1.1rem" }}>
          FinanzasMJ
        </Typography>
      </Box>

      <List sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.label}
            onClick={() => {
              scrollToSection(item.target);
              setMobileOpen(false);
            }}
            sx={{
              borderRadius: "10px",
              color: "rgba(255,255,255,0.6)",
              '&:hover': {
                bgcolor: "rgba(99,102,241,0.12)",
                color: "#fff"
              }
            }}
          >
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
            />
          </ListItem>
        ))}
        <Box sx={{ mt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate('/login')}
            sx={{
              bgcolor: "#4f46e5",
              borderRadius: "10px",
              fontWeight: 600,
              boxShadow: "none",
              '&:hover': { bgcolor: "#4338ca", boxShadow: "none" }
            }}
          >
            Entrar
          </Button>
        </Box>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(7,9,15,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", py: 1.2, px: { xs: 2, md: 4 } }}>

          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{
              bgcolor: "#4f46e5",
              borderRadius: "10px",
              p: 0.8,
              display: "flex",
              alignItems: "center",
            }}>
              <CreditCard sx={{ fontSize: 20, color: "#fff" }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "#fff",
                letterSpacing: "-0.5px"
              }}
            >
              FinanzasMJ
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{
            display: { xs: "none", md: "flex" },
            gap: 0.5,
            alignItems: "center",
            bgcolor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "12px",
            px: 1,
            py: 0.5
          }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => scrollToSection(item.target)}
                sx={{
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  px: 1.5,
                  py: 0.8,
                  borderRadius: "8px",
                  color: "rgba(255,255,255,0.55)",
                  minWidth: "auto",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "rgba(99,102,241,0.12)",
                    color: "#fff",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Botón entrar desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              variant="contained"
              onClick={() => navigate('/login')}
              sx={{
                bgcolor: "#4f46e5",
                color: "#fff",
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: "10px",
                boxShadow: "none",
                fontSize: "0.875rem",
                "&:hover": {
                  bgcolor: "#4338ca",
                  boxShadow: "none",
                },
              }}
            >
              Entrar
            </Button>
          </Box>

          {/* Mobile Menu */}
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              display: { md: "none" },
              color: "rgba(255,255,255,0.7)",
              bgcolor: "rgba(255,255,255,0.06)",
              borderRadius: "8px",
              p: 0.8,
              '&:hover': { bgcolor: "rgba(255,255,255,0.1)" }
            }}
          >
            <MenuIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;