package com.portfolio.controller;

import com.portfolio.dto.ProjectDto;
import com.portfolio.service.GitHubProjectService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProjectController {

    private final GitHubProjectService gitHubProjectService;

    public ProjectController(GitHubProjectService gitHubProjectService) {
        this.gitHubProjectService = gitHubProjectService;
    }

    @GetMapping("/projects")
    public List<ProjectDto> getProjects() {
        return gitHubProjectService.fetchAllProjects();
    }
}
