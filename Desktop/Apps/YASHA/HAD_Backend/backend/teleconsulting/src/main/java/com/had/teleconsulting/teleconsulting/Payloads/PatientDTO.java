package com.had.teleconsulting.teleconsulting.Payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@NoArgsConstructor
@Getter
@Setter

public class PatientDTO {
    private int patientID;
    private String patientFirstName;
    private String patientLastName;
    private Double patientMobileNumber;
    private String patientEmail;
    private Date patientDOB;
    private String patientGender;
}
