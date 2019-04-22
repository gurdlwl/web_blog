package kr.hs.dgsw.blog.Protocol;

import kr.hs.dgsw.blog.Domain.Post;
import lombok.Data;

@Data
public class PostUsernameProtocol extends Post{
    private String username;

    public PostUsernameProtocol(Post post, String username){
        super(post);
        this.username = username;
    }
}
