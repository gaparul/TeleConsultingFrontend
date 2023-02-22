package com.had.healthcare.Service;

import com.had.healthcare.Bean.Doctor;
import com.had.healthcare.Bean.Patient;
import com.had.healthcare.DTO.DoctorDTO;
import com.had.healthcare.DTO.PatientDTO;
import com.had.healthcare.DTOService.DoctorDTOService;
import com.had.healthcare.Exception.ResourceNotFoundException;
import com.had.healthcare.Repository.DoctorRepo;
import com.had.healthcare.Repository.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorService implements DoctorDTOService {

    //Autowired because function of Service layer is using data of other layer so for object creation new keyword is
    //not required it will autowire it.
    @Autowired
    private PatientRepo patientRepo;
    @Autowired
    private DoctorRepo doctorRepo;

    @Override
    public PatientDTO getPatientById(Integer patientID) {

        Patient patient = this.patientRepo.findById(patientID).orElseThrow(()-> new ResourceNotFoundException("Patient","id",patientID));
        System.out.println("in: function getPatientById");
        return this.patientToDTO(patient);
    }

    @Override
    public List<DoctorDTO> getAllDoctors() {

        List<Doctor> doctors = this.doctorRepo.findAll();
        List<DoctorDTO> doctorDTOS = doctors.stream().map(doctor -> this.doctorToDTO(doctor)).collect(Collectors.toList());
        return doctorDTOS;
    }


    public PatientDTO patientToDTO(Patient patient) {

        System.out.println("in function : patientToDTO");
        PatientDTO patientDTO = new PatientDTO();
        patientDTO.setPatientID(patient.getPatientID());
        patientDTO.setGender(patient.getGender());
        patientDTO.setLast_name(patient.getLast_name());
        patientDTO.setFirst_name(patient.getFirst_name());
        patientDTO.setEmailID(patient.getEmailID());
        patientDTO.setPhoneNum(patient.getPhoneNum());
        patientDTO.setDateofBirth(patient.getDateOfBirth());
        return patientDTO;
    }
    public DoctorDTO doctorToDTO(Doctor doctor) {

        DoctorDTO doctorDTO = new DoctorDTO();
        doctorDTO.setDoctorID(doctor.getDoctorID());
        doctorDTO.setSpecialization(doctor.getSpecialization());
        doctorDTO.setFirst_name(doctor.getFirst_name());
        doctorDTO.setLast_name(doctor.getLast_name());
        doctorDTO.setPhoneNum(doctor.getPhoneNum());
        doctorDTO.setEmailID(doctor.getEmailID());
        return doctorDTO;
    }
}
