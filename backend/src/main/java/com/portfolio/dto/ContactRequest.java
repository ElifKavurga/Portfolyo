package com.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @NotBlank(message = "Ad alanı zorunludur")
        @Size(max = 100, message = "Ad en fazla 100 karakter olabilir")
        String name,

        @NotBlank(message = "E-posta alanı zorunludur")
        @Email(message = "Geçerli bir e-posta adresi girin")
        String email,

        @NotBlank(message = "Mesaj alanı zorunludur")
        @Size(max = 2000, message = "Mesaj en fazla 2000 karakter olabilir")
        String message
) {
}
