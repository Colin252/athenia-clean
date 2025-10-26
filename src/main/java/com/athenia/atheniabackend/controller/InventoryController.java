package com.athenia.atheniabackend.controller;

import com.athenia.atheniabackend.entity.Inventory;
import com.athenia.atheniabackend.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping
    public List<Inventory> getAllInventory() {
        return inventoryService.getAllInventory();
    }

    @GetMapping("/{id}")
    public Inventory getInventoryById(@PathVariable Long id) {
        return inventoryService.getInventoryById(id);
    }

    @PostMapping
    public Inventory createInventory(@RequestBody Inventory inventory) {
        return inventoryService.createInventory(inventory);
    }

    @PutMapping("/{id}")
    public Inventory updateInventory(@PathVariable Long id, @RequestBody Inventory inventory) {
        return inventoryService.updateInventory(id, inventory);
    }

    @DeleteMapping("/{id}")
    public void deleteInventory(@PathVariable Long id) {
        inventoryService.deleteInventory(id);
    }

    // ✅ NUEVO ENDPOINT DE ALERTAS
    @GetMapping("/alerts")
    public Map<String, Long> getStockAlerts() {
        long lowStock = inventoryService.getLowStockCount();
        long outOfStock = inventoryService.getOutOfStockCount();

        Map<String, Long> alerts = new HashMap<>();
        alerts.put("lowStock", lowStock);
        alerts.put("outOfStock", outOfStock);
        return alerts;
    }
}
