package com.portfolio.dto;

public record ProjectDto(
        String title,
        String description,
        ProjectCategory category,
        String githubUrl,
        String imageUrl
) {
}
