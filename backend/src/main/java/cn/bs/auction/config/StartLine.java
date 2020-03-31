package cn.bs.auction.config;

import cn.bs.auction.dao.UserRep;
import cn.bs.auction.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class StartLine implements CommandLineRunner {

    private final UserRep userRep;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public StartLine(UserRep userRep,
                     PasswordEncoder passwordEncoder) {
        this.userRep = userRep;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        User optional = userRep.findByUsername("wyw_admin");
        if (optional == null) {
            User user = new User();
            user.setId(null);
            user.setAvatar("https://s1.ax1x.com/2020/03/31/GKQec6.jpg");
            user.setCreateDate(LocalDate.now());
            user.setUsername("wyw_admin");
            user.setPassword(passwordEncoder.encode("123456"));
            user.setNickname("超级管理员zzh");
            user.setRole(User.Role.SUPER_ADMIN);
            user.setPhone("18812345678");
            userRep.save(user);
        }
    }

}
