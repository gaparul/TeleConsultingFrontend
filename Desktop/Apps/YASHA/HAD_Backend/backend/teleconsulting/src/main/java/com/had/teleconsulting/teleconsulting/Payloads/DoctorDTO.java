package com.had.teleconsulting.teleconsulting.Payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;

@NoArgsConstructor
@Getter
@Setter

public class DoctorDTO {

    int doctorID;
    String doctorFirstName;
    String doctorLastName;
    String doctorPassword;
    String doctorSpecialisation;
    Double doctorMobileNumber;
    String doctorEmail;
    int patientDetailsQueue;
    Boolean available;
}
