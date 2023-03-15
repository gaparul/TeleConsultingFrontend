package com.had.teleconsulting.teleconsulting.Bean;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "FollowUP")
public class FollowUP {
    // appointment id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false,name = "followUpID")
    int followUpID;

    @Column(nullable = false,name = "followUpDate")
    Date followUpDate;


}
