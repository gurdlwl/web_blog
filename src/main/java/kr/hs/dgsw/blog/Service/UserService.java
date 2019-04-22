package kr.hs.dgsw.blog.Service;

import kr.hs.dgsw.blog.Domain.User;

import java.util.List;

public interface UserService {
    User insertUser(User user);
    List<User> findAllUser();
    User findUser(Long id);
    User updateUser(Long id, User user);
    boolean removeUser(Long id);
}
