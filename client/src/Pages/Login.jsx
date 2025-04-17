import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { AppBar, Toolbar, Typography, Button, Box, Stack } from '@mui/material';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSnackbar } from 'notistack'; 
import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {config} from '../config/config';
import { useUser } from '../context/UserContext';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

const LoginPage = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserData } = useUser();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      enqueueSnackbar('Please enter both email and password', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' } }); 
      return;
    }

    try {
      const data = {
        email: email,
        password: password,
      };

      const response = await fetch(`${config.URL1}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      //console.log(responseData.user.result.first_name)
      if (response.ok) { 
        //console.log(responseData)
        const token = responseData.token;
        //console.log(token)
        
        if (token) {
          localStorage.setItem('token', token);
          setUserData({ username: responseData.user.result.first_name, email: responseData.user.result.email });
          navigate("/home");
          console.log("login successful");
        } else {
          alert('Token not found in the response');
          navigate('/')
          console.error('Token not found');
        }
      } else {
        enqueueSnackbar('Login failed either email or password is incorrect', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
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
    <ThemeProvider theme={defaultTheme}>
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setemail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
          <Link href="/signup" variant="body2">
            Create an account ? Sign Up
          </Link>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </>
  )
}

export default LoginPage;