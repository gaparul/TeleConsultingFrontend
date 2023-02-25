package com.had.teleconsulting.teleconsulting.Payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter

public class PatientDTO {
    private int patientID;
    private String patientFirstName;
    private String patientLastName;
    private String patientMobileNumber;
    private String patientEmail;
    private String patientDOB;
    private String patientGender;
    private String patientPassword;
}
