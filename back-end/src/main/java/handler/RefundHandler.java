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

public class RefundHandler implements BaseHandler {

    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {
        TransactionDao transactionDao = TransactionDao.getInstance();
        UserDao userDao = UserDao.getInstance();

        TransactionDto refundRequestDto = GsonTool.gson.fromJson(request.getBody(), TransactionDto.class);

        AuthFilter.AuthResult authResult = AuthFilter.doFilter(request);
        if (!authResult.isLoggedIn) {
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }

        //Gets the user making the refund
        UserDto userDto = userDao.query(new Document("userName", authResult.userName)).iterator().next();
        if (userDto == null) {
            var res = new RestApiAppResponse<>(false, null, "Invalid user.");
            return new HttpResponseBuilder().setStatus("400 Bad Request").setBody(res);
        }

        //Checks if the refund amount is valid
        if (refundRequestDto.getAmount() <= 0) {
            var res = new RestApiAppResponse<>(false, null, "Invalid refund amount");
            return new HttpResponseBuilder().setStatus("400 Bad Request").setBody(res);
        }

        //Updates user's balance and store the refund transaction
        userDto.setBalance(userDto.getBalance() + refundRequestDto.getAmount());
        userDao.put(userDto);

        var refundTransaction = new TransactionDto();
        refundTransaction.setTransactionType(TransactionType.Refund);
        refundTransaction.setAmount(refundRequestDto.getAmount());
        refundTransaction.setUserId(authResult.userName);
        transactionDao.put(refundTransaction);

        var res = new RestApiAppResponse<>(true, List.of(userDto), null);
        return new HttpResponseBuilder().setStatus(StatusCodes.OK).setBody(res);
    }
}
