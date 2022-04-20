package ru.nsu.ccfit.citylibraries.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BackendApplication {

	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/v1/libraries").allowedOrigins("http://localhost:8080");
			}
		};
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
