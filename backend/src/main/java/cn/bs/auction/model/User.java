package cn.bs.auction.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@javax.persistence.Entity
@Table(name = "table_user")
@Data
public class User extends Entity {

    private String username;

    private String password;

    private String avatar;

    private String nickname;

    private String phone;

    private Role role;

    private Boolean disabled;

    private LocalDate createDate;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Override
    public Integer getId() {
        return super.getId();
    }

    @Column(unique = true, nullable = false, length = 20)
    public String getUsername() {
        return username;
    }

    @Column(unique = true, nullable = false, length = 20)
    public String getPhone() {
        return phone;
    }

    public enum Role {
        SUPER_ADMIN,
        ADMIN,
        CUSTOMER
    }
}
