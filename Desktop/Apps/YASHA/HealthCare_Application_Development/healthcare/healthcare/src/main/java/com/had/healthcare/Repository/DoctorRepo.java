package com.had.healthcare.Repository;

import com.had.healthcare.Bean.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

//For handling the database operations of Doctor
public interface DoctorRepo extends JpaRepository<Doctor,Integer> {
}
