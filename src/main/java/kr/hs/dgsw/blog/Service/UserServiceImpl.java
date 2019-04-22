package kr.hs.dgsw.blog.Service;

import kr.hs.dgsw.blog.Domain.User;
import kr.hs.dgsw.blog.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User insertUser(User user) {
        Optional<User> found = userRepository.findByAccount(user.getAccount());

        if(found.isPresent())
            return null;

        return userRepository.save(user);
    }

    @Override
    public List<User> findAllUser() {
        return userRepository.findAll();
    }

    @Override
    public User findUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User updateUser(Long id, User user) {
        Optional<User> found = userRepository.findById(id);

        if(found.isPresent()){
            User u = found.get();

            u.setEmail(user.getEmail());
            u.setName(user.getName());
            u.setPassword(user.getPassword());
            u.setPhone(user.getPhone());

            return this.userRepository.save(u);
        }
        return null;
    }

    @Override
    public boolean removeUser(Long id) {
        try{
            userRepository.deleteById(id);
            return true;
        } catch (Exception e){
            return false;
        }
    }
}
