package handler;

import request.ParsedRequest;

public class HandlerFactory {
    // routes based on the path. Add your custom handlers here
    public static BaseHandler getHandler(ParsedRequest request) {
        return switch (request.getPath()) {
            // for final project, add new handler if needed

            case "/createUser" -> new CreateUserHandler();

            case "/login" -> new LoginHandler();

            case "/logout" -> new LogoutHandler();

            case "/getUserInfo" -> new GetUserInfoHandler();

            case "/getTransactions" -> new GetTransactionsHandler();

            case "/createDeposit" -> new CreateDepositHandler();

            case "/transfer" -> new TransferHandler();

            case "/withdraw" -> new WithdrawHandler();

            case "/getTransactionHistory" -> new GetTransactionHistoryHandler();

            case "/addContact" -> new AddContactHandler();


            case "/refund" -> new RefundHandler();

            case "/createAccount" -> new CreateAccountHandler();

            case "/withdrawFromAccount" -> new WithdrawFromAccountHandler();

            case "/depositToAccount" -> new DepositToAccountHandler();

            case "/getAllAccounts" -> new GetAllAccountsHandler();


            default -> new FallbackHandler();

        };
    }

}
