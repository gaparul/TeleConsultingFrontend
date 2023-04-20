import React, { useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import { Button} from "@mui/material";


const CallRoom = () => {
    const roomId="1234";
    const myMeeting=async(element)=> {
        const appID = 868852693 ;
        const serverSecret = "9bf3442d9f083ba5f04468215a647d27";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID, 
            serverSecret, 
            //doctor id from backend will become the roomid
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

    const patientID = 6; //this will be taken from local storage 
    const handleButtonClick = async() =>{
        try {
            const response = await fetch(`http://localhost:8083/api/patientDetails/prescription/${patientID}`);
            const blob = await response.blob();
            // Handle the data returned from the API
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'prescription.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            // Handle errors
            console.error(error);
        }
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
                    sx={{ mt: 1 , backgroundColor: '#1565c0' ,color:'white'}}
                    onClick={handleButtonClick} >
                Download prescription
            </Button>
            </div>
        </>
    )
}
export default CallRoom; 