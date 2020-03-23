package cn.bs.auction.dao;

import cn.bs.auction.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRep extends JpaRepository<User, Integer> {

    User findByUsername(String username);
}
