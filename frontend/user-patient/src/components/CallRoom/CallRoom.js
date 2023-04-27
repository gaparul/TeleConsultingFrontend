import React, { useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CallRoom = () => {
  // const { state } = useLocation();
  // const { appointment } = state;
  const appointmentDetails = localStorage.getItem("appointment");
  const appointment = JSON.parse(appointmentDetails);
  const appointmentID = appointment.appointmentID;
  // const roomId = "1234";
  const patientID = appointment.patientDetails.patientID;
  const doctorDetails = appointment.doctorDetails;
  const roomId = `${doctorDetails.doctorID}915${appointmentID}624${patientID}`;
  console.log(roomId, "room id");
  const navigate = useNavigate();

  const myMeeting = async (element) => {
    const appID = 868852693;
    const serverSecret = "9bf3442d9f083ba5f04468215a647d27";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Patient"
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      layout: "Grid",
      maxUsers: 2,
      showRoomTimer: true,
      turnOnMicrophoneWhenJoining: false,
      turnOnCameraWhenJoining: false,
      showLeavingView: false,
      onLeaveRoom: async () => {
        try {

          const api = `http://localhost:8083/api/patientDetails/prescription/${patientID}/${appointment.appointmentDate}/${appointment.appointmentID}`

          const jwtToken = localStorage.getItem("token");

          let myHeaders = new Headers();

          myHeaders.set("Content-Type", "application/json");
          myHeaders.set("Authorization", `Bearer ${jwtToken}`);

          const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
          };

          const response = await fetch(
            api, requestOptions
          );

          const blob = await response.blob();
          // Handle the data returned from the API
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "prescription.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          console.log("API response:", response.data);
          if (response.data === "Prescription Uploaded successfully") {
            alert("Download fail !");
          } else {
            alert("Prescription downloaded !");
          }
        } catch (error) {
          // Handle errors
          console.error(error);
        }

        navigate("/patient/dashboard");
        window.location.reload("false");
      },
    });
  };

  return (
    <>
      <div ref={myMeeting} style={{ width: "100vw", height: "80vh" }}></div>
    </>
  );
};
export default CallRoom;
