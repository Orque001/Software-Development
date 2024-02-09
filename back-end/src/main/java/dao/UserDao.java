package dao;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.UpdateOptions;
import dto.UserDto;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.bson.Document;



public class UserDao extends BaseDao<UserDto> {

    private static UserDao instance;

    private UserDao(MongoCollection<Document> collection) {
        super(collection);
    }

    public static UserDao getInstance() {
        if (instance != null) {
            return instance;
        }
        instance = new UserDao(MongoConnection.getCollection("UserDao"));
        return instance;
    }

    public static UserDao getInstance(MongoCollection<Document> collection) {
        instance = new UserDao(collection);
        return instance;
    }

    public void addContact(String userId, String contactId){
        UserDto user = query(new Document("userName", userId)).stream().findFirst().orElse(null);
        if(user != null){
            user.addContact(contactId);
            put(user);
        }
    }


    public List<UserDto> query(Document filter) {

        // use find and into
        return this.collection.find(filter)
                .into(new ArrayList<>())
                .stream()
                .map(UserDto::fromDocument)
                .collect(Collectors.toList());

    }

}
