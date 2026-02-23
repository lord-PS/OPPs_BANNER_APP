package com.velocita;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class VelocitaApplication {

	public static void main(String[] args) {
		SpringApplication.run(VelocitaApplication.class, args);
	}

    @GetMapping("/api/health")
    public String health() {
        return "Systems Online: Velocita Backend is Running.";
    }

}
