import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/GridLegacy";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {
  TrendingUp,
  PieChart,
  LockOpen,
  CheckCircle,
} from "@mui/icons-material";
import { Api } from "../../shared/components/ApiRy";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <TrendingUp sx={{ fontSize: 36 }} />,
    title: "Seguimiento en Tiempo Real",
    description: "Visualiza todos tus movimientos financieros al instante.",
    color: "#818cf8",
  },
  {
    icon: <PieChart sx={{ fontSize: 36 }} />,
    title: "Análisis Detallado",
    description: "Gráficos y reportes claros para entender tus patrones.",
    color: "#f472b6",
  },
];

const Content = ({ children }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleElegirPlan = (plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <Box sx={{ bgcolor: "#07090f", minHeight: "auto" }}>

      {/* MODAL DE PAGO */}
      {modalOpen && (
        <Box
          onClick={() => setModalOpen(false)}
          sx={{
            position: "fixed", inset: 0, zIndex: 1300,
            bgcolor: "rgba(0,0,0,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            p: 2
          }}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              bgcolor: "#0e1117",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              p: 4, width: "100%", maxWidth: 400, textAlign: "center"
            }}
          >
            <Box sx={{
              width: 52, height: 52, borderRadius: "14px",
              bgcolor: "rgba(99,102,241,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              mx: "auto", mb: 2
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <path d="M2 10h20"/>
              </svg>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff", mb: 0.5 }}>
              Plan {selectedPlan?.title}
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", mb: 3 }}>
              Para continuar necesitas una cuenta
            </Typography>

            <Box sx={{
              bgcolor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "12px", p: 2, mb: 3
            }}>
              <Typography sx={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", mb: 0.5 }}>
                Total a pagar
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: selectedPlan?.accent }}>
                {selectedPlan?.price}
              </Typography>
            </Box>

            <Button
              fullWidth variant="contained"
              onClick={() => navigate("/register")}
              sx={{
                bgcolor: "#4f46e5", color: "#fff", fontWeight: 600, py: 1.3,
                borderRadius: "10px", boxShadow: "none", mb: 1.5,
                "&:hover": { bgcolor: "#4338ca", boxShadow: "none" }
              }}
            >
              Crear cuenta
            </Button>

            <Button
              fullWidth variant="outlined"
              onClick={() => navigate("/login")}
              sx={{
                borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)",
                fontWeight: 600, py: 1.3, borderRadius: "10px",
                "&:hover": { borderColor: "rgba(255,255,255,0.25)", bgcolor: "rgba(255,255,255,0.04)" }
              }}
            >
              Ya tengo cuenta
            </Button>

            <Typography
              onClick={() => setModalOpen(false)}
              sx={{
                mt: 2, fontSize: "0.8rem", color: "rgba(255,255,255,0.25)",
                cursor: "pointer", "&:hover": { color: "rgba(255,255,255,0.5)" }
              }}
            >
              Cancelar
            </Typography>
          </Box>
        </Box>
      )}

      {/* HERO */}
      <Box
        id="inicio"
        sx={{
          bgcolor: "#07090f",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          py: { xs: 10, md: 16 },
          px: { xs: 3, md: 0 },
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{
          position: "absolute", width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          top: "50%", left: "30%", transform: "translate(-50%, -50%)", pointerEvents: "none"
        }} />

        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">

            {/* TEXTO izquierda */}
            <Grid item xs={12} md={6}>
              <Box sx={{
                display: "inline-block", bgcolor: "rgba(99,102,241,0.12)",
                border: "1px solid rgba(99,102,241,0.25)", borderRadius: "999px",
                px: 2.5, py: 0.6, mb: 3
              }}>
                <Typography sx={{ fontSize: 12, color: "#818cf8", fontWeight: 600, letterSpacing: 1 }}>
                  ● PLATAFORMA FINANCIERA INTELIGENTE
                </Typography>
              </Box>

              <Typography variant="h2" sx={{
                fontWeight: 800, mb: 2.5, lineHeight: 1.15,
                fontSize: { xs: "2rem", md: "3.2rem" }, color: "#fff", letterSpacing: "-1px"
              }}>
                Controla tus{" "}
                <Box component="span" sx={{ color: "#818cf8" }}>Finanzas</Box>{" "}
                Inteligentemente
              </Typography>

              <Typography sx={{
                mb: 5, fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.7,
                color: "rgba(255,255,255,0.5)", maxWidth: 480,
              }}>
                Organiza tus gastos, ahorra mejor y toma decisiones financieras con confianza usando nuestra plataforma FinanzasMJ.
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => document.getElementById("planes")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  sx={{
                    bgcolor: "#4f46e5", color: "#fff", px: 4, py: 1.4,
                    borderRadius: "10px", fontWeight: 600, fontSize: "0.95rem",
                    boxShadow: "none", "&:hover": { bgcolor: "#4338ca", boxShadow: "none" },
                  }}
                >
                  Comenzar ahora
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => document.getElementById("beneficios")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  sx={{
                    borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)",
                    px: 4, py: 1.4, borderRadius: "10px", fontWeight: 600, fontSize: "0.95rem",
                    "&:hover": { borderColor: "rgba(255,255,255,0.3)", bgcolor: "rgba(255,255,255,0.05)" },
                  }}
                >
                  Ver funciones
                </Button>
              </Box>
            </Grid>

            {/* IMAGEN derecha */}
            <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
              <Box sx={{ position: "relative", width: "100%", maxWidth: 520 }}>
                {/* Glow */}
                <Box sx={{
                  position: "absolute", inset: -20, borderRadius: "24px",
                  background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
                  pointerEvents: "none"
                }} />

                {/* Imagen */}
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop"
                  alt="Dashboard financiero"
                  sx={{
                    width: "100%", borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "block", position: "relative", zIndex: 1,
                  }}
                />

                {/* Tarjeta flotante inferior */}
                <Box sx={{
                  position: "absolute", bottom: -20, left: -20, zIndex: 2,
                  bgcolor: "#0e1117", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "14px", px: 2.5, py: 1.5,
                  display: "flex", alignItems: "center", gap: 1.5,
                }}>
                  <Box sx={{
                    width: 36, height: 36, borderRadius: "10px",
                    bgcolor: "rgba(52,211,153,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <TrendingUp sx={{ fontSize: 18, color: "#34d399" }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                      Ahorro este mes
                    </Typography>
                    <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#34d399" }}>
                      +$1,240
                    </Typography>
                  </Box>
                </Box>

                {/* Tarjeta flotante superior */}
                <Box sx={{
                  position: "absolute", top: -16, right: -16, zIndex: 2,
                  bgcolor: "#0e1117", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "14px", px: 2.5, py: 1.5,
                  display: "flex", alignItems: "center", gap: 1.5,
                }}>
                  <Box sx={{
                    width: 36, height: 36, borderRadius: "10px",
                    bgcolor: "rgba(129,140,248,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <PieChart sx={{ fontSize: 18, color: "#818cf8" }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                      Usuarios activos
                    </Typography>
                    <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>
                      +1,000
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* FEATURES */}
      <Box id="beneficios" sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 0 }, bgcolor: "#07090f", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, textAlign: "center", color: "#fff", fontSize: { xs: "1.6rem", md: "2.2rem" }, letterSpacing: "-0.5px" }}>
            Beneficios de usar FinanzasMJ
          </Typography>
          <Typography sx={{ textAlign: "center", color: "rgba(255,255,255,0.35)", mb: 6, fontSize: "1rem" }}>
            Todo lo que necesitas para gestionar tu dinero con confianza
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{
                  height: "100%", p: 3, borderRadius: "16px",
                  bgcolor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "none", transition: "border-color 0.2s",
                  "&:hover": { borderColor: "rgba(99,102,241,0.35)" },
                }}>
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{
                      width: 44, height: 44, borderRadius: "10px",
                      bgcolor: "rgba(99,102,241,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: feature.color, mb: 2
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#fff", fontSize: "1rem" }}>
                      {feature.title}
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.7, fontSize: "0.9rem" }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FINANZAS Y REPORTES */}
      <Box id="finanzas" sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 0 }, bgcolor: "#07090f", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {[
              { title: "Finanzas inteligentes", text: "Administra tus ingresos, planifica ahorros y encuentra los mejores pasos para lograr tus metas en tiempo real." },
              { title: "Reportes claros", text: "Genera reportes visuales que te ayudan a entender tendencias, reducir gastos innecesarios y maximizar tu capital." },
            ].map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{
                  borderRadius: "16px", p: 4,
                  bgcolor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "none", height: "100%", transition: "border-color 0.2s",
                  "&:hover": { borderColor: "rgba(99,102,241,0.35)" },
                }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#fff", letterSpacing: "-0.5px" }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                    {item.text}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* REPORTES */}
      <Box id="reportes" sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 0 }, bgcolor: "#07090f", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, textAlign: "center", color: "#fff", fontSize: { xs: "1.6rem", md: "2.2rem" }, letterSpacing: "-0.5px" }}>
            Reportes inteligentes
          </Typography>
          <Typography sx={{ textAlign: "center", color: "rgba(255,255,255,0.35)", mb: 6, fontSize: "1rem" }}>
            Convierte datos en decisiones con reportes fáciles de leer y acciones recomendadas.
          </Typography>
          <Grid container spacing={3}>
            {[
              { title: "Reportes automáticos", text: "Genera reportes actualizados cada día para seguir tu progreso.", color: "#818cf8" },
              { title: "Análisis claro", text: "Ve tendencias de gasto y áreas de ahorro sin complicaciones.", color: "#f472b6" },
              { title: "Exporta fácilmente", text: "Comparte reportes en PDF y dale seguimiento a tu equipo.", color: "#34d399" },
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{
                  p: 3, borderRadius: "16px",
                  bgcolor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "none", transition: "border-color 0.2s",
                  "&:hover": { borderColor: "rgba(99,102,241,0.35)" },
                }}>
                  <Box sx={{ width: 4, height: 32, borderRadius: "4px", bgcolor: item.color, mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#fff", fontSize: "1rem" }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.7, fontSize: "0.9rem" }}>
                    {item.text}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* API */}
      <Box id="api" sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 0 }, bgcolor: "#07090f", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, textAlign: "center", color: "#fff", fontSize: { xs: "1.6rem", md: "2.2rem" }, letterSpacing: "-0.5px" }}>
            API abierta para tu crecimiento
          </Typography>
          <Card sx={{
            p: 4, borderRadius: "16px",
            bgcolor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "none", mb: 4
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, color: "#fff" }}>
              Fácil integración
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.8, fontSize: "0.95rem" }}>
              Usa nuestra API para importar datos de gastos, consultar métricas y crear experiencias personalizadas en tu empresa.
            </Typography>
          </Card>
          <Box sx={{ mt: 4 }}>
            <Api />
          </Box>
        </Container>
      </Box>

      {/* STATS */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 3, md: 0 }, bgcolor: "#07090f", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {[
              { value: "+1000", label: "Usuarios activos", color: "#818cf8" },
              { value: "$5.2M", label: "Dinero gestionado", color: "#34d399" },
              { value: "98%", label: "Satisfacción", color: "#fbbf24" },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{
                  p: 3, textAlign: "center", borderRadius: "16px",
                  bgcolor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "none", transition: "border-color 0.2s",
                  "&:hover": { borderColor: "rgba(99,102,241,0.35)" },
                }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color, mb: 0.5, fontSize: "2rem" }}>
                    {stat.value}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 500, fontSize: "0.9rem" }}>
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* PLANES */}
      <Box id="planes" sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 0 }, bgcolor: "#07090f", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, textAlign: "center", color: "#fff", fontSize: { xs: "1.6rem", md: "2.2rem" }, letterSpacing: "-0.5px" }}>
            Elige el plan ideal para tu proyecto
          </Typography>
          <Typography sx={{ textAlign: "center", color: "rgba(255,255,255,0.35)", mb: 6, fontSize: "1rem" }}>
            Tres planes claros para empezar, escalar y crecer con FinanzasMJ.
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                title: "Básico", subtitle: "Ideal para comenzar", price: "$0",
                features: ["Control simple de gastos", "Reportes básicos", "1 usuario", "Acceso limitado a API"],
                accent: "#818cf8", featured: false,
              },
              {
                title: "Experto", subtitle: "Más popular", price: "$10/mes",
                features: ["Todo lo básico", "Alertas inteligentes", "Multiusuario", "Integración completa API"],
                accent: "#4f46e5", featured: true,
              },
              {
                title: "Deluxe", subtitle: "Para negocios avanzados", price: "$25/mes",
                features: ["Todo incluido", "IA financiera", "Análisis predictivo", "Soporte premium 24/7"],
                accent: "#34d399", featured: false,
              },
            ].map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{
                  height: "100%", borderRadius: "16px", overflow: "hidden", boxShadow: "none",
                  bgcolor: "rgba(255,255,255,0.04)",
                  border: plan.featured ? `1px solid ${plan.accent}` : "1px solid rgba(255,255,255,0.07)",
                  transition: "border-color 0.2s",
                  "&:hover": { borderColor: plan.accent },
                }}>
                  <Box sx={{ p: 3, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    {plan.featured && (
                      <Box sx={{
                        display: "inline-block", bgcolor: "rgba(79,70,229,0.15)",
                        border: "1px solid rgba(79,70,229,0.3)", borderRadius: "999px",
                        px: 2, py: 0.4, mb: 1.5
                      }}>
                        <Typography sx={{ fontSize: 11, color: "#818cf8", fontWeight: 600, letterSpacing: 1 }}>
                          MÁS POPULAR
                        </Typography>
                      </Box>
                    )}
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff", mb: 0.5 }}>
                      {plan.title}
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", mb: 2 }}>
                      {plan.subtitle}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: plan.accent }}>
                      {plan.price}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Box sx={{ display: "grid", gap: 1.5, mb: 3 }}>
                      {plan.features.map((feature, featureIndex) => (
                        <Box key={featureIndex} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <CheckCircle sx={{ color: plan.accent, fontSize: 18 }} />
                          <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem" }}>
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                    <Button
                      fullWidth variant="contained"
                      onClick={() => handleElegirPlan(plan)}
                      sx={{
                        bgcolor: plan.featured ? "#4f46e5" : "rgba(255,255,255,0.06)",
                        color: plan.featured ? "#fff" : "rgba(255,255,255,0.6)",
                        fontWeight: 600, py: 1.2, borderRadius: "10px", boxShadow: "none",
                        border: plan.featured ? "none" : "1px solid rgba(255,255,255,0.1)",
                        "&:hover": {
                          bgcolor: plan.featured ? "#4338ca" : "rgba(255,255,255,0.1)",
                          boxShadow: "none"
                        },
                      }}
                    >
                      Elegir plan
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ABOUT */}
      <Box sx={{ py: { xs: 8, md: 10 }, px: { xs: 3, md: 0 }, bgcolor: "#07090f" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, textAlign: "center", color: "#fff", fontSize: { xs: "1.6rem", md: "2rem" }, letterSpacing: "-0.5px" }}>
            ¿De qué trata esta página?
          </Typography>
          <Typography sx={{
            textAlign: "center", color: "rgba(255,255,255,0.4)",
            maxWidth: 700, mx: "auto", lineHeight: 1.8, fontSize: "1rem"
          }}>
            FinanzasMJ es un portal diseñado para ayudarte a gestionar tus finanzas personales y empresariales de forma clara y segura. Aquí encontrarás herramientas para monitorear gastos, recibir reportes inteligentes, tomar decisiones de ahorro y conectar tus datos mediante una API moderna.
          </Typography>
        </Container>
      </Box>

      {/* CONTENT SLOT */}
      <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 3, md: 0 }, bgcolor: "#07090f" }}>
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </Box>
  );
};

export default Content;