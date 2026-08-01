package com.portfolio.controller;

import com.portfolio.dto.ContactRequest;
import com.portfolio.service.MailService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ContactController {

    private final MailService mailService;

    public ContactController(MailService mailService) {
        this.mailService = mailService;
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> sendContactMessage(@Valid @RequestBody ContactRequest request) {
        mailService.sendContactEmail(request);
        return ResponseEntity.ok(Map.of("message", "Mesajınız başarıyla gönderildi."));
    }
}
