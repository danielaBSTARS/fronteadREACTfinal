// 🔥 Validaciones reutilizables
export const useValidation = () => {
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validatePasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'email':
        if (!value.trim()) return 'El email es requerido';
        if (!validateEmail(value)) return 'Email inválido';
        return '';
      
      case 'password':
        if (!value) return 'La contraseña es requerida';
        if (!validatePassword(value)) return 'Mínimo 6 caracteres';
        return '';
      
      case 'confirmPassword':
        if (!value) return 'Confirma la contraseña';
        return '';
      
      default:
        return '';
    }
  };

  return {
    validateEmail,
    validatePassword,
    validatePasswordMatch,
    validateField
  };
};
