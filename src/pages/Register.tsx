import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper
} from '@mui/material';
import authService from '../services/authService';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('請輸入使用者名稱')
        .min(3, '使用者名稱至少需要3個字元'),
      email: Yup.string()
        .email('請輸入有效的電子郵件')
        .required('請輸入電子郵件'),
      password: Yup.string()
        .required('請輸入密碼')
        .min(6, '密碼至少需要6個字元'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], '密碼不一致')
        .required('請確認密碼'),
    }),
    onSubmit: async (values) => {
      try {
        await authService.register({
          username: values.username,
          email: values.email,
          password: values.password,
        });
        navigate('/login');
      } catch (err: any) {
        setError(err.response?.data || '註冊失敗，請稍後再試');
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            註冊新帳號
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="使用者名稱"
              name="username"
              autoComplete="username"
              autoFocus
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="電子郵件"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密碼"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="確認密碼"
              type="password"
              id="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? '註冊中...' : '註冊'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                已有帳號？立即登入
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;