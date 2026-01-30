import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Menu from './Menu';
import {React,  useState } from 'react';
import Shortmenu from './Shortmenu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';



const drawerWidth = 240;
const shortdrawerWidt = 80

export default function Navbar({content}) {
  const [isBigMenu, setIsBigMenu] = useState(false)

  const ChangeMenu = () =>{
    setIsBigMenu(!isBigMenu)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton onClick={ChangeMenu} sx={{marginRight:'25px', color:'white'}}>
            {isBigMenu ? <MenuOpenIcon/>: <MenuIcon/>}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            M_C
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: isBigMenu? drawerWidth : shortdrawerWidt,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: isBigMenu? drawerWidth : shortdrawerWidt, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
         {isBigMenu ? <Menu/> : <Shortmenu/>}         
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
            {content}
      </Box>
    </Box>
  );
}