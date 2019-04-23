package kr.hs.dgsw.blog.Controller;

import kr.hs.dgsw.blog.Domain.User;
import kr.hs.dgsw.blog.Protocol.ResponseFormat;
import kr.hs.dgsw.blog.Protocol.ResponseType;
import kr.hs.dgsw.blog.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/InsertUser")
    public ResponseFormat insertUser(@RequestBody User user){
        return new ResponseFormat(
                ResponseType.USER_ADD, userService.insertUser(user), user.getId());
    }

    @GetMapping("/ViewAllUser")
    public ResponseFormat findAllUser(){
        return new ResponseFormat(
                ResponseType.USER_GET, userService.findAllUser());
    }

    @GetMapping("/ViewUser/{id}")
    public ResponseFormat findUser(@PathVariable Long id){
        return new ResponseFormat(
                ResponseType.USER_GET, userService.findUser(id), id);
    }

    @PutMapping("/UpdateUser/{id}")
    public ResponseFormat updateUser(@PathVariable Long id, @RequestBody User user){
        return new ResponseFormat(
                ResponseType.USER_UPDATE, userService.updateUser(id, user), id);
    }

    @DeleteMapping("/RemoveUser/{id}")
    public ResponseFormat removeUser(@PathVariable Long id){
        return new ResponseFormat(
                ResponseType.USER_DELETE, userService.removeUser(id), id);
    }
}
