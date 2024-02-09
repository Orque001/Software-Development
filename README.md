# Final Project Demo Link

Link: https://youtu.be/horI5_mOIi4

## Project Description


Each team member include short description of what each member did. 
- 1 paragraph on the feature added, and approach, 
- 1 paragraph on difficulties encountered.
- If not complete, add 1 more paragraph on what work is left before next week.




### Elias Magdaleno:
I worked on the ability to add contacts to our banking app. My approach was to first modify the UserDto to store an ArrayList of contacts so each user would have their own. When adding a contact it checks to see if the contact exists then if it has already been added previously, if not then the contact will be added to the user's list of contacts.

During the implementation, I ran into issues when adding someone as a contact, I would get a response saying that the contact had been successfully added but when checking the database there were no contacts added. I also attempted to do the front-end for this feature but I struggled to get mongodb working, I kept getting "Proxy error: Could not proxy request /createUser from localhost:3000 to http://localhost:1299/." when trying to sign in or create a new account. I have yet to solve that issue.

The work I have left to complete is first to finish debugging my backend to figure out why contacts are not being properly added, second is to fix my proxy issue so that I can run react and run the front-end. Once I can run the front-end I have do the javascript needed to get the contact system working on the front-end.


### Jaycee Lorenzo:
**Features**
- Account Creation
  <br> The user is now able to create accounts (savings and checking) with independent balances. I created a new DTO and its respective DAO to capture the information needed to create an account such as the `userId` (the owner of the account), initial `balance`, `accountType`, and `accountName`. To implement the new DTO and DAO, I created a `CreateAccountHandler` class that would create a new account based on the parameters of the request. This would also implement the usage of `AuthResult` to ensure the user is logged in before making an account. Each account has a unique name so that a user cannot have accounts with the same name, but does not affect the names of other users' accounts. Currently, there are only two available types of accounts, Savings and Checking.
- Withdraw and Deposit into Account
  <br> I also added functionality to the accounts where the user is able to withdraw or deposit money into these new accounts. This was done by first adding a data field to the already existing `TransactionDto` where the request can contain the account name. Each function has their own handler, similar to the base `WithdrawHandler` and `DepositHandler`, which performed the function to the respective accounts.

**Issues**
An issue I encountered was figuring out how to implement the existing classes and functions to create the new feautures. I approached this by making a list of classes that I could possibly use to implement and a list of classes or enums that need
to be created. Drawing and mapping out what needs to be completed helped me break the project into smaller much more manageable tasks. In addition, I was unable to finish the front-end implementation of my feautures. I plan on completing this in 
the same manner I completed the back-end of the project where I would map out what is done already and what can I take away from it and implement it in my own way. 


### Riel Orque: 
The features I added was the for the user to be able to view their transaction history. To add this feature, I had to create a method in the TransactionDao that is able to retrieve transaction data from the database. I also had to update HandlerFactory to route the requests to /getTransactions. I also added a GetTransactionHistoryHandler class in the Handler class that fetches transaction history for thge user. It implements the TransactionDao. For the front-end, I added a Transactions page in the pages folder and added routing in App.js. To do this I had to create a new react component to fetch and disply transaction history. 

The difficulties I encountered were what to start off with first. I know that I to somehow retrieve the data for the transaction history and to be able to display. I approached this by looking at past hw assignments and how GetTransactionHandler and TransactionDao. This helped me start off the GetTransactionHistoryForUser and GetTransactionHistoryHandler. The other problem I had was implementing it in the front-end. I had to play around with making a new Transaction page and then realizing that I had to also fetch the request in the App.js for it to display the page.


### Sean Nguyen:
The feature that I added was for the user to be able to refund transfers. The way that I wanted this to function was for the user to be able to refund their transactions. My approach to this problem is first work on the back-end and then work on the front end. What I did was to create a transaction type called refund. I also created a new case for the handlerfactory that was called refund. I also created the refund handler. How the refund handler worked was that it was similiar to the transfers and the windraws but instead it would check if the user was valid, and if the amount being refunded was valid, and if both of those passed, the amounnt would be refunded. </br>

There were several difficulities that I encountered. The first difficulty was thinking about how I wanted to handle the refunds. I wasn't too sure on how I would be able to get both all of the data from the previous transactions. Another difficulty that I encounntered was not knowing how I wanted to struture the front end of the refunds. Initially, I wanted to add my feature on top of the transaction history page. Howeever, I decided to just create my own refund page as to not have to work on top of other people. </br>

There are several parts that I still have to do. I still have to create the front end of the refund page. This is the main thing to work on as the back end aspect of the refunds is already completed. Once the front-end is finished, I will be able to complete a full demo.</br>


### Yee-Tsing Yang:

**Features and approaches**
- Logout
<br>  Firstly, I added a `delete` method in AuthDao, and it takes a parameter `filter` of type `Document`. And it uses MongoDB deleteMany method to delete multiple documents in MongoDB that match the specified filter. Then, I implemented the LogoutHandler to handle logout requests and updated HandlerFactory. The handler begins by obtaining an instance of the `AuthDao` class, which manages user authentication data. If the user is authenticated, the handler retrieves the username of the logged in user from the `AuthResult` object. Then the handler deletes the user's session in AuthDao database by applying the created MongoDB filter. For the front-end, logout will redirect the user to login page.</br> 

- Get user info
<br> I also added a GetUserInfoHandler to get the user’s information like user name and balance. Upon receiving a request, the handler first utilizes the `AuthResult` to perform authentication, checking whether the user is logged in. If authentication is successful, the handler then interacts with the UserDao to query the database for the user's information based on their authenticated username. Finally, it constructs a response using the HttpResponseBuilder with a status of "200 OK" and embeds the user information within a RestApiAppResponse object.  </br> 

- Front-end 
<br>I implemented the following pages: login, overview, deposit, withdraw, transfer, sidebar, header, table with pagination in overview page. Review professor’s videos on React and reading documentation helped a lot.</br> 


**Difficulties encountered**
<br>One difficulty I encountered is mistakenly connecting to the wrong MongoDB database named "Homework2" instead of the intended "TeamGG-bank" as configured in our MongoConnection.java file. This error resulted some unexpected outcomes when I interacted with the server. Another difficult is unfamiliarity with JavaScript and react. Unlike java that uses classes. In React, components and their rendering functions are expected to be pure, taking props and state as input. </br> 


##




