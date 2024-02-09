package dto;

import org.bson.Document;

import java.time.Instant;

public class TransactionDto extends BaseDto {

    private String userId;
    private String toId;
    private Double amount;
    private TransactionType transactionType;
    private Long timestamp;
    private String accountName; // jaycee; needed for account withdraw/deposit

    public TransactionDto() {
        timestamp = Instant.now().toEpochMilli();
    }

    public TransactionDto(String uniqueId) {
        super(uniqueId);
        timestamp = Instant.now().toEpochMilli();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getToId() {
        return toId;
    }

    public void setToId(String toId) {
        this.toId = toId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public String getAccountName(){return accountName;}

    public void setAccountName(String accountName){this.accountName = accountName;}

    public void setTransactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
    }

    public Document toDocument() {

        // for final project
        return new Document()
                .append("userId", userId)
                .append("toId", toId)
                .append("amount", amount)
                .append("transactionType", transactionType.toString())
                .append("accountName", accountName) // new; jaycee
                .append("timestamp", timestamp);
    }

    public static TransactionDto fromDocument(Document document) {

        // for final project
        TransactionDto transactionDto = new TransactionDto();

        transactionDto.loadUniqueId(document);
        transactionDto.timestamp = document.getLong("timestamp");
        transactionDto.userId = document.getString("userId");
        transactionDto.toId = document.getString("toId");
        transactionDto.amount = document.getDouble("amount");
        transactionDto.accountName = document.getString("accountName"); // new; jaycee
        transactionDto.transactionType = TransactionType.valueOf(document.getString("transactionType"));

        return transactionDto;
    }
}
