package com.athenia.atheniabackend.service;

import com.athenia.atheniabackend.entity.Medicine;
import com.athenia.atheniabackend.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    public Medicine getMedicineById(Long id) {
        return medicineRepository.findById(id).orElse(null);
    }

    public Medicine createMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    public Medicine updateMedicine(Long id, Medicine updatedMedicine) {
        Medicine existing = medicineRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setName(updatedMedicine.getName());
            existing.setDescription(updatedMedicine.getDescription());
            existing.setManufacturer(updatedMedicine.getManufacturer());
            existing.setQuantity(updatedMedicine.getQuantity());
            existing.setPrice(updatedMedicine.getPrice());
            return medicineRepository.save(existing);
        }
        return null;
    }

    public void deleteMedicine(Long id) {
        medicineRepository.deleteById(id);
    }
}
