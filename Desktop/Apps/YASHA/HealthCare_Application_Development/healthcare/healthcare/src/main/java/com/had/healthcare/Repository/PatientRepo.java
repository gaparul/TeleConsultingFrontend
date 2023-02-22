package com.had.healthcare.Repository;

import com.had.healthcare.Bean.Patient;
import org.springframework.data.jpa.repository.JpaRepository;


//For handling the database operations of Patient
public interface PatientRepo extends JpaRepository<Patient,Integer> {
    
}
