import { Box } from "@mui/material";
import { forwardRef } from "react";
import dashboard from "./icons/dashboard.svg";
import appointment from "./icons/calendar.svg";
import logout from "./icons/logout.svg";

export const SvgColor = forwardRef(({ src, sx, ...other }, ref) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: "inline-block",
      bgcolor: "currentColor",
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
));

// const icon = (name) => <SvgColor src={`${iconPath}/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: <SvgColor src={dashboard} sx={{ width: 1, height: 1 }} />,
  },
  {
    title: "appointments",
    path: "/dashboard/appointments",
    icon: <SvgColor src={appointment} sx={{ width: 1, height: 1 }} />,
  },
  {
    title: "logout",
    path: "/",
    icon: <SvgColor src={logout} sx={{ width: 1, height: 1 }} />,
  },
];

export default navConfig;
