 package handler;

import dao.TransactionDao;
import dao.UserDao;
import dto.TransactionDto;
import dto.TransactionType;
import dto.UserDto;
import org.bson.Document;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

import java.util.List;
import java.util.Optional;

public class WithdrawHandler implements BaseHandler {

    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {

        TransactionDto transactionDto = GsonTool.gson.fromJson(request.getBody(), TransactionDto.class);
        TransactionDao transactionDao = TransactionDao.getInstance();
        UserDao userDao = UserDao.getInstance();

        AuthFilter.AuthResult authResult = AuthFilter.doFilter(request);
        if(!authResult.isLoggedIn){
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }

        UserDto userDto = userDao.query(new Document("userName", authResult.userName)).get(0);

        // Check if there is enough balance to withdraw
        if (userDto.getBalance() < transactionDto.getAmount()) {
            var res = new RestApiAppResponse<>(false, null, "Not enough balance");
            return (new HttpResponseBuilder()).setStatus("400 Bad Request").setBody(GsonTool.gson.toJson(res));
        }

        // Check if the amount is valid
        if (transactionDto.getAmount() <= 0) {
            var res = new RestApiAppResponse<>(false, null, "Invalid amount");
            return (new HttpResponseBuilder()).setStatus("400 Bad Request").setBody(GsonTool.gson.toJson(res));
        }

        transactionDto.setTransactionType(TransactionType.Withdraw);
        transactionDto.setUserId(authResult.userName);
        transactionDao.put(transactionDto);

        userDto.setBalance(userDto.getBalance() - transactionDto.getAmount());
        userDao.put(userDto);
        var res = new RestApiAppResponse<>(true, List.of(transactionDto), null);
        return new HttpResponseBuilder().setStatus(StatusCodes.OK).setBody(res);
    }
}
