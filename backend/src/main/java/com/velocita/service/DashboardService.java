package com.velocita.service;

import com.velocita.model.Dashboard;
import com.velocita.repository.DashboardRepository;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final DashboardRepository dashboardRepository;

    public DashboardService(DashboardRepository dashboardRepository) {
        this.dashboardRepository = dashboardRepository;
    }

    public List<Map<String, Object>> getAllDashboards() {
        return dashboardRepository.findByIsActiveTrueOrderBySortOrderAsc()
                .stream()
                .map(d -> {
                    Map<String, Object> map = new LinkedHashMap<>();
                    map.put("id", d.getId());
                    map.put("name", d.getName());
                    map.put("slug", d.getSlug());
                    map.put("description", d.getDescription());
                    map.put("icon", d.getIcon());
                    return map;
                })
                .collect(Collectors.toList());
    }
}
