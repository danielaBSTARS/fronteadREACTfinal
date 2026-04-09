import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
  CircularProgress,
  Stack
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useValidation } from '../hooks/useValidation';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();
  const { validatePassword, validatePasswordMatch, validateEmail } = useValidation();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Mínimo 6 caracteres';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirma la contraseña';
    } else if (!validatePasswordMatch(password, confirmPassword)) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

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
      await register(email.trim(), password);
      setSuccess('¡Usuario registrado correctamente! Redirigiendo...');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      setServerError(error.message || 'Error al registrarse');
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
          Crear una cuenta
        </Typography>

        <Typography
          variant="body2"
          sx={{ textAlign: 'center', color: '#888', mb: 3 }}
        >
          Regístrate para comenzar
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
            type="password"
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
          />

          <TextField
            label="Confirmar contraseña"
            type="password"
            size="small"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
            }}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            fullWidth
            disabled={loading}
            placeholder="Repite tu contraseña"
          />

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
              mt: 1,
              '&:hover': { background: '#4338ca', boxShadow: 'none' }
            }}
          >
            {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Crear cuenta'}
          </Button>

          <Stack direction="row" justifyContent="center" spacing={1}>
            <Typography variant="body2" color="#888">
              ¿Ya tienes cuenta?
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
              onClick={() => navigate('/login')}
            >
              Inicia sesión
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}