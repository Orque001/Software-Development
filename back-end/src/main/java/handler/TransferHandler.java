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

public class TransferHandler implements BaseHandler {

    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {

        // for final project

        TransactionDao transactionDao = TransactionDao.getInstance();
        UserDao userDao = UserDao.getInstance();

        TransferRequestDto transferRequestDto = GsonTool.gson.fromJson(request.getBody(), TransferRequestDto.class);


        AuthFilter.AuthResult authResult = AuthFilter.doFilter(request);
        if(!authResult.isLoggedIn){
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }

        // person who sends funds
        UserDto fromUser = userDao.query(new Document("userName", authResult.userName)).iterator().next();
        if(fromUser == null){
            var res = new RestApiAppResponse<>(false, null, "Invalid from user.");
            return new HttpResponseBuilder().setStatus("400 Bad Request").setBody(res);
        }

        UserDto toUser = userDao.query(new Document("userName", transferRequestDto.toId)).iterator().next();
        if(toUser == null){
            var res = new RestApiAppResponse<>(false, null, "Invalid user to transfer.");
            return new HttpResponseBuilder().setStatus("400 Bad Request").setBody(res);
        }

        if(fromUser.getBalance() < transferRequestDto.amount){
            var res = new RestApiAppResponse<>(false, null, "Not enough funds.");
            return new HttpResponseBuilder().setStatus("400 Bad Request").setBody(res);
        }

        // Check if the amount is valid
        if (transferRequestDto.amount <= 0) {
            var res = new RestApiAppResponse<>(false, null, "Invalid amount");
            return (new HttpResponseBuilder()).setStatus("400 Bad Request").setBody(GsonTool.gson.toJson(res));
        }


        // both users exist and have enough funds to move
        fromUser.setBalance(fromUser.getBalance()  - transferRequestDto.amount);
        toUser.setBalance(toUser.getBalance() + transferRequestDto.amount);
        userDao.put(fromUser);
        userDao.put(toUser);

        // store a transaction
        var transaction = new TransactionDto();
        transaction.setTransactionType(TransactionType.Transfer);
        transaction.setAmount(transferRequestDto.amount);
        transaction.setUserId(authResult.userName);
        transaction.setToId(transferRequestDto.toId);
        transactionDao.put(transaction);

        var res = new RestApiAppResponse<>(false, List.of(fromUser, toUser), null);
        return new HttpResponseBuilder().setStatus(StatusCodes.OK).setBody(res);
    }

}