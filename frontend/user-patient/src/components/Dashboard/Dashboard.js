import * as React from "react";
import {
  styled,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";

import { blue } from "@mui/material/colors";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import VolunteerActivismTwoTone from "@mui/icons-material/VolunteerActivismTwoTone";
import HomeIcon from "@mui/icons-material/Home";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonPinIcon from "@mui/icons-material/PersonPin";

import LogoutIcon from "@mui/icons-material/Logout";
import { Outlet } from "react-router-dom";

import avatar from "./Avatar/user.png";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton href="/">
      <ListItemIcon>
        <HomeIcon sx={{ color: blue[900] }} />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>

    <ListItemButton href="/dashboard/app">
      <ListItemIcon>
        <DashboardIcon sx={{ color: blue[900] }} />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton href="/dashboard/patientDetails">
      <ListItemIcon>
        <PersonPinIcon sx={{ color: blue[900] }} />
      </ListItemIcon>
      <ListItemText primary="Patient Details" />
    </ListItemButton>

    <ListItemButton href="/login">
      <ListItemIcon>
        <LogoutIcon sx={{ color: blue[900] }} />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>
);

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingBottom: theme.spacing(10),
  paddingTop: 92 + 24,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: blue[100], // alpha(theme.palette.warning.light, 0.12),
}));

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  // const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const user = localStorage.getItem("user");
  const userDetails = JSON.parse(user);
  // TODO: Update with user deatils from login
  const account = {
    displayName: `${userDetails.userFirstName} ${userDetails.userLastName}`,
    email: userDetails.userEmail,
    photoURL: avatar,

  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }} height="100vh">
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <VolunteerActivismTwoTone />
              eConsultation
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
              bgcolor: blue[700],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <Box sx={{ mb: 3, mx: 0.5 }}>
            <Link underline="none">
              <StyledAccount>
                <Avatar src={account.photoURL} alt="photoURL" />{" "}
                {/*add account details*/}
                <Box sx={{ ml: 5 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "text.primary" }}
                  >
                    {account.displayName}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "text.primary" }}
                  >
                    {account.email}
                  </Typography>
                </Box>
              </StyledAccount>
            </Link>
          </Box>
          <List component="nav">{mainListItems}</List>
        </Drawer>
        <Main>
          <Outlet />
        </Main>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
