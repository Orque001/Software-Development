package handler;

import dao.TransactionDao;
import dao.UserDao;
import dto.TransactionDto;
import dto.TransactionType;
import dto.TransferRequestDto;
import dto.UserDto;
import org.bson.Document;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

import java.util.List;
import java.util.Optional;

public class AddContactHandler implements BaseHandler{
    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request){
        UserDao userDao = UserDao.getInstance();

        String userId = request.getCookieValue("userId");
        String contactId = request.getQueryParam("contactId");

        if(userId == null || contactId == null){
            var res = new RestApiAppResponse<>(false, null, "Invalid request parameters.");
            return new HttpResponseBuilder().setStatus(StatusCodes.BAD_REQUEST).setBody(res);
        }

        // check if contact exists
        if(userDao.query(new Document("userName", contactId)).isEmpty()){
            var res = new RestApiAppResponse<>(false,null, "Contact not found.");
            return new HttpResponseBuilder().setStatus("404 Not Found").setBody(res);
        }

        try {
            userDao.addContact(userId, contactId);
            var res = new RestApiAppResponse<>(true, null, "Contact added successfully.");
            return new HttpResponseBuilder().setStatus(StatusCodes.OK).setBody(res);
        } catch (Exception e){
            e.printStackTrace();
            var res = new RestApiAppResponse<>(false,null, "Failed to add contact.");
            return new HttpResponseBuilder().setStatus("500 Internal Server Error").setBody(res);
        }






    }
}