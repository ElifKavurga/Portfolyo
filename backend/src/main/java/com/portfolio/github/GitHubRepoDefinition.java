package com.portfolio.github;

import com.portfolio.dto.ProjectCategory;

public record GitHubRepoDefinition(
        String owner,
        String repo,
        ProjectCategory category,
        String displayTitle
) {
    public GitHubRepoDefinition(String owner, String repo, ProjectCategory category) {
        this(owner, repo, category, null);
    }

    public String fullName() {
        return owner + "/" + repo;
    }
}
