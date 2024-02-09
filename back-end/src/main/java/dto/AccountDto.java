package dto;

import org.bson.Document;
import java.time.Instant;

public class AccountDto extends BaseDto{
    private String userId;
    private double balance;
    private AccountType accountType;
    private Long timeCreated;

    private String accountName;

    public AccountDto(){timeCreated = Instant.now().toEpochMilli();}

    public AccountDto(String uniqueId){
        super(uniqueId);
        timeCreated = Instant.now().toEpochMilli();
    }

    public String getUserId(){return userId;}

    public void setUserId(String userId){this.userId = userId;}

    public Double getBalance(){return balance;}

    public void setBalance(Double amount){this.balance = amount;}

    public Long getTimeCreated(){return timeCreated;}

    public void setTimeCreated(Long timeCreated){this.timeCreated = timeCreated;}

    public void setAccountType(AccountType accountType){this.accountType = accountType;}

    public String getAccountType(){return this.accountType.toString();}

    public void setAccountName(String accountName){this.accountName = accountName;}

    public String getAccountName(){return accountName;}

    public Document toDocument(){
        return new Document()
                .append("userId", userId)
                .append("accountType", accountType.toString())
                .append("balance", balance)
                .append("timeCreated", timeCreated)
                .append("accountName", accountName);
    }

    public static AccountDto fromDocument(Document document){
        AccountDto accountDto = new AccountDto();

        accountDto.loadUniqueId(document);
        accountDto.timeCreated = document.getLong("timeCreated");
        accountDto.userId = document.getString("userId");
        accountDto.balance = document.getDouble("balance");
        accountDto.accountType = AccountType.valueOf(document.getString("accountType"));
        accountDto.accountName = document.getString("accountName");

        return accountDto;
    }
}
