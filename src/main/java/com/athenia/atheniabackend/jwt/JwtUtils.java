package com.athenia.atheniabackend.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * ✅ Clase utilitaria JWT para generación, validación y extracción de claims.
 * Compatible con Spring Boot 3 y biblioteca jjwt 0.11+
 */
@Component
public class JwtUtils {

    // 🔐 Clave secreta — en producción usar variable de entorno o AWS Secrets
    private static final String SECRET_KEY = "SuperSecretKeyAthenia2025ForJWTGeneration12345";
    private static final long EXPIRATION_TIME = 604800000; // 7 días (7 * 24 * 60 * 60 * 1000)

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    /** 🎟️ Generar token con rol */
    public String generateToken(String username, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /** ✅ Validar token (firma y expiración) */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            System.err.println("❌ Token inválido o expirado: " + e.getMessage());
            return false;
        }
    }

    /** 👤 Extraer username (subject) */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /** 🎭 Extraer rol */
    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
