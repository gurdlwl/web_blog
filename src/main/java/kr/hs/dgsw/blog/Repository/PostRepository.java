package kr.hs.dgsw.blog.Repository;

import kr.hs.dgsw.blog.Domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserId(Long id);
}
