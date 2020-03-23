package cn.bs.auction.security;

import cn.bs.auction.dao.UserRep;
import cn.bs.auction.model.CustomUserDetails;
import cn.bs.auction.model.User;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class LoginUserService implements UserDetailsService {

    private UserRep userRep;

    @Autowired
    public LoginUserService(UserRep userRep) {
        this.userRep = userRep;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRep.findByUsername(username);

        if (null == user) {
            throw new UsernameNotFoundException("user not found.");
        }

        CustomUserDetails details = new CustomUserDetails();
        BeanUtils.copyProperties(user, details);
        return details;
    }
}
