package com.athenia.atheniabackend.controller;

import com.athenia.atheniabackend.service.ReportsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/reports") // ✅ Protegida por JWT según SecurityConfig
@CrossOrigin(origins = "http://localhost:5173") // conexión con frontend Vite
public class ReportsController {

    @Autowired
    private ReportsService reportsService;

    @GetMapping("/stats")
    public Map<String, Object> getSystemStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("✅ message", "Acceso autorizado con JWT");
        stats.put("totalDoctors", reportsService.getTotalDoctors());
        stats.put("totalPatients", reportsService.getTotalPatients());
        stats.put("totalAppointments", reportsService.getTotalAppointments());
        stats.put("totalMedicines", reportsService.getTotalMedicines());
        return stats;
    }
}
