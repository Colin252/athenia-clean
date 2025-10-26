package com.athenia.atheniabackend.service;

import com.athenia.atheniabackend.entity.Doctor;
import com.athenia.atheniabackend.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    public Doctor createDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(Long id, Doctor updatedDoctor) {
        Doctor existing = doctorRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setName(updatedDoctor.getName());
            existing.setEmail(updatedDoctor.getEmail());
            existing.setPhone(updatedDoctor.getPhone());
            existing.setSpecialty(updatedDoctor.getSpecialty());
            existing.setYearsExperience(updatedDoctor.getYearsExperience());
            return doctorRepository.save(existing);
        }
        return null;
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}
