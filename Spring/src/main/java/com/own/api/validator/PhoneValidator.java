package com.own.api.validator;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PhoneValidator {

    // Padrão regex para validar números de telefone
    private static final String PHONE_REGEX = "^\\(?\\d{2}\\)?[\\s-]?\\d{4,5}[\\s-]?\\d{4}$";

    private static final Pattern PHONE_PATTERN = Pattern.compile(PHONE_REGEX);

    // Método que valida o número de telefone
    public static boolean isValidTelefone(String phone) {
        if (phone == null) {
            return false;
        }

        Matcher matcher = PHONE_PATTERN.matcher(phone);
        return matcher.matches();
    }
}

