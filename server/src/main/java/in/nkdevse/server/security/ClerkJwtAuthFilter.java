package in.nkdevse.server.security;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.PublicKey;
import java.util.Base64;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class ClerkJwtAuthFilter extends OncePerRequestFilter {
    // inject thee clerk.issuer property from application.properties via constructor injection
    @Value("${clerk.issuer}")
    private String clerkIssuer;

    //    JwksProvider dependency is injected via constructor
    private final ClerkJwksProvider jwksProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("API Hitting ClerkJwtAuthFilter");

        if (request.getRequestURI().contains("api/v1/webhooks")) {
            filterChain.doFilter(request, response);
            return;
        }

//        Extract Authorization Header
        String authHeader = request.getHeader("Authorization");

// if header missing or not starting with Bearer, send 403 Forbidden
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Authorization header missing/invalid");
            return;
        }

        try {
//            Remove 'Bearer ' prefix to get token string
            String token = authHeader.substring(7);

//            extract the kid from token header
            String[] chunks = token.split("\\.");

//            Decode Base64Url the header part to get JSON
            String headerJson = new String(
                    Base64.getUrlDecoder().decode(chunks[0]),
                    StandardCharsets.UTF_8
            );

//            Parse JSON header to extract 'kid'
            ObjectMapper mapper = new ObjectMapper();
            JsonNode headerNode = mapper.readTree(headerJson);
            String kid = headerNode.get("kid").asText();

//            use kid to fetch the correct public key from JWKS provider
            PublicKey publicKey = jwksProvider.getPublicKey(kid);

//            parse and validate jwt using the public key and issuer
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(publicKey)
                    .setAllowedClockSkewSeconds(600)
                    .requireIssuer(clerkIssuer)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

//            get the subject user id from claims
            String clerkUserId = claims.getSubject();

//            create authentication token with ROLE_ADMIN authority (adjust roles as needed)
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(clerkUserId,
                    null,
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")));

//            Set authentication in SecurityContext for downstream security checks
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

//            Proceed with next filter in chain
            filterChain.doFilter(request, response);
            System.out.println("completed");
        } catch (Exception e) {
//            if any error occurs (invalid token, parsing issue), send 403 forbidden response
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Invalid JWT Token");
            System.out.println("JWT ERROR → " + e.getClass().getName());
            System.out.println("MESSAGE → " + e.getMessage());
        }


    }
}
