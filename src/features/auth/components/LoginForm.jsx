import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
  CircularProgress,
  Stack,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useValidation } from '../hooks/useValidation';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const { validateEmail, validatePassword } = useValidation();

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'El email es requerido';
    else if (!validateEmail(email)) newErrors.email = 'Email inválido';
    if (!password) newErrors.password = 'La contraseña es requerida';
    else if (!validatePassword(password)) newErrors.password = 'Mínimo 6 caracteres';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccess('');
    if (!validateForm()) return;
    setLoading(true);
    try {
      await login(email.trim(), password);
      setSuccess('¡Sesión iniciada correctamente!');
      setEmail('');
      setPassword('');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      setServerError(error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#4f46e5',
        p: 2
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: '2.5rem 2rem',
          width: '100%',
          maxWidth: 400,
          borderRadius: '16px',
        }}
      >
        {/* Ícono superior */}
        <Box sx={{
          width: 44,
          height: 44,
          borderRadius: '12px',
          background: '#4f46e5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 2
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </Box>

        <Typography
          variant="h6"
          sx={{ textAlign: 'center', fontWeight: 600, color: '#111', mb: 0.5 }}
        >
          Bienvenido de vuelta
        </Typography>

        <Typography
          variant="body2"
          sx={{ textAlign: 'center', color: '#888', mb: 3 }}
        >
          Inicia sesión en tu cuenta
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {serverError && <Alert severity="error" sx={{ borderRadius: 2 }}>{serverError}</Alert>}
          {success && <Alert severity="success" sx={{ borderRadius: 2 }}>{success}</Alert>}

          <TextField
            label="Correo electrónico"
            type="email"
            size="small"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            disabled={loading}
            placeholder="tu@email.com"
          />

          <TextField
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            size="small"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            disabled={loading}
            placeholder="Mínimo 6 caracteres"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Typography
            variant="body2"
            sx={{
              textAlign: 'right',
              color: '#4f46e5',
              cursor: 'pointer',
              mt: -1,
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            ¿Olvidaste tu contraseña?
          </Typography>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.3,
              fontWeight: 600,
              borderRadius: 2,
              background: '#4f46e5',
              boxShadow: 'none',
              '&:hover': { background: '#4338ca', boxShadow: 'none' }
            }}
          >
            {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Iniciar sesión'}
          </Button>

          <Stack direction="row" justifyContent="center" spacing={1}>
            <Typography variant="body2" color="#888">
              ¿No tienes cuenta?
            </Typography>
            <Typography
              component="button"
              variant="body2"
              sx={{
                background: 'none',
                border: 'none',
                color: '#4f46e5',
                cursor: 'pointer',
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
              onClick={() => navigate('/register')}
            >
              Regístrate
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}