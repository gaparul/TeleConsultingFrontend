import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
import VolunteerActivismTwoTone from "@mui/icons-material/VolunteerActivismTwoTone"

import ScrollBar from '../ScrollBar';
import navConfig from './NavConfig';
import NavSection from './nav-section/NavSection';

const StyledAccount = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
  }));

const NAV_WIDTH = 280;

Nav.propTypes = {
    openNav: PropTypes.bool,
    onCloseNav: PropTypes.func,
  };

  const account = {
    displayName: 'Dr Parul Ghotikar', // TODO: fetch from doctor name
    email: 'gaparul@gmail.com', // TODO: change email to the one fetched
    photoURL: './avatar/doctor.png',
  };

export default function Nav({ openNav, onCloseNav }) {
    const {pathname} = useLocation();

    useEffect(() => {
        if (openNav) {
          onCloseNav();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [pathname]);

      const renderContent = (
        <ScrollBar
          sx={{
            height: 1,
            '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
          }}
        >
          <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
          <VolunteerActivismTwoTone
                            fontSize='large'
                        />
          </Box>
    
          <Box sx={{ mb: 5, mx: 2.5 }}>
            <Link underline="none">
              <StyledAccount>
                <Avatar src={account.photoURL} alt="photoURL" />
    
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                    {account.displayName}
                  </Typography>
    
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {account.role}
                  </Typography>
                </Box>
              </StyledAccount>
            </Link>
          </Box>
    
          <NavSection data={navConfig} />

        </ScrollBar>
      );
      return (
        <Box
          component="nav"
          sx={{
            flexShrink: { lg: 0 },
            width: { lg: NAV_WIDTH },
          }}
        >
          {/* {isDesktop ? ( */}
            {/* <Drawer
              open
              variant="permanent"
              PaperProps={{
                sx: {
                  width: NAV_WIDTH,
                  bgcolor: 'background.default',
                  borderRightStyle: 'dashed',
                },
              }}
            >
              {renderContent}
            </Drawer>
          ) : ( */}
            <Drawer
              open={openNav}
              onClose={onCloseNav}
              ModalProps={{
                keepMounted: true,
              }}
              PaperProps={{
                sx: { width: NAV_WIDTH },
              }}
            >
              {renderContent}
            </Drawer>
          {/* )} */}
        </Box>
      );
}