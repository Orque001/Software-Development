import { Container, Grid, makeStyles, TextField, Typography, Button } from '@material-ui/core'
import {Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
    root: {
      fontFamily: 'Roboto',
      fontWeight: 600,
      height: '72vh',
      width: 'inherit',
      backgroundColor: 'white',
      position: 'absolute',
      bottom: '20px',
      right: '40px',
      left: '400px',
  
      borderTop: '1px solid grey'
  
    },
    textfield: {
      borderRadius: '0px',
      border: '1px solid black',
      backgroundColor: 'white',
      width: '350px',
      maxHeight: '25px',
      marginBottom: '25px',
    },
    submitbutton: {
      marginTop: '25px',
      backgroundColor: '#384859',
      width: '200px',
      borderRadius: '31px',
      boxShadow: '0px 0px 0px 0px',
      '&:hover': {
        backgroundColor: '#446181',
        boxShadow: '0px 0px 0px 0px',
      },
      textTransform: 'none',
    },
    tagsContainer: {
      backgroundColor: '#384859'
  },
  tags: {
      color: '#F7F9FE'
  },
  
  tableBody: {
      textAlign: 'center',
  }
  
  }))

export default function CreateAccount() {

    const classes = useStyles();
    const [userInfo, setUserInfo] = React.useState([]);
    const [accountType, setAccountType] = React.useState('');
    const [accountName, setAccountName] = React.useState('');
    const [balance, setBalance] = React.useState('');
    const [message, setMessage] = React.useState('');
    const[userAccounts, setUserAccounts] = React.useState([]);
    const[rowAmount, setRowAmount] = React.useState([]);
    const mapRows = new Map();

    function updateAmount(event){
        setMessage('');
        const numberValue = Number(event.target.value);
        console.log(numberValue)
        if (isNaN(numberValue)){
            return;
        }
        setBalance(numberValue);
    }

    function updateRowAmount(event){
      setMessage('');
      const numberValue = Number(event.target.value);
      console.log(numberValue)
      if (isNaN(numberValue)){
          return;
      }
      mapRows.set(event.target.value, numberValue);
      setRowAmount(numberValue);
    }

    React.useEffect(() => {
      fetchUserInfo();
      getAccounts();
    }, []);

    function fetchUserInfo() {
        fetch('/getUserInfo')
            .then((res) => res.json())
            .then((apiRes) => {
                setUserInfo(apiRes.data);
            })
            .catch((err) => console.log(err)); // it did not work
    }

    async function createAccount(){
        setMessage('');
        fetchUserInfo();
        console.log(userInfo[0].userName);
        // console.log(userId);
        if (accountType === '' || balance === '' || accountName === ''){
            alert('Please fill out all fields');
            return;
        }
        const accountDto = {
            userId: userInfo[0].userName,
            accountType,
            balance: Number(balance),
            accountName
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(accountDto),
            credentials: 'include',
        };
        const res = await fetch('/createAccount', options);
        const apiRes = await res.json();
        console.log(apiRes);
        if (apiRes.status === false) {
          alert(apiRes.message);
          setAccountName('');
          setBalance('');
        } else {
          alert("Account created successfully!");
          setAccountName('');
          setBalance('');
          setAccountType('');
        }
        getAccounts();
    }
    function getAccounts() {
      fetchUserInfo();
      fetch('/getAllAccounts')
          .then((res) => res.json())
          .then((apiRes) => {
              setUserAccounts(apiRes.data);
              console.log(apiRes);
          })
          .catch((err) => console.log(err)); // it did not work
  }
  async function withdrawFromAccount(index){
    setMessage('');
    const numberValue = Number(rowAmount);
    if (isNaN(numberValue)){
        return;
    }
    const transactionDto = {
      userId: userInfo[0].userName,
      amount: numberValue,
      accountName: userAccounts[index].accountName,
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(transactionDto),
      credentials: 'include',
    };
    const result = await fetch('/withdrawFromAccount', options);
    const apiRes = await result.json();
    if (apiRes.status === false) {
      alert(apiRes.message);
      setBalance('');
    } else{
      alert("Withdrawal successful!");
      setBalance('');
    }
    fetchUserInfo();
    getAccounts();
  }

  async function depositToAccount(index){
    setMessage('');
    const numberValue = Number(rowAmount);
    if (isNaN(numberValue)){
        return;
    }
    const transactionDto = {
      userId: userInfo[0].userName,
      amount: numberValue,
      accountName: userAccounts[index].accountName,
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(transactionDto),
      credentials: 'include',
    };
    const result = await fetch('/depositToAccount', options);
    const apiRes = await result.json();
    if (apiRes.status === false) {
      alert(apiRes.message);
      setBalance('');
    } else{
      alert("Deposit successful!");
      setBalance('');
    }
    fetchUserInfo();
    getAccounts();
  }

    
    // console.log(userInfo[0]);
    return (

        <div>

      <Grid className={classes.root} container spacing={3}>
        <Grid item xs={4}>
          <Container >
            <Container>
              <Typography variant="h5" align="left">
                User Name
                {userInfo.map(uInfo => (
                  <h5>{uInfo.userName}</h5>
                ))}
                {userInfo.userName}
              </Typography>
            </Container>

            <Container>
              {/* container for account type, 2 selections: savings or checking */}
              <Typography variant="h6" align="left">
                Account Type
              </Typography>
              <select value={accountType} onChange={e => setAccountType(e.target.value)}>
                <option value="">Select an Account Type</option>
                <option value="Checking">Checking</option>
                <option value="Savings">Savings</option>
              </select>
            </Container>
            <Container>
              <Typography variant="h6" align="left">
                Account Name
              </Typography>
              <TextField InputProps={{ disableUnderline: true }} className={classes.textfield} value={accountName} onChange={e => setAccountName(e.target.value)} required />
            </Container>
            <Container>
              <Typography variant="h6" align="left">
                Initial Deposit
              </Typography>
              <TextField InputProps={{ disableUnderline: true }} className={classes.textfield} value={balance} onChange={updateAmount} required />
            </Container>

            <Container>
              {message}
              <Button className={classes.submitbutton} variant="contained" color="primary" onClick={createAccount}>
                Create Account
              </Button>
            </Container>
          </Container>

          {/* insert line break */}
          <hr></hr>
          <Container> 
            {/* create container to display all of users accounts as a table*/}
            <Container>
              <Typography variant="h5" align="left">
                {/* {console.log(userAccounts)} */}
                User Accounts
              </Typography>
              <Table>
        <TableHead className={classes.tagsContainer}>
          <TableRow className={classes.tags}> 
            {/* <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th>From User</th>
            <th>To User</th> */}
            <th>Account Name</th>
            <th>Account Type</th>
            <th>Balance</th>
            <th>Date Created</th>
            <th>Amount to Withdraw/Deposit</th>
            <th>Withdraw</th>
            <th>Deposit</th>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {userAccounts.map((account, index) => (
            <TableRow key={index}>
              {/* <td>{account.transactionType}</td>
              <td>${account.amount}</td>
              <td>{new Date(account.timestamp).toLocaleString()}</td>
              <td>{account.userId}</td>
              <td>{account.toId}</td> */}
              <td>{account.accountName}</td>
              <td>{account.accountType}</td>
              <td>${account.balance}</td>
              <td>{new Date(account.timeCreated).toLocaleString()}</td>
              <td><TextField InputProps={{ disableUnderline: true }} className={classes.textfield} value={mapRows.get(index)} onChange={updateRowAmount} required /></td>
              <td><Button className={classes.submitbutton} variant="contained" color="primary" onClick={() => withdrawFromAccount(index)}>Withdraw</Button></td>
              <td><Button className={classes.submitbutton} variant="contained" color="primary" onClick={() => depositToAccount(index)}>Deposit</Button></td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
            </Container>
          </Container>

        </Grid>
      </Grid>
    </div>
    );
}