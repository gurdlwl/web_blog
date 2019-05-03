package kr.hs.dgsw.blog.Domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String title;

    @Column(columnDefinition = "TEXT") // LOB BLOB CLOB
    private String content;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private List<Attachment> pictures;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime created;

    @UpdateTimestamp
    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime modified;

    public Post() { }

    public Post(Post p) {
        this.id = p.getId();
        this.userId = p.getUserId();
        this.title = p.getTitle();
        this.content = p.getContent();
        this.pictures = p.getPictures();
        this.created = p.getCreated();
        this.modified = p.getModified();
    }

    public Post(Long userId, String title, String content) {
        this.userId = userId;
        this.title = title;
        this.content = content;
    }

    public Post(Long userId, String title, String content, List<Attachment> pictures) {
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.pictures = pictures;
    }

}
