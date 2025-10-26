package com.athenia.atheniabackend.service;

import com.athenia.atheniabackend.repository.DoctorRepository;
import com.athenia.atheniabackend.repository.PatientRepository;
import com.athenia.atheniabackend.repository.AppointmentRepository;
import com.athenia.atheniabackend.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportsService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    public long getTotalDoctors() {
        return doctorRepository.count();
    }

    public long getTotalPatients() {
        return patientRepository.count();
    }

    public long getTotalAppointments() {
        return appointmentRepository.count();
    }

    public long getTotalMedicines() {
        return medicineRepository.count();
    }
}
