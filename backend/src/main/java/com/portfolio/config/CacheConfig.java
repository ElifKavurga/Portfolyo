package com.portfolio.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
public class CacheConfig {

    public static final String GITHUB_PROJECTS_CACHE = "githubProjects";

    @Bean
    public CacheManager cacheManager(
            @Value("${cache.github-projects-ttl-hours:1}") long ttlHours
    ) {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager(GITHUB_PROJECTS_CACHE);
        cacheManager.setCaffeine(Caffeine.newBuilder()
                .expireAfterWrite(ttlHours, TimeUnit.HOURS)
                .maximumSize(20));
        return cacheManager;
    }
}
