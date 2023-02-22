package com.had.healthcare.DTOService;

import com.had.healthcare.DTO.DoctorDTO;
import com.had.healthcare.DTO.PatientDTO;

import java.util.List;

public interface DoctorDTOService {

    PatientDTO getPatientById(Integer patientID);
    List<DoctorDTO> getAllDoctors();

}
