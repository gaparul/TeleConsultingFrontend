import { useEffect, React} from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import { styled, alpha } from "@mui/material/styles";
import { Box, Link, Drawer, Typography, Avatar } from "@mui/material";
import VolunteerActivismTwoTone from "@mui/icons-material/VolunteerActivismTwoTone";

import avatar from "./avatar/doctor.png";
import ScrollBar from "../ScrollBar";
import navConfig from "./NavConfig";
import NavSection from "./nav-section/NavSection";
// import { doctorDetails } from "../../Login/Login";

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.warning.light, 0.12),
}));

const NAV_WIDTH = 280;
const isDesktop = true;

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};


export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const doctor = localStorage.getItem('doctor');

  const doctorDetails = JSON.parse(doctor);

  const account = {
    displayName: doctorDetails.doctorFirstName+" "+doctorDetails.doctorLastName, // TODO: fetch from doctor name
    email: doctorDetails.doctorEmail, // TODO: change email to the one fetched
    role: doctorDetails.doctorSpecialisation,
    photoURL: avatar,
  };

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
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
        >
          {" "}
          <VolunteerActivismTwoTone fontSize="large" />
          eConsultation
        </Typography>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                Dr. {account.displayName}
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
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
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
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
      )}
    </Box>
  );
}
