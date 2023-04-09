import React from "react";
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import "./doctorVideoCallRoom.css"; 
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
const DoctorVideoCallRoom=() =>
{
   // const {roomId} = useParams();
    const roomId="1234";
    const myMeeting=async(element)=> {
        const appID = 366095792 ;
        const serverSecret = "7ced26e44abfbba50a0f1558dbda332c";
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
        <div className="container-doctor">
                <div ref={myMeeting} 
                style={{ width: '78vw', height: '94vh' }}/>
            <div className="sidebar"> 
                <div>
                    <List>
                        <ListItem>
                            <ListItemText>Patient Name :
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>Patient ID: </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>Download Health Record</ListItemText>
                            </ListItem>
                    </List>
                </div>
                <div>
                    <h6 sx={{textAlign:'centre'}}>
                        Prescription
                    </h6>
                </div>
            </div>
        </div>
        
    )
}
export default DoctorVideoCallRoom