package com.athenia.atheniabackend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "http://localhost:5173")
public class RoleTestController {

    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String adminAccess() {
        return "👑 Bienvenido, ADMIN: acceso autorizado";
    }

    @GetMapping("/doctor")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public String doctorAccess() {
        return "💉 Bienvenido, DOCTOR: acceso autorizado";
    }

    @GetMapping("/patient")
    @PreAuthorize("hasAuthority('PATIENT')")
    public String patientAccess() {
        return "🧬 Bienvenido, PATIENT: acceso autorizado";
    }

    @GetMapping("/all")
    public String allAccess() {
        return "🌎 Endpoint público sin restricción";
    }
}
