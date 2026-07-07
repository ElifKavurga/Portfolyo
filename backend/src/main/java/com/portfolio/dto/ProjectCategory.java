package com.portfolio.dto;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ProjectCategory {
    WEB("Web"),
    MOBILE("Mobil");

    private final String label;

    ProjectCategory(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }
}
