package com.had.teleconsulting.teleconsulting.Services;

import com.had.teleconsulting.teleconsulting.Bean.PatientDetails;
import com.had.teleconsulting.teleconsulting.Payloads.PatientDTO;

import java.util.List;

public interface PatientService {

    PatientDTO createPatient(PatientDTO patient);
    Boolean getPatientByMobileNumber(String patientMobileNumber);
    PatientDTO updatePatient(PatientDTO patient, Integer patientID);
    PatientDTO getPatientByID(Integer patientID);
    List<PatientDTO> getAllPatient();
    void deletePatient(Integer patientID);

}