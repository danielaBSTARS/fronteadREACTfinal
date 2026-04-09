import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";
import API from "../features/auth/api/axios";
import { Box, TextField, Button, Card, CardContent, Typography, Grid, CircularProgress, Chip } from "@mui/material";
import { Delete, Edit, WarningAmber, CalendarMonth, Category } from "@mui/icons-material";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout, token } = useAuth();

  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ codigo: "", mensaje: "", modulo: "" });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!token) return;
    const fetchLogs = async () => { await obtenerLogs(); };
    fetchLogs();
  }, [token]);

  const obtenerLogs = async () => {
    setLoading(true);
    try {
      const res = await API.get("/logs");
      setLogs(res.data);
    } catch (error) {
      console.error("Error trayendo logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const guardarLog = async () => {
    if (!form.codigo || !form.mensaje || !form.modulo) {
      setErrorMsg("Todos los campos son obligatorios");
      return;
    }
    setErrorMsg("");
    setSaving(true);
    const logData = { ...form, metadata: { user_agent: navigator.userAgent } };
    try {
      if (editingIndex !== null) {
        await API.put(`/logs/${logs[editingIndex]._id}`, logData);
      } else {
        await API.post("/logs", logData);
      }
      await obtenerLogs();
      setForm({ codigo: "", mensaje: "", modulo: "" });
      setEditingIndex(null);
    } catch (error) {
      console.error(error.response);
      if (error.response?.status === 401) {
        setErrorMsg("Sesión expirada. Redirigiendo...");
        setTimeout(() => { logout(); navigate("/"); }, 2000);
      } else {
        setErrorMsg(error.response?.data?.message || "Error al guardar el log");
      }
    } finally {
      setSaving(false);
    }
  };

  const eliminarLog = async (index) => {
    try {
      await API.delete(`/logs/${logs[index]._id}`);
      await obtenerLogs();
    } catch (error) {
      console.error("Error eliminando:", error);
    }
  };

  const editarLog = (index) => {
    const log = logs[index];
    setForm({ codigo: log.codigo, mensaje: log.mensaje, modulo: log.modulo });
    setEditingIndex(index);
  };

  const logsFiltrados = logs.filter((log) =>
    log.mensaje?.toLowerCase().includes(search.toLowerCase()) ||
    log.modulo?.toLowerCase().includes(search.toLowerCase()) ||
    String(log.codigo).includes(search)
  );

  const hoy = logs.filter(l => new Date(l.fecha).toDateString() === new Date().toDateString()).length;
  const modulos = [...new Set(logs.map(l => l.modulo))].length;

  return (
    <Box sx={{
      p: { xs: 2, md: 4 },
      bgcolor: "#07090f",
      minHeight: "100vh",
      color: "#e8eaf0"
    }}>

      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        sx={{
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          pb: 3
        }}
      >
        <Box>
          <Chip
            label="● SISTEMA ACTIVO"
            size="small"
            sx={{
              mb: 1.5,
              bgcolor: 'rgba(99,102,241,0.15)',
              color: '#818cf8',
              border: '1px solid rgba(99,102,241,0.3)',
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: 1
            }}
          />
          <Typography variant="h4" fontWeight={700} sx={{ lineHeight: 1.2 }}>
            Error{' '}
            <span style={{ color: '#6366f1' }}>Log</span>
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', letterSpacing: 1 }}>
            monitor y control de errores del sistema
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          onClick={() => { logout(); navigate("/"); }}
          sx={{
            borderColor: 'rgba(239,68,68,0.4)',
            color: '#f87171',
            borderRadius: 2,
            '&:hover': { bgcolor: 'rgba(239,68,68,0.08)', borderColor: '#f87171' }
          }}
        >
          Cerrar sesión
        </Button>
      </Box>

      {/* STATS */}
      <Grid container spacing={2} mb={4}>
        {[
          {
            label: 'Total errores',
            value: logs.length,
            color: '#818cf8',
            icon: <WarningAmber sx={{ fontSize: 22, color: 'rgba(129,140,248,0.4)' }} />
          },
          {
            label: 'Registrados hoy',
            value: hoy,
            color: '#fbbf24',
            icon: <CalendarMonth sx={{ fontSize: 22, color: 'rgba(251,191,36,0.4)' }} />
          },
          {
            label: 'Módulos afectados',
            value: modulos,
            color: '#34d399',
            icon: <Category sx={{ fontSize: 22, color: 'rgba(52,211,153,0.4)' }} />
          }
        ].map((stat, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card sx={{
              bgcolor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 3,
              p: 0
            }}>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', letterSpacing: 0.5 }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="h4" fontWeight={700} sx={{ color: stat.color, mt: 0.5 }}>
                    {stat.value}
                  </Typography>
                </Box>
                {stat.icon}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* SEARCH */}
      <TextField
        fullWidth
        size="small"
        placeholder="Buscar por módulo, mensaje o código..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': {
            bgcolor: 'rgba(255,255,255,0.04)',
            borderRadius: 2,
            color: '#e8eaf0',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.08)' },
            '&:hover fieldset': { borderColor: 'rgba(99,102,241,0.4)' },
            '&.Mui-focused fieldset': { borderColor: '#6366f1' }
          },
          '& input::placeholder': { color: 'rgba(255,255,255,0.25)' }
        }}
      />

      <Grid container spacing={3}>
        {/* FORM */}
        <Grid item xs={12} md={4}>
          <Card sx={{
            position: 'sticky',
            top: 24,
            bgcolor: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 3,
            p: 2.5
          }}>
            <Typography variant="subtitle2" fontWeight={600} mb={2.5} sx={{ color: '#e8eaf0' }}>
              {editingIndex !== null ? '✏️  Editar registro' : '＋  Nuevo error'}
            </Typography>

            {['codigo', 'modulo', 'mensaje'].map((field) => (
              <TextField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                value={form[field]}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'rgba(255,255,255,0.04)',
                    borderRadius: 2,
                    color: '#e8eaf0',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.08)' },
                    '&:hover fieldset': { borderColor: 'rgba(99,102,241,0.4)' },
                    '&.Mui-focused fieldset': { borderColor: '#6366f1' }
                  },
                  '& label': { color: 'rgba(255,255,255,0.35)' },
                  '& label.Mui-focused': { color: '#818cf8' }
                }}
              />
            ))}

            {errorMsg && (
              <Chip
                label={errorMsg}
                size="small"
                sx={{
                  mb: 2,
                  bgcolor: 'rgba(239,68,68,0.1)',
                  color: '#f87171',
                  border: '1px solid rgba(239,68,68,0.2)',
                  width: '100%',
                  borderRadius: 2
                }}
              />
            )}

            <Button
              variant="contained"
              fullWidth
              onClick={guardarLog}
              disabled={saving}
              sx={{
                mb: 1,
                borderRadius: 2,
                fontWeight: 600,
                boxShadow: 'none',
                bgcolor: editingIndex !== null ? '#d97706' : '#4f46e5',
                '&:hover': {
                  bgcolor: editingIndex !== null ? '#b45309' : '#4338ca',
                  boxShadow: 'none'
                }
              }}
            >
              {saving
                ? <CircularProgress size={20} sx={{ color: '#fff' }} />
                : editingIndex !== null ? 'Actualizar registro' : 'Registrar error'
              }
            </Button>

            {editingIndex !== null && (
              <Button
                variant="outlined"
                fullWidth
                onClick={() => { setEditingIndex(null); setForm({ codigo: "", mensaje: "", modulo: "" }); }}
                sx={{
                  borderRadius: 2,
                  borderColor: 'rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.5)',
                  '&:hover': { borderColor: 'rgba(255,255,255,0.25)', bgcolor: 'rgba(255,255,255,0.04)' }
                }}
              >
                Cancelar edición
              </Button>
            )}
          </Card>
        </Grid>

        {/* LOGS */}
        <Grid item xs={12} md={8}>
          {loading ? (
            <Box display="flex" justifyContent="center" mt={6}>
              <CircularProgress sx={{ color: '#6366f1' }} />
            </Box>
          ) : logsFiltrados.length === 0 ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={8}
              sx={{ color: 'rgba(255,255,255,0.2)' }}
            >
              <WarningAmber sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="body2">No hay errores registrados</Typography>
            </Box>
          ) : (
            logsFiltrados.map((log, i) => (
              <Card
                key={log._id}
                sx={{
                  mb: 1.5,
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  bgcolor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 3,
                  transition: 'border-color 0.2s',
                  '&:hover': { borderColor: 'rgba(99,102,241,0.3)' }
                }}
              >
                <Box>
                  <Typography variant="subtitle2" fontWeight={600} sx={{ color: '#e8eaf0' }}>
                    {log.modulo}
                  </Typography>
                  <Chip
                    label={`#${log.codigo}`}
                    size="small"
                    sx={{
                      my: 0.5,
                      height: 20,
                      fontSize: 11,
                      bgcolor: 'rgba(251,191,36,0.1)',
                      color: '#fbbf24',
                      border: '1px solid rgba(251,191,36,0.2)'
                    }}
                  />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
                    {log.mensaje}
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column" gap={0.5} ml={2}>
                  <Button
                    size="small"
                    startIcon={<Edit sx={{ fontSize: 14 }} />}
                    onClick={() => editarLog(i)}
                    sx={{
                      fontSize: 12,
                      color: '#818cf8',
                      borderRadius: 2,
                      '&:hover': { bgcolor: 'rgba(99,102,241,0.1)' }
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Delete sx={{ fontSize: 14 }} />}
                    onClick={() => eliminarLog(i)}
                    sx={{
                      fontSize: 12,
                      color: '#f87171',
                      borderRadius: 2,
                      '&:hover': { bgcolor: 'rgba(239,68,68,0.08)' }
                    }}
                  >
                    Eliminar
                  </Button>
                </Box>
              </Card>
            ))
          )}
        </Grid>
      </Grid>
    </Box>
  );
};