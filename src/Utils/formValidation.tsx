export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const validateEmail = (email: string): string | null => {
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address.';
  }
  return null;
};

export const validatePassword = (password: string, confirmPassword: string): string | null => {
  if (password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }
  return null;
};
