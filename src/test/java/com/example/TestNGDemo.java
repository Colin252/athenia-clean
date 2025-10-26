package com.example;

import org.testng.Assert;
import org.testng.annotations.Test;

public class TestNGDemo {

    @Test(priority = 1)
    public void iniciarSesion() {
        System.out.println("✅ Iniciando sesión...");
        Assert.assertTrue(true);
    }

    @Test(priority = 2, dependsOnMethods = "iniciarSesion")
    public void realizarCompra() {
        System.out.println("🛒 Realizando compra...");
        Assert.assertEquals(2 + 2, 4);
    }

    @Test(priority = 3, dependsOnMethods = "realizarCompra")
    public void cerrarSesion() {
        System.out.println("👋 Cerrando sesión...");
        Assert.assertTrue(true);
    }
}
