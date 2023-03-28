import { Button } from "@mui/material";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const PatientVideoCall1 =() =>{
    const [roomCode,setRoomCode] = useState("");
    const navigate=useNavigate();
    
    const handleFormSubmit = (ev) =>
    {
        // ev.preventDefault();
        navigate(`/room/${roomCode}`);
    }
    return(
        <div>
            {/* <Navb/> */}
            <form onSubmit={handleFormSubmit} className="form">
                <div>
                    <label>Enter Room Code</label>
                    <input 
                        value={roomCode}
                        onChange={(e)=> setRoomCode(e.target.value)}
                        type="text" 
                        required placeholder="Enter Room Code" 
                    />
                <Button type ="submit"></Button>
                </div>
                
            </form>
        </div>
    )
}
export default PatientVideoCall1