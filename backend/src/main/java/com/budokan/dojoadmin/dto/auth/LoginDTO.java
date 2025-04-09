package com.budokan.dojoadmin.dto.auth;

import lombok.Data;
import lombok.NonNull;

@Data
public class LoginDTO {

    @NonNull
    private String username;

    @NonNull
    private String password;

}
