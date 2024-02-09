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
    },
});

export default function ViewRefunds() {
    const classes = useStyles();
    const [refunds, setRefunds] = useState([]);

    const handleRefund = (transactionId) => {
        fetch('/refund', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transactionId }),
        })
            .then((res) => res.json())
            .then((apiRes) => {
                if (apiRes.status) {
                    //update the frontend
                    console.log('Refund successful:', apiRes);
                    //reload the page
                    window.location.reload();
                } else {
                    //refund was not successful
                    console.error('Refund failed:', apiRes);
                }
            })
            .catch((error) => {
                console.error('Error refunding:', error);
            });
    };

    useEffect(() => {
        fetch('/getTransactionHistory', { credentials: 'include' })
            .then((res) => res.json())
            .then((apiRes) => {
                if (apiRes.status) {
                    const transferRefunds = apiRes.data.filter(transaction => transaction.transactionType === 'transfer');
                    setRefunds(transferRefunds);
                }
            })
            .catch((error) => {
                console.error('Error fetching refund history:', error);
            });
    }, []);

    return (
        <Container className={classes.root}>
            <h2>Refund History</h2>
            <Table>
                <TableHead className={classes.tagsContainer}>
                    <TableRow className={classes.tags}>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>From User</th>
                        <th>To User</th>
                        <th>Refund</th>
                    </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                    {refunds.map((refund, index) => (
                        <TableRow key={index}>
                            <td>{refund.transactionType}</td>
                            <td>${refund.amount}</td>
                            <td>{new Date(refund.timestamp).toLocaleString()}</td>
                            <td>{refund.userId}</td>
                            <td>{refund.toId}</td>
                            <td>
                                <button onClick={() => handleRefund(refund._id)}>Refund</button>
                            </td>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}
