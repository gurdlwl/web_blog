package kr.hs.dgsw.blog.Controller;

import kr.hs.dgsw.blog.Domain.Post;
import kr.hs.dgsw.blog.Protocol.PostUsernameProtocol;
import kr.hs.dgsw.blog.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/InsertPost")
    public PostUsernameProtocol insertPost(@RequestBody Post post){
        return postService.insertPost(post);
    }

    @GetMapping("/ViewAllPost")
    public List<PostUsernameProtocol> findAllPost(){
        return postService.findAllPost();
    }

    @PutMapping("/UpdatePost/{id}")
    public PostUsernameProtocol updatePost(@PathVariable Long id, @RequestBody Post post){
        return postService.updatePost(id, post);
    }

    @DeleteMapping("/DeletePost/{id}")
    public boolean deletePost(@PathVariable Long id){
        return postService.deletePost(id);
    }
}
