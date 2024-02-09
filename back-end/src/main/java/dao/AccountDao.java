package dao;

import com.mongodb.client.MongoCollection;
import dto.AccountDto;

import org.bson.Document;

import java.sql.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class AccountDao extends BaseDao<AccountDto>{
    private static AccountDao instance;

    private AccountDao(MongoCollection<Document> collection){super(collection);}

    public static AccountDao getInstance(){
        if (instance != null){
            return instance;
        }
        instance = new AccountDao(MongoConnection.getCollection("AccountDao"));
        return instance;
    }

    public static AccountDao getInstance(MongoCollection<Document> collection){
        instance = new AccountDao(collection);
        return instance;
    }

    /**
     *
     * returns all of userId's accounts
     * jaycee
     */
    public List<AccountDto> getAllAccounts(String userId){
        Document filter = new Document("userId", userId);

        return this.collection.find(filter)
                .into(new ArrayList<>())
                .stream()
                .map(AccountDto::fromDocument)
                .collect(Collectors.toList());
    }

    public List<AccountDto> query(Document filter){
        return this.collection.find(filter)
                .into(new ArrayList<>())
                .stream()
                .map(AccountDto::fromDocument)
                .collect(Collectors.toList());
    }
}
