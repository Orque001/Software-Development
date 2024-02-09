package handler;

import dao.AccountDao;
import dao.TransactionDao;
import dao.UserDao;
import dto.AccountDto;
import dto.AccountType;
import dto.UserDto;
import org.bson.Document;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import handler.AuthFilter.AuthResult;
import response.RestApiAppResponse;

import java.util.List;

public class CreateAccountHandler implements BaseHandler {

    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {

        AccountDto accountDto = GsonTool.gson.fromJson(request.getBody(), AccountDto.class);
        AccountDao accountDao = AccountDao.getInstance();
        UserDao userDao = UserDao.getInstance();

        // check if logged in
        AuthResult authResult = AuthFilter.doFilter(request);
        if (!authResult.isLoggedIn) {
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }

        // check if
        var query = new Document("accountName",accountDto.getAccountName())
                .append("userId", accountDto.getUserId());
        var resultQ = accountDao.query(query);
        if (resultQ.size() != 0){
            var res = new RestApiAppResponse<>(false, null, "Account already exists");
            return new HttpResponseBuilder().setStatus(StatusCodes.BAD_REQUEST).setBody(res);
        }

        // check if initial value is valid
        if (accountDto.getBalance() < 0) {
            var res = new RestApiAppResponse<>(false, null, "Invalid initial balance");
            return new HttpResponseBuilder().setStatus(StatusCodes.BAD_REQUEST).setBody(GsonTool.gson.toJson(res));
        }


        // check if valid account type
        if (!accountDto.getAccountType().equalsIgnoreCase(AccountType.Checking.toString())){
            if (!accountDto.getAccountType().equalsIgnoreCase(AccountType.Savings.toString())){
                var res = new RestApiAppResponse<>(false, null, "Invalid account type");
                return new HttpResponseBuilder().setStatus(StatusCodes.BAD_REQUEST).setBody(GsonTool.gson.toJson(res));
            }
        }

        UserDto userDto = userDao.query(new Document("userName", authResult.userName)).get(0);
        accountDto.setUserId(authResult.userName);
        accountDao.put(accountDto);

        var res = new RestApiAppResponse<>(true, List.of(accountDto), null);
        return new HttpResponseBuilder().setStatus(StatusCodes.OK).setBody(res);
    }
}
