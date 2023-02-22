package com.had.healthcare.Controller;


import com.had.healthcare.DTO.DoctorDTO;
import com.had.healthcare.DTO.PatientDTO;
import com.had.healthcare.Service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/doctor")
public class DoctorController {
    @Autowired
    private DoctorService doctorService;

    @GetMapping("/{patientID}")
    public ResponseEntity<PatientDTO> getPatientDetailsById(@PathVariable Integer patientID){
        return ResponseEntity.ok(this.doctorService.getPatientById(patientID));
    }

    @GetMapping("/")
    public ResponseEntity<List<DoctorDTO>> getAllDoctors() {
        return ResponseEntity.ok(this.doctorService.getAllDoctors());
    }

}
