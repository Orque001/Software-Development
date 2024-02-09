package handler;

import dao.AuthDao;
import dao.UserDao;
import dto.AuthDto;
import java.time.Instant;
import java.util.Map;
import org.apache.commons.codec.digest.DigestUtils;
import org.bson.Document;
import org.bson.types.ObjectId;
import request.ParsedRequest;
import response.CustomHttpResponse;
import response.HttpResponseBuilder;

class LoginDto {
    String userName;
    String password;
}

public class LoginHandler implements BaseHandler {

    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {

        // for final project

        LoginDto userDto = GsonTool.gson.fromJson(request.getBody(), LoginDto.class);
        UserDao userDao = UserDao.getInstance();
        AuthDao authDao = AuthDao.getInstance();

        var userQuery = new Document("userName", userDto.userName)
                .append("password", DigestUtils.sha256Hex(userDto.password));
        var result = userDao.query(userQuery);

        var res = new HttpResponseBuilder();
        if(result.isEmpty()){
            res.setStatus(StatusCodes.UNAUTHORIZED);
        }else{
            // create new session
            AuthDto authDto = new AuthDto();
            authDto.setExpireTime(Instant.now().toEpochMilli() + 30000000);
            String hash = DigestUtils.sha256Hex(authDto.getUserName() + authDto.getExpireTime());
            authDto.setHash(hash);
            authDto.setUserName(userDto.userName);
            authDao.put(authDto); // logged in

            // tell client to remember hash
            res.setStatus(StatusCodes.OK);
            res.setHeader("Set-Cookie", "auth=" + hash); // + ";" ...
        }

        return res;
    }
}
