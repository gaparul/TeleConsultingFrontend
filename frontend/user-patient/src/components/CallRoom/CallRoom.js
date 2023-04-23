import React, { useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const CallRoom = () => {
    const roomId="1234";
    const patientID = 6;
    const navigate=useNavigate();
    
    const myMeeting=async(element)=> {
        const appID = 868852693 ;
        const serverSecret = "9bf3442d9f083ba5f04468215a647d27";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID, 
            serverSecret, 
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
          showLeavingView: false,
          onLeaveRoom: (async()=>{
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
                console.log('API response:', response.data);
                if (response.data === 'Prescription Uploaded successfully') {
                  alert('Download fail !');
                }
                else{
                    alert('Prescription downloaded !'); 
                }
            } catch (error) {
                // Handle errors
                console.error(error);
            }

            navigate('/')
            window.location.reload('false');
         })
        })    
    }

    return (
        <>
            <div ref={myMeeting} 
                style={{ width: '100vw', height: '80vh' }}>
            </div>
        </>
    )
}
export default CallRoom; 