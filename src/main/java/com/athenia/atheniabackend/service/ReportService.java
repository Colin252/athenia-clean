package com.athenia.atheniabackend.service;

import com.athenia.atheniabackend.repository.DoctorRepository;
import com.athenia.atheniabackend.repository.PatientRepository;
import com.athenia.atheniabackend.repository.AppointmentRepository;
import com.athenia.atheniabackend.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ReportService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    public Map<String, Object> getSystemStats() {
        Map<String, Object> report = new HashMap<>();

        report.put("totalDoctors", doctorRepository.count());
        report.put("totalPatients", patientRepository.count());
        report.put("totalAppointments", appointmentRepository.count());
        report.put("totalMedicines", medicineRepository.count());

        return report;
    }
}
