package com.had.healthcare.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//Not using Bean class for dataTransfer to APIs, it is only used for creating table in database
@NoArgsConstructor
@Getter
@Setter
public class PatientDTO {

    Integer patientID;
    String first_name;
    String last_name;
    Integer phoneNum;
    String emailID;
    String dateofBirth;
    String gender;

}
