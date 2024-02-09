package handler;

import dao.TransactionDao;
import dto.TransactionDto;
import handler.AuthFilter.AuthResult;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

import java.util.List;

public class GetTransactionHistoryHandler implements BaseHandler {

    /**
     * getTransactionHistory function to retrieve and display transaction history
     * Riel
     * */
    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {
        TransactionDao transactionDao = TransactionDao.getInstance();
        AuthFilter.AuthResult authResult = AuthFilter.doFilter(request);

        if (!authResult.isLoggedIn) {
            return (new HttpResponseBuilder()).setStatus("401 Unauthorized");
        }

        List<TransactionDto> transactionHistory = transactionDao.getTransactionHistoryForUser(authResult.userName);
        var res = new RestApiAppResponse<>(true, transactionHistory, null);
        return (new HttpResponseBuilder())
                .setStatus("200 OK")
                .setBody(res);
    }
}