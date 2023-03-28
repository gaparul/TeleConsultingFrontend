import React, {useState} from "react";
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import "./patientVideoCall1.css"; 
import { Button } from "react-bootstrap";


const PatientVideoCall1 =() =>{
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
    return(
        <div className="container-patient">
            <div ref={myMeeting} 
                style={{ width: '100vw', height: '80vh' }}/>
            <div className="prescription-bar"> 
            <Button variant="primary">
              Download prescription
            </Button>
            </div>
        </div>
    )   
}
export default PatientVideoCall1