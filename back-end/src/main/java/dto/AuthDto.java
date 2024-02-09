package dto;

import org.bson.Document;

public class AuthDto extends BaseDto {

    private String userName;
    private Long expireTime;
    private String hash;

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public void setExpireTime(Long expireTime) {
        this.expireTime = expireTime;
    }

    public String getUserName() {
        return userName;
    }

    public Long getExpireTime() {
        return expireTime;
    }

    public String getHash() {
        return hash;
    }

    @Override
    public Document toDocument() {
        // for final project
        return new Document()
                .append("userName", userName)
                .append("expireTime", expireTime)
                .append("hash", hash);
    }

    public static AuthDto fromDocument(Document document) {

        // for final project

        var auth = new AuthDto();
        auth.setExpireTime(document.getLong("expireTime"));
        auth.setUserName(document.getString("userName"));
        auth.hash = document.getString("hash");
        return auth;
    }
}
