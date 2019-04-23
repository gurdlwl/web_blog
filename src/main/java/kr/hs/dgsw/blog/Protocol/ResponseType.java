package kr.hs.dgsw.blog.Protocol;

public enum ResponseType {
    FAIL                (0, "명령을 실행하지 못했습니다."),

    USER_DELETE         (101, "사용자를 삭제했습니다."),
    USER_ADD            (102, "사용자를 추가했습니다."),
    USER_UPDATE         (103, "사용자 정보를 수정했습니다."),
    USER_GET            (104, "사용자를 불러왔습니다."),

    POST_GET            (201, "게시글을 불러왔습니다."),
    POST_ADD            (202, "게시글을 추가했습니다."),
    POST_UPDATE         (203, "게시글을 수정했습니다."),
    POST_DELETE         (204, "게시글을 삭제했습니다."),

    ATTACHMENT_STORED   (301, ""),
    ;

    final private int code;
    final private String desc;

    ResponseType(int code, String desc){
        this.code = code;
        this.desc = desc;
    }

    public int code() { return this.code; }
    public String desc() { return this.desc; }
}
