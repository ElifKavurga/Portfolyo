package com.portfolio.service;

import com.portfolio.dto.ContactRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import java.util.Map;

@Service
public class MailService {

    private final RestClient resendClient;
    private final String apiKey;
    private final String fromEmail;
    private final String recipientEmail;

    public MailService(
            @Value("${resend.api-key:}") String apiKey,
            @Value("${resend.from:Portfolio <onboarding@resend.dev>}") String fromEmail,
            @Value("${app.contact.recipient:elifkvrg@gmail.com}") String recipientEmail
    ) {
        this.apiKey = apiKey;
        this.fromEmail = fromEmail;
        this.recipientEmail = recipientEmail;
        this.resendClient = RestClient.builder()
                .baseUrl("https://api.resend.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public void sendContactEmail(ContactRequest request) {
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("Resend API anahtarı yapılandırılmamış.");
        }

        try {
            resendClient.post()
                    .uri("/emails")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                    .body(Map.of(
                            "from", fromEmail,
                            "to", recipientEmail,
                            "reply_to", request.email(),
                            "subject", "Portfolyo İletişim Formu: " + request.name(),
                            "text", buildBody(request)
                    ))
                    .retrieve()
                    .toBodilessEntity();
        } catch (RestClientResponseException exception) {
            throw new IllegalStateException("Mesaj gönderilemedi. Lütfen tekrar deneyin.", exception);
        }
    }

    private String buildBody(ContactRequest request) {
        return """
                Yeni iletişim formu mesajı

                Ad: %s
                E-posta: %s

                Mesaj:
                %s
                """.formatted(request.name(), request.email(), request.message());
    }
}
