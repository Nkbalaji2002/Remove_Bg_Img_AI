# Stage 1: Build the application with Maven
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create a minimal runtime image using a JRE-only base
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app

# Copy the application JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Execute the application
ENTRYPOINT ["java", "-jar", "app.jar"]
