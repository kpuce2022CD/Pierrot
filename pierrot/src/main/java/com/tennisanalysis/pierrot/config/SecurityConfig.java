package com.tennisanalysis.pierrot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

// 어떤 url에 대해 요청을 허용할지, 권한 확인은 어떻게 할지 결정
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    // 정적인 파일에 대한 요청들
    private static final String[] AUTH_WHITELIST = {
            // -- swagger ui
            "/v2/api-docs",
            "/v3/api-docs/**",
            "/configuration/ui",
            "/swagger-resources/**",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            "/file/**",
            "/image/**",
            "/swagger/**",
            "/swagger-ui/**",
            // other public endpoints of your API may be appended to this array
            "/h2/**"
    };

    @Bean
    public BCryptPasswordEncoder encodePassword() {  // 회원가입 시 비밀번호 암호화에 사용할 Encoder 빈 등록
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                // login 없이 접근 허용 하는 url
                .antMatchers("/auth/**").permitAll()
                // '/admin'의 경우 ADMIN 권한이 있는 사용자만 접근이 가능
                .antMatchers("/admin").hasRole("ADMIN")
                // 그 외 모든 요청은 인증과정 필요
                .anyRequest().authenticated();
        http.httpBasic().and().authorizeRequests()
                .antMatchers("/user/login").permitAll()
                .and().logout().permitAll()
                .and().formLogin()
                .loginPage("/user/login")// 새로운 로그인 페이지 호출
                .loginProcessingUrl("/loginProcess")// 실제 로그인 진행
                .defaultSuccessUrl("/main")//로그인 성공시
                .and().csrf().disable();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        // 정적인 파일 요청에 대해 무시
        web.ignoring().antMatchers(AUTH_WHITELIST);
    }
}
