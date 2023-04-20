import React , { useState, useEffect } from "react";
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import { Grid,Paper,Select,Button,Box, Typography,TextField,FormControl,InputLabel} from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem'; 

import CallRoomHeader from "./CallRoomHeader";

//Table1
function createData(name, dateofupload) {
    return { name, dateofupload };
  }
  
  const rows = [
    createData('','','')
  ];

//Table2 
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#e3f2fd",
      color: theme.palette.common.black,
      fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 18,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

const DCallRoom=() =>
{
    const [healthRecord,setHealthRecord] = useState([]);
    const [loading, setLoading] = useState(false);

    const patientID = 6;

    useEffect(() => {
        fetch(`http://localhost:8083/api/patientDetails/getHealthRecordsByPatientId/${patientID}`)
        .then(response => {
            if(!response.ok) {
                console.log('Not working');
            }
            return response.json();
        })
        .then(healthRecord => setHealthRecord(healthRecord));
    },[]);

    const handleDownload = (healthRecordName, setLoading) => {
        setLoading(true);
        fetch(`http://localhost:8083/api/patientDetails/healthrecord/6/${healthRecordName}`, {
          method: 'GET'
        }).then(() => {
          console.log(`Downloaded ${healthRecordName}`);
          setLoading(false);
          window.open(`http://localhost:8083/api/patientDetails/healthrecord/6/${healthRecordName}`);
        });
      }


    //Call Room
   // const {roomId} = useParams();
    const roomId="1234";
    const myMeeting=async(element)=> {
        const appID = 868852693 ;
        const serverSecret = "9bf3442d9f083ba5f04468215a647d27";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID, 
            serverSecret, 
            //doctor id jo backend s lenge
            roomId,  
            Date.now().toString(),
            "Doctor"
        ); 
        const zp= ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
          container:element,
          scenario:{
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
          layout: "Grid", 
          maxUsers: 2, 
          showRoomTimer: true, 
          turnOnMicrophoneWhenJoining: false,
          turnOnCameraWhenJoining: false,
        })    
    } 

    //Prescription 
    const [inputField,setInputFields] =useState([
        {medicine : "",dosage:""}
    ])

    const handleFormChange=(index,event)=>{
        let data=[...inputField]
        data[index][event.target.name]=event.target.value;
        setInputFields(data)
    }

    const addFields=(event)=>{
        event.preventDefault();
        let newField={medicine : "",dosage:""}
        setInputFields([...inputField,newField])
    }
    return(
        <>
        <CallRoomHeader/>

          <Grid container spacing={2}>

            <Grid item xs={8} style={{ width: '84vw', height: '94vh' }} ref={myMeeting}>
            </Grid>

            <Grid item xs={4}>
                <Paper sx={{marginTop:'20px',marginRight:'20px' , padding:'32px', justifyContent:'center'}} elevation={4} >
                    <Typography>
                        Patient Name:
                    </Typography>
                    <Typography>
                        Patient Id:
                    </Typography>

                    {/* Health Record Table */}
                    <TableContainer sx={{marginTop:'20px'}} component={Paper}>
                        <Table sx={{ minWidth: 500 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Date of Upload</TableCell>
                                    <TableCell align="right">View Medical History</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {healthRecord.map((row,index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell align="right">{row.healthRecordName}</TableCell>
                                    <TableCell align="right">{row.healthRecordUploadDate}</TableCell>
                                    <TableCell align="right">
                                    <Button type="submit"
                                        variant="contained"
                                        size='small'
                                        textAlign='center'
                                        sx={{ mt: 1}} onClick = {() => handleDownload(row.healthRecordName,setLoading)}>
                                        View
                                    </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Typography sx={{marginTop:'40px'}} variant="h4" textAlign={"center"}>
                        Prescription
                    </Typography>

                    <Grid item xs={12} sm={6.1} sx={{marginTop:'20px' }} >
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Symptoms"
                        name="Symptoms"
                        />
                    </Grid> 
                    
                    {/* Prescription Table */}
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400,marginTop:'20px'}} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" >Medicine</StyledTableCell>
                                    <StyledTableCell align="center">Dosage</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {inputField.map((input,index) => (
                                    <StyledTableRow key={index.name}>
                                        <StyledTableCell >
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="Medicine"
                                                name="medicine" 
                                                value={input.medicine}
                                                onChange={(e)=>handleFormChange(index,e)}/>
                                        </StyledTableCell>
                                        <StyledTableCell >
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="Dosage"
                                                name="dosage" 
                                                value={input.dosage}
                                                onChange={(e)=>handleFormChange(index,e)}/>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                         </Table>
                    </TableContainer>

                    <Button
                        sx={{backgroundColor: "#e3f2fd" , mt: 1,color: "#0d47a1"}}
                        type="submit"
                        fullWidth
                        variant="outline"
                        // sx={{ mt: 1}}
                        onClick={addFields} >
                        Add more +
                    </Button> 
                    <Grid item xs={12} sm={6.1} sx={{marginTop:'20px' }} >
                            <TextField
                            variant="outlined"
                            label="Advice"
                            name="Advice"
                            />            
                    </Grid>

                    <Grid item sx={{marginTop:'20px' }} > 
                        <Switch {...label} />
                        <span sx={{marginLeft:'2rem'}}>Follow Up</span>
                    </Grid>

                    <Grid item sx={{marginTop:'20px' }} >
                        <FormControl sx={{width:'150px'}}>
                        <InputLabel id="demo-simple-select-label">Duration</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age" >
                            <MenuItem value={'3 days'}>3 days</MenuItem>
                            <MenuItem value={'5 days'}>5 days</MenuItem>
                            <MenuItem value={'7 days'}>7 days</MenuItem>
                            <MenuItem value={'15 days'}>15 days</MenuItem>
                            <MenuItem value={'1 month'}>1 month</MenuItem>
                            <MenuItem value={'3 month'}>3 month</MenuItem>
                            <MenuItem value={'6 month'}>6 month</MenuItem>
                        </Select>
                        </FormControl>
                    </Grid>

                    <Grid item sx={{marginTop:'20px' }} >
                        Generate Prescription
                        <span>
                        <Button type="submit"
                                variant="contained"
                                size='medium'
                                textAlign={"center"}
                                sx={{ mt: 1, marginLeft:'10px'}}>
                                Upload
                            </Button> 
                        </span>
            
                    </Grid>
                </Paper>      
            </Grid> 
        </Grid>  
    </>
        
    )
}
export default DCallRoom ;