import React, { useState, useEffect } from 'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: '71vh',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: '20px',
    right: '40px',
    left: '400px',
    borderTop: '1px solid grey'
},

button: {
    border: 'none',
    color: '#676767',
    backgroundColor: '#EAEAEA',
    justifyContent: 'space-evenly',
    borderRadius: '10px',
    fontSize: '0.8rem',
    cursor: 'pointer',
    marginBottom: '20px'
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
});

export default function ViewTransactions() {
  const classes = useStyles();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('/getTransactionHistory', { credentials: 'include' }) 
      .then((res) => res.json())
      .then((apiRes) => {
        if (apiRes.status) {
          setTransactions(apiRes.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching transaction history:', error);
      });
  }, []);

  return (
    <Container className={classes.root}>
      <h2>Transaction History</h2>
      <Table>
        <TableHead className={classes.tagsContainer}>
          <TableRow className={classes.tags}> 
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th>From User</th>
            <th>To User</th>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {transactions.map((transaction, index) => (
            <TableRow key={index}>
              <td>{transaction.transactionType}</td>
              <td>${transaction.amount}</td>
              <td>{new Date(transaction.timestamp).toLocaleString()}</td>
              <td>{transaction.userId}</td>
              <td>{transaction.toId}</td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </Container>
  );
}
