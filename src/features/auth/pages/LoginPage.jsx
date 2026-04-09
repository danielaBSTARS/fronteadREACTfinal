import { Container, Box } from '@mui/material';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <Container>
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <LoginForm />
      </Box>
    </Container>
  );
}
