package kr.hs.dgsw.blog.Protocol;

import lombok.Data;

@Data
public class ResponseFormat {
    private int code;
    private String desc;
    private Object data;

    public ResponseFormat(ResponseType rt, Object data) {
        this.code = rt.code();
        this.desc = rt.desc();
        this.data = data;
    }
}
