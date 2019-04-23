package kr.hs.dgsw.blog.Service;

import kr.hs.dgsw.blog.Domain.Post;
import kr.hs.dgsw.blog.Protocol.PostUsernameProtocol;

import java.util.List;

public interface PostService {
    PostUsernameProtocol insertPost(Post post);
    List<PostUsernameProtocol> findAllPost();
    Post findPost(Long id);
    PostUsernameProtocol updatePost(Long id,Post post);
    boolean deletePost(Long id);
}
