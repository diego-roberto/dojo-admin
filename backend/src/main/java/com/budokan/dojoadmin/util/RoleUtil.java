package com.budokan.dojoadmin.util;

import org.springframework.security.core.Authentication;

public class RoleUtil {

    public static boolean isSensei(Authentication auth) {
        return auth.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN") || a.getAuthority().equals("ROLE_SENSEI"));
    }

    public static boolean isAdmin(Authentication auth) {
        return auth.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
    }

}
