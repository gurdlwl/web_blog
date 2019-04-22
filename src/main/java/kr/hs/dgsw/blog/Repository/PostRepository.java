package kr.hs.dgsw.blog.Repository;

import kr.hs.dgsw.blog.Domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
