package com.had.teleconsulting.teleconsulting.Payloads;

import com.had.teleconsulting.teleconsulting.Bean.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@NoArgsConstructor
@Getter
@Setter
public class AppointmentDTO {

    int appointmentID;
    String appointmentOpdType;
    Date appointmentDate;
    Prescription prescription;
    FollowUP followUP;
    PatientDetails patientDetails;
    DoctorDetails doctorDetails;
    Queue queue;
}
