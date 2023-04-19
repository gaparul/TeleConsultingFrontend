import React from "react";
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import { Grid,Paper } from "@mui/material";
import { Button,Box, Typography,TextField } from "@mui/material";
import CallRoomHeader from "./CallRoomHeader";

const DCallRoom=() =>
{
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
    return(
        // <div className="container-doctor">
        //         <div ref={myMeeting} 
        //         style={{ width: '78vw', height: '94vh' }}/>
        //     <div className="sidebar"> 
        //         <div>
        //             <List>
        //                 <ListItem>
        //                     <ListItemText>Patient Name :
        //                         </ListItemText>
        //                     </ListItem>
        //                     <ListItem>
        //                         <ListItemText>Patient ID: </ListItemText>
        //                     </ListItem>
        //                     <ListItem>
        //                         <ListItemText>Download Health Record</ListItemText>
        //                     </ListItem>
        //             </List>
        //         </div>
        //         <div>
        //             <h6 sx={{textAlign:'centre'}}>
        //                 Prescription
        //             </h6>
        //         </div>
        //     </div>
        // </div>
        <>
        <CallRoomHeader/>
          <Grid container spacing={2}>
            <Grid item xs={8} style={{ width: '84vw', height: '94vh' }} ref={myMeeting}>
            </Grid>
            <Grid item xs={4}>
                <Paper sx={{marginTop:'80px',marginRight:'20px' , padding:'32px', justifyContent:'center'}} elevation={4} >
                    <Typography>
                        Download Latest Health Record of Patient 
                    </Typography>
                <Button type="submit"
                        variant="contained"
                        size='medium'
                        textAlign={"center"}
                        sx={{ mt: 1}}>
                    Download Health Record
                </Button> 
                <Typography sx={{marginTop:'40px'}} variant="h6" textAlign={"center"}>
                    Prescription
                </Typography>
                <Grid item xs={12} sm={6.1} sx={{marginTop:'40px' }} >
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Disease"
                            name="disease"
                            />
                    </Grid>               
                </Paper>
           </Grid>
        </Grid>  
        </>
        
    )
}
export default DCallRoom ;