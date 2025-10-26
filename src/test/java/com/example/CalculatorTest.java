package com.example;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class Calculator {
    int add(int a, int b) {
        return a + b;
    }
}

public class CalculatorTest {

    @Test
    void testAddition() {
        Calculator calc = new Calculator();
        assertEquals(4, calc.add(2, 2), "2 + 2 debe ser 4");
    }

    @Test
    void testWithMock() {
        Calculator mockCalc = mock(Calculator.class);
        when(mockCalc.add(3, 3)).thenReturn(9);
        assertEquals(9, mockCalc.add(3, 3));
    }
}
