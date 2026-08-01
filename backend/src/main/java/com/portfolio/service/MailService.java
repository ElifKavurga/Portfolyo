package com.portfolio.service;

import com.portfolio.dto.ContactRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private static final Logger log = LoggerFactory.getLogger(MailService.class);

    private final JavaMailSender mailSender;
    private final String recipientEmail;
    private final String senderEmail;
    private final String mailPassword;

    public MailService(
            JavaMailSender mailSender,
            @Value("${app.contact.recipient:kavurga77@gmail.com}") String recipientEmail,
            @Value("${spring.mail.username:}") String senderEmail,
            @Value("${spring.mail.password:}") String mailPassword
    ) {
        this.mailSender = mailSender;
        this.recipientEmail = recipientEmail;
        this.senderEmail = senderEmail;
        this.mailPassword = mailPassword;

        if (mailPassword == null || mailPassword.isBlank()) {
            log.warn("MAIL_PASSWORD ayarlanmadi. Iletisim formu e-posta gonderemez.");
        }
    }

    public void sendContactEmail(ContactRequest request) {
        if (mailPassword == null || mailPassword.isBlank()) {
            throw new IllegalStateException(
                    "E-posta sunucusu yapilandirilmamis. Gmail uygulama sifresini MAIL_PASSWORD olarak ayarlayin."
            );
        }
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setFrom(senderEmail.isBlank() ? recipientEmail : senderEmail);
        message.setReplyTo(request.email());
        message.setSubject("Portfolyo İletişim Formu: " + request.name());
        message.setText(buildBody(request));
        mailSender.send(message);
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
