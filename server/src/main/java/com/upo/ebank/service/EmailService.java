package com.upo.ebank.service;

import com.upo.ebank.util.Constants;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender emailSender;

    @Value("${SPRING_MAIL_USERNAME}")
    private String fromEmail;

    @Async
    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }

    @Async
    public void sendConfirmationEmail(String email, String token) {
        String confirmationUrl = Constants.REGISTRATION_CONFIRMATION_URL + token;
        sendSimpleMessage(email, Constants.REGISTRATION_CONFIRMATION_EMAIL_SUBJECT,
                Constants.REGISTRATION_CONFIRMATION_EMAIL_MESSAGE + confirmationUrl);
    }

    @Async
    public void sendPasswordResetEmail(String email, String token) {
        String confirmationUrl = Constants.RESET_PASSWORD_URL + token;
        sendSimpleMessage(email, Constants.RESET_PASSWORD_EMAIL_SUBJECT,
                Constants.RESET_PASSWORD_EMAIL_MESSAGE + confirmationUrl);
    }
}