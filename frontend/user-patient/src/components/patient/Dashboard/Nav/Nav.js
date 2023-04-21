import { useEffect, React } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import { styled, alpha } from "@mui/material/styles";
import { Box, Link, Drawer, Typography, Avatar, Divider, IconButton } from "@mui/material";
import VolunteerActivismTwoTone from "@mui/icons-material/VolunteerActivismTwoTone";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

import femaleAvatar from "./avatar/female.png";
import maleAvatar from "./avatar/user.png";
import navConfig from "./NavConfig";
// import { StyledNavItemIcon } from "./nav-section/styles";
import NavSection from "./nav-section/NavSection";

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(3, 3.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.primary.main, 0.12),
}));

const StyledNavItemIcon = styled(VolunteerActivismTwoTone)({
  width: 40,
  height: 40,
  color: '#0d47a1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const NAV_WIDTH = 350;

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const patient = localStorage.getItem("patient");

  const patientDetails = JSON.parse(patient);
  const genderTitle = patientDetails.gender === "male" ? 'MR. ' : 'MS. ';
  const avatar = patientDetails.gender === "male" ? maleAvatar : femaleAvatar;
  const name = String(patientDetails.name).toUpperCase()
  const account = {
    id: patientDetails.patientId,
    displayName: patientDetails.name,
    email: patientDetails.email,
    mobile: patientDetails.mobile,
    gender: patientDetails.gender,
    dob: patientDetails.dob,
    photoURL: avatar,
  };

  const handleClick = () => {

  } 

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <>
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
        >
          {" "}
          <StyledNavItemIcon>
          <VolunteerActivismTwoTone  size="large" />
          </StyledNavItemIcon>
          eConsultation
        </Typography>
      </Box>

      <Box sx={{ mb: 2, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {genderTitle + name}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <Box sx={{ mb: 4, mx: 2.5 }}>
        <StyledAccount>
        <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle1" sx={{ color: "text.primary" }}>
          Patient Details:
        </Typography>
        <Divider></Divider>
        <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                PatientID: {account.id}
              </Typography>
        <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                Name: {account.displayName}
              </Typography>
        <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
          Email: {account.email}
        </Typography>

        <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
          Mobile Number: {account.mobile}
        </Typography>

        <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
          Gender: {account.gender}
        </Typography>

        <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
          Date of Birth: {account.dob}
        </Typography>
        </Box>
        </StyledAccount>
      </Box>

      <Box sx={{ mb: 4, mx: 2.5 }}>
      <StyledAccount>

        <IconButton onClick={handleClick}>
          <DriveFolderUploadIcon color="error" size='large'></DriveFolderUploadIcon>
        </IconButton>
        <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle1" sx={{ color: "text.primary" }}>
          Upload Health Records
        </Typography>
        <Typography variant="subtitle2" sx={{ color:  "#b71c1c"}}>
          Format: .pdf, .jpeg, .png
        </Typography>
        </Box>

      </StyledAccount>
      </Box>

      <NavSection data={navConfig} />
    </>
  );
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
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
    </Box>
  );
}
