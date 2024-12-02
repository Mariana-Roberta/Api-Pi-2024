package com.own.api.validator;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EmailValidator {

    // Padrão regex para validar e-mail
    private static final String EMAIL_REGEX = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";

    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

    // Método que valida o e-mail
    public static boolean isEmailValid(String email) {
        if (email == null) {
            return false;
        }

        Matcher matcher = EMAIL_PATTERN.matcher(email);
        return matcher.matches();
    }
}

