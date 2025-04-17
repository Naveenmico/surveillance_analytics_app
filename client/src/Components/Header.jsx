import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Stack, IconButton, MenuItem, Menu } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const navItems = ['Dashboard', 'Alerts', 'Camera Manager', 'Tools', 'Setting'];

function Header() {
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(true);
    }
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    navigate('/user')
  }
  const handleLogout = () => {
    localStorage.removeItem('token'); // Example: Clear user from localStorage

    navigate('/'); // Redirect to login page
  };

  const handleNavItemClick = (item) => {
    const path = `/${item.toLowerCase().replace(' ', '-')}`;
    navigate(path);
  };
  const handleTitleClick = () => {
    navigate('/home');
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
      <Typography variant="h4" noWrap component="div" onClick={handleTitleClick}>
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
        >
          <Stack direction="row" spacing={2} alignItems="center">
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }} onClick={() => handleNavItemClick(item)}>
                {item}
              </Button>
            ))}
            {auth && (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            )}
          </Stack>
          {auth && (
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
