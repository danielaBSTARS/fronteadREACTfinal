import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/GridLegacy";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
} from "@mui/icons-material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook />, label: "Facebook", href: "#" },
    { icon: <Instagram />, label: "Instagram", href: "#" },
    { icon: <Twitter />, label: "Twitter", href: "#" },
    { icon: <LinkedIn />, label: "LinkedIn", href: "#" },
  ];

  const footerLinks = [
    { label: "Privacidad", href: "#" },
    { label: "Términos", href: "#" },
    { label: "Soporte", href: "#" },
    { label: "Blog", href: "#" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#07090f",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        color: "#fff",
        py: 8,
        marginTop: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} sx={{ mb: 6 }}>

          {/* Branding */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Box sx={{
                bgcolor: "#4f46e5",
                borderRadius: "10px",
                p: 0.8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem", px: 0.3 }}>
                  MF
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#fff" }}>
                FinanzasMJ
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.35)", lineHeight: 1.8, fontSize: "0.875rem" }}>
              Tu compañero de confianza para gestionar finanzas personales con claridad y seguridad.
            </Typography>
          </Grid>

          {/* Producto */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle2" sx={{
              mb: 2, fontWeight: 600, color: "rgba(255,255,255,0.5)",
              fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px"
            }}>
              Producto
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              {["Dashboard", "Reportes", "Metas"].map((link) => (
                <Link key={link} href="#" underline="none" sx={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "0.875rem",
                  transition: "color 0.2s",
                  "&:hover": { color: "#fff" },
                }}>
                  {link}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Recursos */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle2" sx={{
              mb: 2, fontWeight: 600, color: "rgba(255,255,255,0.5)",
              fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px"
            }}>
              Recursos
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              {["Blog", "Soporte", "Documentación"].map((link) => (
                <Link key={link} href="#" underline="none" sx={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "0.875rem",
                  transition: "color 0.2s",
                  "&:hover": { color: "#fff" },
                }}>
                  {link}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Redes */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" sx={{
              mb: 2, fontWeight: 600, color: "rgba(255,255,255,0.5)",
              fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px"
            }}>
              Síguenos
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  href={social.href}
                  size="small"
                  sx={{
                    color: "rgba(255,255,255,0.4)",
                    bgcolor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "8px",
                    transition: "all 0.2s",
                    "&:hover": {
                      color: "#fff",
                      bgcolor: "rgba(99,102,241,0.15)",
                      borderColor: "rgba(99,102,241,0.3)",
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", my: 4 }} />

        {/* Bottom */}
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.25)", fontSize: "0.825rem" }}>
              © {currentYear} FinanzasMJ. Todos los derechos reservados.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: "left", md: "right" }, mt: { xs: 2, md: 0 } }}>
            <Box sx={{ display: "flex", gap: 3, justifyContent: { xs: "flex-start", md: "flex-end" } }}>
              {footerLinks.map((link) => (
                <Link key={link.label} href={link.href} underline="none" sx={{
                  color: "rgba(255,255,255,0.25)",
                  fontSize: "0.825rem",
                  transition: "color 0.2s",
                  "&:hover": { color: "#fff" },
                }}>
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;