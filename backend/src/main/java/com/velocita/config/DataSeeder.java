package com.velocita.config;

import com.velocita.model.*;
import com.velocita.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final AssignmentRepository assignmentRepository;
    private final DashboardRepository dashboardRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository,
                      AssignmentRepository assignmentRepository,
                      DashboardRepository dashboardRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.assignmentRepository = assignmentRepository;
        this.dashboardRepository = dashboardRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Only seed if DB is empty
        if (userRepository.count() > 0) return;

        // --- Seed Users ---
        User commander = User.builder()
                .username("commander")
                .email("commander@velocita.space")
                .password(passwordEncoder.encode("launchcode"))
                .role(User.Role.COMMANDER)
                .displayName("Commander Sudhanshul")
                .build();
        userRepository.save(commander);

        User pilot = User.builder()
                .username("pilot")
                .email("pilot@velocita.space")
                .password(passwordEncoder.encode("jetfuel"))
                .role(User.Role.PILOT)
                .displayName("Pilot Nova")
                .build();
        userRepository.save(pilot);

        // --- Seed Assignments ---
        assignmentRepository.save(Assignment.builder()
                .title("Assignment 1: The Awakening")
                .description("Initial system boot and core logic implementation. Demonstrate understanding of classes, objects, and encapsulation.")
                .status(Assignment.Status.UPLOADED)
                .score("95/100")
                .element(Assignment.Element.AIR)
                .artifactType(Assignment.ArtifactType.SPELL_BOOK)
                .user(commander)
                .build());

        assignmentRepository.save(Assignment.builder()
                .title("Assignment 2: Algo-Rhythms")
                .description("Optimization of sorting algorithms in zero-g. Implement merge sort, quick sort, and analyze time complexity.")
                .status(Assignment.Status.PENDING)
                .score("TBD")
                .element(Assignment.Element.VOID)
                .artifactType(Assignment.ArtifactType.SCROLL)
                .user(commander)
                .build());

        assignmentRepository.save(Assignment.builder()
                .title("Assignment 3: Inheritance Protocol")
                .description("Demonstrate polymorphism and inheritance through a vehicle class hierarchy.")
                .status(Assignment.Status.GRADED)
                .score("88/100")
                .element(Assignment.Element.FIRE)
                .artifactType(Assignment.ArtifactType.CRYSTAL)
                .user(commander)
                .build());

        assignmentRepository.save(Assignment.builder()
                .title("Assignment 1: First Contact")
                .description("Basic Java syntax and hello-world program.")
                .status(Assignment.Status.UPLOADED)
                .score("100/100")
                .element(Assignment.Element.WATER)
                .artifactType(Assignment.ArtifactType.RUNE)
                .user(pilot)
                .build());

        // --- Seed Dashboards ---
        dashboardRepository.save(Dashboard.builder()
                .name("Arsenal")
                .slug("arsenal")
                .description("Your weapons cache — projects and assignments")
                .icon("⚔️")
                .sortOrder(1)
                .isActive(true)
                .build());

        dashboardRepository.save(Dashboard.builder()
                .name("Flight Log")
                .slug("flight-log")
                .description("Activity timeline and mission history")
                .icon("📋")
                .sortOrder(2)
                .isActive(true)
                .build());

        dashboardRepository.save(Dashboard.builder()
                .name("Spell Book")
                .slug("spell-book")
                .description("3D artifact view of your assignments")
                .icon("📖")
                .sortOrder(3)
                .isActive(true)
                .build());

        dashboardRepository.save(Dashboard.builder()
                .name("Timeline")
                .slug("timeline")
                .description("Your journey through the ranks")
                .icon("🕐")
                .sortOrder(4)
                .isActive(true)
                .build());

        dashboardRepository.save(Dashboard.builder()
                .name("Communications")
                .slug("comms")
                .description("AI Co-Pilot chat interface")
                .icon("📡")
                .sortOrder(5)
                .isActive(true)
                .build());

        System.out.println("═══════════════════════════════════════");
        System.out.println("  VELOCITA DATA SEEDER: ALL SYSTEMS GO");
        System.out.println("  Users: 2 | Assignments: 4 | Dashboards: 5");
        System.out.println("═══════════════════════════════════════");
    }
}
