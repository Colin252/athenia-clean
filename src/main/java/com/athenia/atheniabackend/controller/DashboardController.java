package com.athenia.atheniabackend.controller;

import com.athenia.atheniabackend.repository.InventoryRepository;
import com.athenia.atheniabackend.repository.PatientRepository;
import com.athenia.atheniabackend.repository.DoctorRepository;
import com.athenia.atheniabackend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired private PatientRepository patientRepository;
    @Autowired private DoctorRepository doctorRepository;
    @Autowired private AppointmentRepository appointmentRepository;
    @Autowired private InventoryRepository inventoryRepository;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();

        // 📊 Datos generales
        stats.put("totalPatients", patientRepository.count());
        stats.put("totalDoctors", doctorRepository.count());
        stats.put("totalAppointments", appointmentRepository.count());

        // 💊 Datos de inventario
        long lowStock = inventoryRepository.countByStatus("BAJO STOCK");
        long outStock = inventoryRepository.countByStatus("SIN STOCK");
        long okStock = inventoryRepository.countByStatus("OK");

        stats.put("okStock", okStock);
        stats.put("lowStock", lowStock);
        stats.put("outStock", outStock);

        return stats;
    }

    // 📅 NUEVO: citas por día (últimos 7 días)
    @GetMapping("/appointments-week")
    public List<Map<String, Object>> getAppointmentsLastWeek() {
        LocalDate startDate = LocalDate.now().minusDays(6); // últimos 7 días
        List<Object[]> results = appointmentRepository.countAppointmentsByDay(startDate);

        List<Map<String, Object>> response = new ArrayList<>();
        for (Object[] row : results) {
            Map<String, Object> dayData = new HashMap<>();
            dayData.put("date", row[0].toString());
            dayData.put("count", ((Number) row[1]).intValue());
            response.add(dayData);
        }
        return response;
    }
}
