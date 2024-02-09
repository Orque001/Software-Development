package dto;

import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

public class UserDto extends BaseDto {

    private String userName;
    private String password;
    private Double balance = 0.0d;

    private List<String> contacts = new ArrayList<>();

    public UserDto() {
        super();
    }

    public UserDto(String uniqueId) {
        super(uniqueId);
    }

    public String getPassword() {
        return password;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public List<String> getContacts(){
        return contacts;
    }

    public void addContact(String contactId){
        contacts.add(contactId);
    }

    public Document toDocument() {
        return new Document()
                .append("balance", balance)
                .append("userName", userName)
                .append("password", password)
                .append("contacts", contacts);
    }

    public static UserDto fromDocument(Document match) {
        var userDto = new UserDto();

        if (match.get("_id") != null) { // if connected to real db
            userDto.loadUniqueId(match);
        }

        userDto.balance = match.getDouble("balance");
        userDto.userName = match.getString("userName");
        userDto.password = match.getString("password");
        userDto.contacts = match.getList("contacts", String.class);

        return userDto;
    }
}

