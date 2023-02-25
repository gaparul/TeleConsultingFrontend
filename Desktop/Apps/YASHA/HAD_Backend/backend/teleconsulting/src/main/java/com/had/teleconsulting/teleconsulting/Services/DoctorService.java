package com.had.teleconsulting.teleconsulting.Services;

import com.had.teleconsulting.teleconsulting.Payloads.DoctorDTO;
import com.had.teleconsulting.teleconsulting.Payloads.PatientDTO;
import com.had.teleconsulting.teleconsulting.Services.Impl.DoctorImpl;

import java.util.List;

public interface DoctorService {
        DoctorDTO createDoctor(DoctorDTO doctorDTO);
        List<DoctorDTO> getAllDoctors();

}
