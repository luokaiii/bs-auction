package cn.bs.auction.config;

import cn.bs.auction.security.CustomAuthenticationHandler;
import cn.bs.auction.security.LoginUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
@EnableGlobalMethodSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final LoginUserService loginUserService;

    private final CustomAuthenticationHandler authenticationHandler;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SecurityConfig(LoginUserService loginUserService,
                          CustomAuthenticationHandler authenticationHandler,
                          PasswordEncoder passwordEncoder) {
        this.loginUserService = loginUserService;
        this.authenticationHandler = authenticationHandler;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/user/registry", "/user/reset", "/file/**").permitAll()
                .antMatchers(HttpMethod.GET, "/bs/goods/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .successHandler(authenticationHandler).failureHandler(authenticationHandler)
                .permitAll()
                .and().logout().logoutSuccessUrl("/")
                .and().rememberMe().rememberMeParameter("remember-me")
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(loginUserService)
                .passwordEncoder(passwordEncoder);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/console/**");
    }

}
