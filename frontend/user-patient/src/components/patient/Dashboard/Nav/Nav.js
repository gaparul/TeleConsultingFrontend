import React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Link,
  Drawer,
  Typography,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material";
import VolunteerActivismTwoTone from "@mui/icons-material/VolunteerActivismTwoTone";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import TaskIcon from "@mui/icons-material/Task";

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
  color: "#0d47a1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const NAV_WIDTH = 350;

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const [fileUpload, setFileUpload] = React.useState([File]);
  const [filePath, setPath] = React.useState('');
  const [upload, setUpload] = React.useState(false);

  const patient = localStorage.getItem("patient");

  const patientDetails = JSON.parse(patient);
  const genderTitle = patientDetails.gender === "male" ? "MR. " : "MS. ";
  const avatar = patientDetails.gender === "male" ? maleAvatar : femaleAvatar;
  const name = String(patientDetails.name).toUpperCase();
  const account = {
    id: patientDetails.patientId,
    displayName: patientDetails.name,
    email: patientDetails.email,
    mobile: patientDetails.mobile,
    gender: patientDetails.gender,
    dob: patientDetails.dob,
    photoURL: avatar,
  };

  const handleChange = (e) => {
    if (e.target.files) {
      setFileUpload(e.target.files[0]);
      const path = String(e.target.value);
      const fileName = path.substring(1)
      setPath(fileName);
      setUpload(false);
    }
  };

  const handleClick = async (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", fileUpload);

    const jwtToken = localStorage.getItem("token");

    let myHeaders = new Headers();

    myHeaders.set("Content-Type", "application/json");
    myHeaders.set("Authorization", `Bearer ${jwtToken}`);

    var requestOptions = {
      method: "POST",
      body: formData,
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      `http://localhost:8083/api/patientDetails/healthRecord/${id}`,
      requestOptions
    )
      .then((response) => {
        if(response.status === 200) {
          setUpload(true);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    setPath('');
    setUpload(false);
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
            <VolunteerActivismTwoTone size="large" />
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
      {/*TODO: show selected file name */}
      <Box sx={{ mb: 2, mx: 2.5 }}>
        <StyledAccount>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            // onClick={e => handleClick(e, account.id)}
          >
            <input
              hidden
              accept="*"
              multiple
              type="file"
              onChange={handleChange}
            />
            <TaskIcon color="error" size="large"></TaskIcon>
          </IconButton>
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" sx={{ color: "text.primary" }}>
              Choose Health Records...
            </Typography>

            <Typography variant="subtitle2" sx={{ color: "#b71c1c" }}>
              Format: .pdf, .jpeg, .png
            </Typography>
            {filePath !== '' && (
              <Typography variant="subtitle2" sx={{ color: "#b71c1c" }}>
              {filePath.substring(11)}
            </Typography>
            )}
          </Box>
        </StyledAccount>
      </Box>
      {/*TODO: Show messasge File Uploaded Success */}
      <Box sx={{ mb: 4, mx: 2.5 }}>
        <StyledAccount>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={async (e) => await handleClick(e, account.id)}
          >
            <DriveFolderUploadIcon
              color="error"
              size="large"
            ></DriveFolderUploadIcon>
          </IconButton>
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" sx={{ color: "text.primary" }}>
              Upload Health Records...
            </Typography>
            {upload && (
              <Typography variant="subtitle1" sx={{ color: "#1b5e20" }}>
              Upload Success {filePath.substring(11)}!
            </Typography>
            )}
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
