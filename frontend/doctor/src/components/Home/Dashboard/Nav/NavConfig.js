import { Box } from "@mui/material";
import { forwardRef } from "react";

export const SvgColor = forwardRef(({ src, sx, ...other }, ref) => (
    <Box
      component="span"
      className="svg-color"
      ref={ref}
      sx={{
        width: 24,
        height: 24,
        display: 'inline-block',
        bgcolor: 'currentColor',
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
      {...other}
    />
  ));

  const icon = (name) => <SvgColor src={`./icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const navConfig = [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: icon('dashboard'),
    },
    {
      title: 'appointments',
      path: '/dashboard/appointments',
      icon: icon('calendar'),
    },
    {
        title: 'logout',
        path: '/doctor',
        icon: icon('logout'),
      },
  ];
  
  export default navConfig;