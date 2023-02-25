package com.had.teleconsulting.teleconsulting.Bean;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Queue;

@Entity
@Table(name="doctorDetails")
@NoArgsConstructor
@Getter
@Setter
public class DoctorDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable=false,name="doctorID")
    int doctorID;

    @Column(nullable=false,name="doctorFirstName")
    String doctorFirstName;

    @Column(nullable=true,name="doctorLastName")
    String doctorLastName;

    @Column(nullable=false,name="doctorPassword")
    String doctorPassword;

    @Column(nullable=false,name="doctorSpecialisation")
    String doctorSpecialisation;

    @Column(nullable=false,name="doctorMobileNumber")
    Double doctorMobileNumber;

    @Column(nullable=false,name="doctorEmail")
    String doctorEmail;

    @Column(nullable=false,name="patientQueue")
    int patientDetailsQueue;

    @Column(nullable=false,name="Available")
    Boolean available;

}
