package kr.hs.dgsw.blog.Service;

import kr.hs.dgsw.blog.Domain.Post;
import kr.hs.dgsw.blog.Domain.User;
import kr.hs.dgsw.blog.Protocol.PostUsernameProtocol;
import kr.hs.dgsw.blog.Repository.PostRepository;
import kr.hs.dgsw.blog.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService{

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;


    @PostConstruct
    private void init(){
        Post p = new Post((long) 12345, "123456", "1234567");
        this.postRepository.save(p);
    }

    @Override
    public PostUsernameProtocol insertPost(Post post) {
        return new PostUsernameProtocol(this.postRepository.save(post), getUsername(post));
    }

    @Override
    public List<PostUsernameProtocol> findAllPost() {
        List<Post> postList = this.postRepository.findAll();
        return createList(postList);
    }

    @Override
    public Post findPost(Long id){
        return this.postRepository.findTopByUserIdOrderByIdDesc(id)
                .orElse(null);
    }

    @Override
    public PostUsernameProtocol updatePost(Long id, Post post) {
        return this.postRepository.findById(id)
                .map(found -> {
                    found.setContent(post.getContent());
                    return new PostUsernameProtocol(postRepository.save(found), getUsername(post));
                })
                .orElse(null);
    }

    @Override
    public boolean deletePost(Long id) {
        try{
            postRepository.deleteById(id);

            return true;
        } catch (Exception e){
            return false;
        }
    }

    private String getUsername(Post post){
        Optional<User> found = this.userRepository.findById(post.getId());

        return (found.map(User::getName).orElse(null));
    }

    private List<PostUsernameProtocol> createList(List<Post> postList){
        List<PostUsernameProtocol> List = new ArrayList<>();
        postList.forEach( post -> {
            List.add(new PostUsernameProtocol(post, getUsername(post)));
        });

        return List;
    }
}
