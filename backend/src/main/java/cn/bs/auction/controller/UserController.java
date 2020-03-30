package cn.bs.auction.controller;

import cn.bs.auction.dao.UserRep;
import cn.bs.auction.model.Auction;
import cn.bs.auction.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.Optional;

import static org.springframework.http.HttpStatus.CONFLICT;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserRep userRep;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserRep userRep,
                          PasswordEncoder passwordEncoder) {
        this.userRep = userRep;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable Integer id) {
        User auction = userRep.findById(id).orElseThrow(() -> new RuntimeException("不存在"));
        return ResponseEntity.ok(auction);
    }

    @GetMapping
    public ResponseEntity<Page<User>> findByPage(User auction,
                                                 @PageableDefault Pageable pageable) {
        Page<User> page = userRep.findAll(Example.of(auction), pageable);
        return ResponseEntity.ok(page);
    }

    @PostMapping("/registry")
    public ResponseEntity<User> registry(@RequestBody User user) {
        final User first = userRep.findByUsername(user.getUsername());
        if (first != null) {
            return ResponseEntity.status(CONFLICT).build();
        } else {
            user.setId(null);
            user.setDisabled(false);
            user.setCreateDate(LocalDate.now());
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return ResponseEntity.ok(userRep.save(user));
    }

    @PutMapping("/{id}/disabled")
    public void disabled(@PathVariable Integer id,
                         @RequestParam("disabled") Boolean disabled) {
        final Optional<User> optional = userRep.findById(id);
        optional.ifPresent(user -> {
            user.setDisabled(disabled);
            userRep.save(user);
        });
    }

    @PutMapping("/reset")
    public void updatePassword(@RequestParam("username") String username,
                               @RequestParam("phone") String phone,
                               @RequestParam("password") String password) {
        User user = userRep.findByPhoneAndUsername(phone, username);
        if (user != null) {
            user.setPassword(passwordEncoder.encode(password));
            userRep.save(user);
        }
    }
}
