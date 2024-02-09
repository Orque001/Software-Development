package handler;

import dao.AccountDao;
import dao.TransactionDao;
import dto.AccountDto;
import dto.TransactionDto;
import dto.TransactionType;
import org.bson.Document;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

import java.util.List;

public class DepositToAccountHandler implements BaseHandler{
    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request){

        TransactionDto transactionDto = GsonTool.gson.fromJson(request.getBody(), TransactionDto.class);
        TransactionDao transactionDao = TransactionDao.getInstance();
        AccountDao accountDao = AccountDao.getInstance();

        AuthFilter.AuthResult authResult = AuthFilter.doFilter(request);
        if(!authResult.isLoggedIn){
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }

        // check if user has requested account
        List<AccountDto> accounts = accountDao.query(new Document("accountName", transactionDto.getAccountName())
                .append("userId", transactionDto.getUserId()));
        if (accounts.size() == 0){
            var res = new RestApiAppResponse<>(false, null, "Account does not exist");
            return new HttpResponseBuilder().setStatus(StatusCodes.BAD_REQUEST).setBody(res);
        }

        AccountDto accountDto = accounts.get(0);

        // check if amount is valid
        if (transactionDto.getAmount() <= 0){
            var res = new RestApiAppResponse<>(false, null, "Invalid amount");
            return (new HttpResponseBuilder()).setStatus("400 Bad Request").setBody(GsonTool.gson.toJson(res));
        }

        transactionDto.setTransactionType(TransactionType.Deposit);
        transactionDto.setAccountName(accountDto.getAccountName());
        transactionDto.setUserId(authResult.userName);
        transactionDao.put(transactionDto);

        accountDto.setBalance(accountDto.getBalance() + transactionDto.getAmount());
        accountDao.put(accountDto);
        var res = new RestApiAppResponse<>(true, List.of(transactionDto), null);
        return new HttpResponseBuilder().setStatus(StatusCodes.OK).setBody(res);
    }
}
