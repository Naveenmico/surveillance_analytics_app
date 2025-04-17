import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { AppBar, Toolbar, Typography, Button, Box, Stack } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {config} from '../config/config';

function RegistrationPage() {
  const [first_name, setfirst_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!first_name || !email || !password) {
      alert('Please enter all fields');
      return;
    }

    try {
      const data = {
        first_name: first_name,
        email: email,
        password: password,
      };

      const response = await fetch(`${config.URL1}auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigate('/');
      } else {
        const errorMessage = await response.text();
        alert(`Registration failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed. Please try again later.');
    }
  };

  return (
    <>
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h4" noWrap component="div">
          <b>Okean</b>
        </Typography>
        <Box
          sx={{
            display: { xs: 'none', sm: 'block' },
            position: 'fixed',
            top: 0,
            right: 0,
            marginRight: '10px', // Adjust the margin as needed
            marginTop: '10px', // Adjust the margin as needed
            zIndex: 999, // Ensure the box appears above other content
          }}
        ></Box>
      </Toolbar>
    </AppBar>
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create an Account
          </Typography>
          <Box component="form" onSubmit={handleRegistration} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="first_name"
              label="First Name"
              name="first_name"
              autoComplete="fname"
              autoFocus
              onChange={(e) => setfirst_name(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
          <Link href="/" variant="body2">
            Already have an account? Sign in
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  );
}

export default RegistrationPage;
