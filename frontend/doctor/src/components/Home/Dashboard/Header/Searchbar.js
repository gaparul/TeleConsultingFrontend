import { useState } from "react";
// @mui
import { styled } from "@mui/material/styles";
import {
  Input,
  Slide,
  Button,
  IconButton,
  InputAdornment,
  ClickAwayListener,
  Collapse,
  Alert
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// utils
import { bgBlur } from "../../../../utils/cssStyles";
// component
import Iconify from "./Iconify";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

const HEADER_DESKTOP = 92;

const StyledSearchbar = styled("div")(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: "95%",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  boxShadow: "none",
  height: HEADER_DESKTOP,
  padding: theme.spacing(0, 5),
  // [theme.breakpoints.up('md')]: {
  // },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {

  const navigate = useNavigate()

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [alert, setAlert] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
  };

  const reset = () => {

  }

  async function fetchData(id) {
    console.log(id);

    const searchApi = `http://localhost:8083/api/patientDetails/getPatientById/${id}`;

    console.log(searchApi)

    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(searchApi, requestOptions)
      .then((response) => {
        console.log(response);
        if(response.status === 200){
          response.json().then((res) => {
            setData(res)
            console.log(res);
            localStorage.setItem('patient', JSON.stringify(res))
            navigate('/dashboard/patientinfo')
          })
        }
        if(response.status === 404) {
          response.json().then((res) => {
            console.log(res);
            if(res.message === "No patient available with provided patientID") {
              console.log('No')
              setNotFound(true);
            }
          })
          
        }
      })
      .catch((error) => console.log("error", error));

  }

  const searchPatient = async(event) => {
    event.preventDefault();
    console.log(search);

    await fetchData(search);
  }

  const handleClose = async (event) => {
    setOpen(false);
    navigate('/dashboard')
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        )}

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search Patient... Enter patient id"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: "text.disabled", width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: "fontWeightBold" }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            
            <Button variant="contained" onClick={searchPatient}>
              Search
            </Button>
            {notFound && (
              <Collapse in={alert}>
              <Alert
                onClose={reset}
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      reset();
                      setAlert(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Password — <strong>Is it entered correctly?</strong>
              </Alert>
            </Collapse>
            )}
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
