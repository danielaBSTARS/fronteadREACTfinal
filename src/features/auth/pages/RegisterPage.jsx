import { Container, Box } from '@mui/material';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  return (
    <Container>
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <RegisterForm />
      </Box>
    </Container>
  );
}
