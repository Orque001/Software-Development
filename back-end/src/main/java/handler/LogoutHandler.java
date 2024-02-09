package handler;

import dao.AuthDao;
import org.bson.Document;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;


public class LogoutHandler implements BaseHandler {

    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {


        AuthDao authDao = AuthDao.getInstance();
        AuthFilter.AuthResult authResult = AuthFilter.doFilter(request);

        if(!authResult.isLoggedIn){
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }

        var userToLogout = authResult.userName;

        Document filter = new Document("userName", userToLogout);

        // end user's session from authDao
        authDao.delete(filter);

        var res = new RestApiAppResponse<>(true, null, userToLogout + " is logged out");
        return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
    }

}

