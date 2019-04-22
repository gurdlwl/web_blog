package kr.hs.dgsw.blog.Controller;

import kr.hs.dgsw.blog.Domain.User;
import kr.hs.dgsw.blog.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/InsertUser")
    public User insertUser(@RequestBody User user){
        return userService.insertUser(user);
    }

    @GetMapping("/ViewAllUser")
    public List<User> findAllUser(){
        return  userService.findAllUser();
    }

    @GetMapping("/ViewUser/{id}")
    public User findUser(@PathVariable Long id){
        return userService.findUser(id);
    }

    @PutMapping("/UpdateUser/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user){
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/RemoveUser/{id}")
    public boolean removeUser(@PathVariable Long id){
        return userService.removeUser(id);
    }

}
