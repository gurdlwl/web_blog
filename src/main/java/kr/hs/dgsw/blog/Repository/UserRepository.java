package kr.hs.dgsw.blog.Repository;

import kr.hs.dgsw.blog.Domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByAccount(String account);
}
