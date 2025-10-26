package com.athenia.atheniabackend.repository;

import com.athenia.atheniabackend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("SELECT DATE(a.date), COUNT(a) FROM Appointment a WHERE a.date >= :startDate GROUP BY DATE(a.date) ORDER BY DATE(a.date)")
    List<Object[]> countAppointmentsByDay(LocalDate startDate);
}
