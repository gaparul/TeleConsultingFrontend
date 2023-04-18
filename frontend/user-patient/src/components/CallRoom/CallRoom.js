import React, { useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import { Button, Paper, Typography, } from "@mui/material";


const CallRoom = () => {
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
            "Patient"
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
    return (
        <>
            <div ref={myMeeting} 
                style={{ width: '100vw', height: '80vh' }}>
            </div>
            <div style={{ textAlign: 'center' }}> 
            <Button type="submit"
                    variant="contained"
                    size='medium'
                    sx={{ mt: 1}}>
                Download prescription
            </Button>
            </div>
        </>
    )
}
export default CallRoom; 