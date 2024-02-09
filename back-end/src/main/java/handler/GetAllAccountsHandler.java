package handler;

import dao.AccountDao;
import dto.AccountDto;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

import java.util.List;

public class GetAllAccountsHandler implements BaseHandler{

    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request){
        AccountDao accountDao = AccountDao.getInstance();
        AuthFilter.AuthResult authResult = AuthFilter.doFilter(request);

        if (!authResult.isLoggedIn){
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }

        List<AccountDto> listOfAccounts = accountDao.getAllAccounts(authResult.userName);
        var res = new RestApiAppResponse<>(true, listOfAccounts, null);
        return new HttpResponseBuilder().setStatus(StatusCodes.OK).setBody(res);
    }
}
