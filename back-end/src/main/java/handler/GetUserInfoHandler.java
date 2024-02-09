package handler;

import dao.UserDao;
import handler.AuthFilter.AuthResult;
import org.bson.Document;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

public class GetUserInfoHandler implements BaseHandler {

    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {

        UserDao userDao = UserDao.getInstance();

        AuthResult authResult = AuthFilter.doFilter(request);
        if(!authResult.isLoggedIn){
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }

        // get user info form database
       Document filter = new Document("userName", authResult.userName);

        var res = new RestApiAppResponse<>(true, userDao.query(filter), null);
        return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
    }
}