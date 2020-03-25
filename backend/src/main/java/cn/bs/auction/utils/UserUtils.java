package cn.bs.auction.utils;

import cn.bs.auction.model.CustomUserDetails;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.nio.file.attribute.UserPrincipalNotFoundException;

public class UserUtils {
    public static CustomUserDetails getLoginUser() {
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            final Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (principal instanceof CustomUserDetails) {
                return (CustomUserDetails) principal;
            }
        }
        throw new UsernameNotFoundException("User has not logged in");
    }

}

