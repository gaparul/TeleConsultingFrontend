package com.had.teleconsulting.teleconsulting.Bean;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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

    @Column(nullable=true,name="doctorPassword")
    String doctorPassword;

    @Column(nullable=true,name="doctorSpecialisation")
    String doctorSpecialisation;
}
