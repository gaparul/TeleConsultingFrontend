import React from "react";

import { Box, AppBar, Container, Toolbar, Typography, IconButton, Menu, Button, MenuItem} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { HashLink } from 'react-router-hash-link'
import VolunteerActivismTwoTone from "@mui/icons-material/VolunteerActivismTwoTone"


const NavBar = () => {

    // const {logout, user} = useAuth();
    
    const [anchorNav, setAnchorNav] = React.useState(null);
    // const [anchorUser, setAnchorUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorNav(event.currentTarget)
    }
    const handleCloseNavMenu = (event) => {
        setAnchorNav(null)
    }
    return (
        <Box sx={{ mt: 8 }} >
        <AppBar position="fixed" color="primary" sx={{ top: 0, bottom: 'auto' }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    > <VolunteerActivismTwoTone
                            fontSize='large'
                        />
                        eConsultation
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorNav)}
                            onClose={handleCloseNavMenu}

                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {/*-------- small skin navigation-------- */}
                            <MenuItem
                                bgcolor="primary"
                                component={HashLink}
                                smooth to='/home#home'
                            >Home
                            </MenuItem>

                            <MenuItem
                                bgcolor="primary"
                                component={HashLink}
                                smooth to='/about#about'
                            >About
                            </MenuItem>
                            <MenuItem
                                bgcolor="primary"
                                // component={HashLink}
                                // smooth to='/doctorHome#doctorHome'
                            >Doctor Home
                            </MenuItem>

                            {/* {!user?.email && */}
                                <MenuItem
                                    bgcolor="primary"

                                    component={HashLink}
                                    smooth to='/login#login'
                                >Login
                                </MenuItem>
                            {/* } */}

                        </Menu>
                    </Box>

                    <Typography
                        variant="h6"
                        align='center'
                        component="div"
                        sx={{ flexGrow: 1, pt: 2, display: { xs: 'flex', md: 'none' } }}
                    >
                        <VolunteerActivismTwoTone
                            fontSize='large' />  eConsultation
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        {/*-------- large skin navigation-------- */}

                        <HashLink
                            className="text-style text-style-fullscrn "
                            smooth to='/home#home'>
                            <Button

                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >Home
                            </Button>
                        </HashLink>

                        <HashLink
                            className="text-style text-style-fullscrn "
                            smooth to='/about#about'>
                            <Button

                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >About
                            </Button></HashLink>
                        {/* {!user?.email && */}
                            <HashLink
                                className="text-style text-style-fullscrn "
                                smooth to='/login#login'>
                                <Button

                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >Login
                                </Button></HashLink>
                        {/* } */}


                    </Box>

                    {/* user info and navigation btn */}

                    {
                        // user?.email ? <Box sx={{ flexGrow: 0 }}>
                        //     <Tooltip title="Open settings">
                        //         <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        //             <Avatar alt="Remy Sharp" src={user?.email ? photoURL : "/static/images/avatar/2.jpg"} />
                        //         </IconButton>
                        //     </Tooltip>
                        //     <Menu
                        //         sx={{ mt: '45px' }}
                        //         id="menu-appbar"
                        //         anchorEl={anchorElUser}
                        //         anchorOrigin={{
                        //             vertical: 'top',
                        //             horizontal: 'right',
                        //         }}
                        //         keepMounted
                        //         transformOrigin={{
                        //             vertical: 'top',
                        //             horizontal: 'right',
                        //         }}
                        //         open={Boolean(anchorElUser)}
                        //         onClose={handleCloseUserMenu}
                        //     >  <Typography sx={{ p: '5px' }} color="primary" textAlign="center">Hi, {displayName}</Typography>
                        //         <Divider />
                        //         {settings.map((setting) => (
                        //             <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        //                 <Typography onClick={handleUserControl} textAlign="center">{setting}</Typography>
                        //             </MenuItem>
                        //         ))}
                        //     </Menu>
                        // </Box> : <></>
                    }
                </Toolbar>
            </Container>
        </AppBar>

    </Box>
    )
}

export default NavBar;