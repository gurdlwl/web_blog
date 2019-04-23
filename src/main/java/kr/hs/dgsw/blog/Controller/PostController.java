package kr.hs.dgsw.blog.Controller;

import kr.hs.dgsw.blog.Domain.Post;
import kr.hs.dgsw.blog.Protocol.ResponseFormat;
import kr.hs.dgsw.blog.Protocol.ResponseType;
import kr.hs.dgsw.blog.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/InsertPost")
    public ResponseFormat insertPost(@RequestBody Post post){
        return new ResponseFormat(
                ResponseType.POST_ADD, postService.insertPost(post));
    }

    @GetMapping("/ViewAllPost")
    public ResponseFormat findAllPost(){
        return new ResponseFormat(
                ResponseType.POST_GET, postService.findAllPost());
    }

    @GetMapping("/ViewPost/{id}")
    public ResponseFormat findPost(@PathVariable Long id){
        return new ResponseFormat(
                ResponseType.POST_GET, postService.findPost(id));
    }

    @PutMapping("/UpdatePost/{id}")
    public ResponseFormat updatePost(@PathVariable Long id, @RequestBody Post post){
        return new ResponseFormat(
                ResponseType.POST_UPDATE, postService.updatePost(id, post));
    }

    @DeleteMapping("/DeletePost/{id}")
    public ResponseFormat deletePost(@PathVariable Long id){
        return new ResponseFormat(
                ResponseType.POST_DELETE, postService.deletePost(id));
    }
}
