package com.athenia.atheniabackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.athenia.atheniabackend.entity.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    long countByStatus(String status);
}
