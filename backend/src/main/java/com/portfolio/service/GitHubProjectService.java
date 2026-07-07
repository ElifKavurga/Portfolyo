package com.portfolio.service;

import com.portfolio.config.CacheConfig;
import com.portfolio.dto.ProjectCategory;
import com.portfolio.dto.ProjectDto;
import com.portfolio.github.GitHubRepoDefinition;
import com.portfolio.github.GitHubRepositoryResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class GitHubProjectService {

    private static final Logger log = LoggerFactory.getLogger(GitHubProjectService.class);

    private static final List<GitHubRepoDefinition> REPOSITORIES = List.of(
            new GitHubRepoDefinition("ElifKavurga", "Jakartamora", ProjectCategory.WEB),
            new GitHubRepoDefinition("ElifKavurga", "DevLog", ProjectCategory.WEB),
            new GitHubRepoDefinition("ElifKavurga", "Saye", ProjectCategory.MOBILE),
            new GitHubRepoDefinition("ElifKavurga", "Mutfak-Asistanim", ProjectCategory.MOBILE),
            new GitHubRepoDefinition("ElifKavurga", "Nova-Connect", ProjectCategory.WEB),
            new GitHubRepoDefinition("ElifKavurga", "Hogsmade-Cafe", ProjectCategory.WEB),
            new GitHubRepoDefinition("ElifKavurga", "FootBase", ProjectCategory.WEB),
            new GitHubRepoDefinition("ElifKavurga", "Yazilim-Muhendisliginde-Gelismeler-I", ProjectCategory.WEB, "DersYoldaşı"),
            new GitHubRepoDefinition("MehmetAkifGuness", "BilDunya", ProjectCategory.MOBILE)
    );

    private static final String[] IMAGE_CANDIDATES = {
            "assets/preview.png",
            "assets/cover.png",
            "assets/thumbnail.png",
            "img/preview.png",
            "img/cover.png",
            "screenshot.png",
            "preview.png"
    };

    private static final Pattern README_IMAGE_PATTERN = Pattern.compile(
            "!\\[[^\\]]*]\\(([^)]+)",
            Pattern.CASE_INSENSITIVE
    );

    private final RestClient githubRestClient;
    private final RestClient rawRestClient;

    public GitHubProjectService(RestClient githubRestClient) {
        this.githubRestClient = githubRestClient;
        this.rawRestClient = RestClient.builder().build();
    }

    @Cacheable(CacheConfig.GITHUB_PROJECTS_CACHE)
    public List<ProjectDto> fetchAllProjects() {
        List<ProjectDto> projects = new ArrayList<>();

        for (GitHubRepoDefinition definition : REPOSITORIES) {
            try {
                projects.add(fetchProject(definition));
            } catch (Exception exception) {
                log.warn("GitHub verisi alınamadı: {} - {}", definition.fullName(), exception.getMessage());
                projects.add(fallbackProject(definition));
            }
        }

        return projects;
    }

    private ProjectDto fetchProject(GitHubRepoDefinition definition) {
        GitHubRepositoryResponse repository = githubRestClient.get()
                .uri("/repos/{owner}/{repo}", definition.owner(), definition.repo())
                .retrieve()
                .body(GitHubRepositoryResponse.class);

        if (repository == null) {
            throw new IllegalStateException("Boş GitHub yanıtı");
        }

        String title = definition.displayTitle() != null
                ? definition.displayTitle()
                : repository.name();

        String branch = repository.defaultBranch() != null ? repository.defaultBranch() : "main";
        String imageUrl = resolveImageUrl(definition.owner(), definition.repo(), branch);

        return new ProjectDto(
                title,
                repository.description() != null ? repository.description() : "",
                definition.category(),
                repository.htmlUrl(),
                imageUrl
        );
    }

    private ProjectDto fallbackProject(GitHubRepoDefinition definition) {
        String title = definition.displayTitle() != null
                ? definition.displayTitle()
                : definition.repo();

        return new ProjectDto(
                title,
                "",
                definition.category(),
                "https://github.com/" + definition.fullName(),
                null
        );
    }

    private String resolveImageUrl(String owner, String repo, String defaultBranch) {
        for (String candidate : IMAGE_CANDIDATES) {
            String rawUrl = buildRawUrl(owner, repo, defaultBranch, candidate);
            if (resourceExists(rawUrl)) {
                return rawUrl;
            }
        }

        return extractReadmeImage(owner, repo, defaultBranch);
    }

    private String extractReadmeImage(String owner, String repo, String defaultBranch) {
        try {
            String readme = githubRestClient.get()
                    .uri("/repos/{owner}/{repo}/readme", owner, repo)
                    .accept(MediaType.TEXT_PLAIN)
                    .header(HttpHeaders.ACCEPT, "application/vnd.github.raw")
                    .retrieve()
                    .body(String.class);

            if (readme == null || readme.isBlank()) {
                return null;
            }

            Matcher matcher = README_IMAGE_PATTERN.matcher(readme);
            while (matcher.find()) {
                String imagePath = matcher.group(1).trim();
                String resolved = normalizeImageUrl(imagePath, owner, repo, defaultBranch);
                if (resolved != null && resourceExists(resolved)) {
                    return resolved;
                }
            }
        } catch (RestClientResponseException exception) {
            if (exception.getStatusCode() != HttpStatus.NOT_FOUND) {
                log.debug("README okunamadı: {}/{} - {}", owner, repo, exception.getMessage());
            }
        }

        return null;
    }

    private String normalizeImageUrl(String imagePath, String owner, String repo, String branch) {
        if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
            return imagePath.contains("raw.githubusercontent.com") ? imagePath : null;
        }

        if (imagePath.startsWith("/")) {
            imagePath = imagePath.substring(1);
        }

        return buildRawUrl(owner, repo, branch, imagePath);
    }

    private String buildRawUrl(String owner, String repo, String branch, String path) {
        return "https://raw.githubusercontent.com/" + owner + "/" + repo + "/" + branch + "/" + path;
    }

    private boolean resourceExists(String url) {
        try {
            rawRestClient.head()
                    .uri(URI.create(url))
                    .retrieve()
                    .toBodilessEntity();
            return true;
        } catch (Exception exception) {
            return false;
        }
    }
}
