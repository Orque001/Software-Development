import React from 'react';

import { makeStyles } from '@material-ui/core';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@material-ui/core';
import { useEffect, useState } from "react";



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

export default function Overview() {


    const classes = useStyles();

    const [userInfo, setUserInfo] = React.useState([]);
    const [transactions, setTransactions] = React.useState([]);

    // sort transaction based on timestamp, in descending order
    const sortedTransactions = [...transactions].sort((a, b) => b.timestamp - a.timestamp);


    // Handle table page change
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedTransactions.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Add empty rows if there are not enough transactions for the current page
    const emptyRows = Array.from({ length: itemsPerPage - currentItems.length }, (_, index) => (
        <tr key={`empty-${index}`}>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    ));


    function fetchTransaction() {
        fetch('/getTransactions')
            .then((res) => res.json())
            .then((apiRes) => {
                console.log(apiRes);
                // will see transactions here as they come
                setTransactions(apiRes.data);
            })
            .catch((error) => {
                console.log(error);
            }) // it did not work
    }

    function fetchUserInfo() {
        fetch('/getUserInfo')
            .then((res) => res.json())
            .then((apiRes) => {
                console.log(apiRes);
                // get user info from database
                setUserInfo(apiRes.data);
            })
            .catch((error) => {
                console.log(error);
            }) // it did not work
    }

    React.useEffect(() => {
        // triggers when componenet mounds
        // https://react.dev/reference/react/useEffect
        // fetching data
        // https://developer.mozilla.org/en-US/docs/Web/API/fetch

        fetchTransaction();
        fetchUserInfo();
    }, []);



    return (
        <div>
            <div className={classes.root}>

                <h4>
                    <AccountCircleIcon />
                    Logged in:    &nbsp;
                    {userInfo.map(uInfo => (
                        <>{uInfo.userName}</>
                    ))}



                    &nbsp; &nbsp;&nbsp;   &nbsp;&nbsp; &nbsp;

                    <MonetizationOnIcon />
                    Current Balance: $
                    {userInfo.map(uInfo => (
                        <>{uInfo.balance.toFixed(2)}</>
                    ))}


                </h4>

                <table>
                    <thead className={classes.tagsContainer}>
                        <tr className={classes.tags}>
                            <th >
                                Type
                            </th>
                            <th>
                                Amount
                            </th>
                            <th>
                                Date
                            </th>
                            <th>
                                From user
                            </th>
                            <th>
                                To user
                            </th>
                        </tr>
                    </thead>
                    <tbody className={classes.tableBody}>
                        {currentItems.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.transactionType}</td>
                                <td>${transaction.amount}</td>
                                <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                                <td>{transaction.userId}</td>
                                <td>{transaction.toId}</td>
                            </tr>
                        ))}
                        {emptyRows}
                    </tbody>
                </table>

                <div style={{marginTop: '10px'}}>


                    <Button className={classes.button}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </Button>
                    <span style={{ margin: '0 10px', marginTop: '10px' }}> Page {currentPage} of {totalPages} </span>
                    <Button className={classes.button}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>


            </div>

        </div>
    );
}

