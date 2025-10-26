package com.athenia.atheniabackend.service;

import com.athenia.atheniabackend.entity.Inventory;
import com.athenia.atheniabackend.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public Inventory getInventoryById(Long id) {
        return inventoryRepository.findById(id).orElse(null);
    }

    public Inventory createInventory(Inventory inventory) {
        updateStatus(inventory);
        return inventoryRepository.save(inventory);
    }

    public Inventory updateInventory(Long id, Inventory updated) {
        Inventory existing = inventoryRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setMedicine(updated.getMedicine());
            existing.setCurrentStock(updated.getCurrentStock());
            existing.setMinRequired(updated.getMinRequired());
            updateStatus(existing);
            return inventoryRepository.save(existing);
        }
        return null;
    }

    public void deleteInventory(Long id) {
        inventoryRepository.deleteById(id);
    }

    private void updateStatus(Inventory inventory) {
        if (inventory.getCurrentStock() <= 0) {
            inventory.setStatus("SIN STOCK");
        } else if (inventory.getCurrentStock() < inventory.getMinRequired()) {
            inventory.setStatus("BAJO STOCK");
        } else {
            inventory.setStatus("OK");
        }
    }

    // ✅ NUEVOS MÉTODOS DE ALERTA
    public long getLowStockCount() {
        return inventoryRepository.findAll().stream()
                .filter(i -> "BAJO STOCK".equalsIgnoreCase(i.getStatus()))
                .count();
    }

    public long getOutOfStockCount() {
        return inventoryRepository.findAll().stream()
                .filter(i -> "SIN STOCK".equalsIgnoreCase(i.getStatus()))
                .count();
    }
}
