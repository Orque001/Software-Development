import React, { useState, useEffect, } from 'react'
import Card from '@material-ui/core/Card'
import { ThemeProvider, createTheme, makeStyles } from '@material-ui/core/styles'
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import CreditCardSharpIcon from '@material-ui/icons/CreditCardSharp';
import LogoutIcon from '@mui/icons-material/Logout';
import SavingsIcon from '@mui/icons-material/Savings';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Navigate, useNavigate, useLocation } from 'react-router-dom'


const theme = createTheme({
    typography: {
        h6: {
            fontWeight: '700'
        }
    },
});

const useStyles = makeStyles({
    root: {
        width: 300,
        color: 'primary',
       fontWeight: '700'
    },
    Typography: {
        marginRight: '18px',
        marginTop: '4px',
        color: 'white'
    },
    options: {
        color: 'white'
    },
    Box: {
        height: '50px',
        width: '300px',
        marginLeft: '-16px',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '20px',
        paddingBottom: '20px'


    },
    icons: {
        paddingLeft: '50px'
    }
});



export default function SideBar() {
    const location = useLocation()

    const navigate = useNavigate()
    const classes = useStyles();

    const [overviewBg, setOverviewBg] = useState('#44586D');
    const [depositBg, setDepositBg] = useState();
    const [withdrawBg, setWithdrawBg] = useState();
    const [transferBg, setTransferBg] = useState();
    const [transactionBg, setTransactionBg] = useState();
    const [accountBg, setAccountBg] = useState();

    const [logOutBg, setLogOutBg] = useState();
    const [shouldRedirect, setShouldRedirect] = React.useState(false);



    // Logout user, and remove from authDao
    function logOut() {

        const options = {
            method: 'POST',
        };

        fetch('/logout', options)

            .then((apiRes) => {
                console.log(apiRes);
                if (apiRes.ok) {
                    console.log('Logout worked');
                    setShouldRedirect(true);
                }

            })
            .catch((error) => {
                console.log(error);

            })
    }



    useEffect(() => {
        if (location.pathname == '/main' || location.pathname == '/main/overview') {  // overview
            setOverviewBg('#44586D')
        }
        else {
            setOverviewBg('')
        }

        if (location.pathname.includes('/main/deposit')) {
            setDepositBg('#44586D')
        }
        else {
            setDepositBg('')
        }


        if (location.pathname.includes('/main/withdraw')) {
            setWithdrawBg('#44586D')
        }
        else {
            setWithdrawBg('')
        }

        if (location.pathname.includes('/main/transfer')) {
            setTransferBg('#44586D')
        }
        else {
            setTransferBg('')
        }

        if (location.pathname.includes('/main/transactions')) {
            setTransactionBg('#44586D')
        }
        else {
            setTransactionBg('')
        }

        if (location.pathname == '/') {
            setLogOutBg('#44586D')
        }
        else {
            setLogOutBg('')
        }

        if (location.pathname.includes('/main/account')) {
            setAccountBg('#44586D')
        } else{
            setAccountBg('')
        }

    }, [location.pathname])

    const overviewBackground = () => {

        return navigate('overview')
    };

    const depositBackground = () => {

        return navigate('deposit')
    };

    const withdrawBackground = () => {

        return navigate('withdraw')
    };

    const transferBackground = () => {

        return navigate('transfer')
    };

    const transactionBackground = () => {

        return navigate('transactions')
    };

    const accountBackground = () => {
        return navigate('accounts');
    };


    // redirect to login page
    if (shouldRedirect) {
        return < Navigate to="/" replace={true} />;
    }



    return (
        <div>
            <ThemeProvider theme={theme}>
                <Card
                    className={classes.root}
                    style={{
                        backgroundColor: '#384859',
                        position: 'absolute',
                        marginLeft: '18px',
                        top: '20px',
                        bottom: '20px',
                        borderRadius: '5px'
                    }}
                    elevation={0}
                >
                    <CardContent>
                        <Box
                            marginTop={'49px'}
                            marginLeft={'-60px'}
                        >
                            <Typography
                                variant='h3'
                                className={classes.options}
                                style={{
                                    width: '300px',
                                    height: '80px',
                                    paddingLeft: '0.7em',
                                    paddingTop: '2.0rem',
                                    paddingBottom: '2.0rem',
                                    marginTop: '1.0rem',
                                    fontWeight: '700'
                                }}
                            >
                                GG Bank
                            </Typography>
                        </Box>

                        <Box
                            className={`${classes.Box} active box`}
                            marginTop={'101px'}
                            component='div'
                            onClick={overviewBackground}
                            style={{ backgroundColor: `${overviewBg}` }}
                        >
                            <Typography
                                className={classes.Typography}
                            >
                                <AssignmentIcon
                                    className={classes.icons} />
                            </Typography>
                            <Typography
                                variant='h6'
                                className={classes.options}
                            >
                                Overview
                            </Typography>
                        </Box>

                        <Box
                            className={`${classes.Box} box`}
                            marginTop={'18px'}
                            component='div'
                            onClick={depositBackground}
                            style={{ backgroundColor: `${depositBg}` }}
                        >
                            <Typography
                                className={classes.Typography}
                            >
                                <SavingsIcon
                                    className={classes.icons} />
                            </Typography>
                            <Typography
                                variant='h6'
                                className={classes.options}
                            >
                                Deposit Money
                            </Typography>
                        </Box>

                        <Box
                            className={`${classes.Box} box`}
                            marginTop={'18px'}
                            component='div'
                            onClick={withdrawBackground}
                            style={{ backgroundColor: `${withdrawBg}` }}
                        >
                            <Typography
                                className={classes.Typography}
                            >
                                <CreditCardSharpIcon
                                    className={classes.icons} />
                            </Typography>
                            <Typography
                                variant='h6'
                                className={classes.options}
                            >
                                Withdraw Money
                            </Typography>
                        </Box>

                        <Box
                            className={`${classes.Box} box`}
                            marginTop={'18px'}
                            component='div'
                            onClick={transferBackground}
                            style={{
                                backgroundColor: `${transferBg}`
                                // paddingBottom: '60px'
                            }}
                        >
                            <Typography
                                className={classes.Typography}
                            >
                                <SyncAltIcon
                                    className={classes.icons} />
                            </Typography>
                            <Typography
                                variant='h6'
                                className={classes.options}
                            >
                                Make a Transfer
                            </Typography>
                        </Box>

                        <Box
                            className={`${classes.Box} box`}
                            marginTop={'18px'}
                            component='div'
                            onClick={transactionBackground}
                            style={{
                                backgroundColor: `${transactionBg}`,
                                // paddingBottom: '60px'
                            }}
                        >
                            <Typography
                                className={classes.Typography}
                            >
                                <SyncAltIcon
                                    className={classes.icons} />
                            </Typography>
                            <Typography
                                variant='h6'
                                className={classes.options}
                            >
                                View Transactions
                            </Typography>
                        </Box>

                        <Box
                            className={`${classes.Box} box`}
                            marginTop={'18px'}
                            component='div'
                            onClick={accountBackground}
                            style={{ backgroundColor: `${accountBg}` }}
                        >
                            <Typography
                                className={classes.Typography}
                            >
                                <CreditCardSharpIcon
                                    className={classes.icons} />
                            </Typography>
                            <Typography
                                variant='h6'
                                className={classes.options}
                            >
                                View/Create Accounts
                            </Typography>
                        </Box>

                        <Box
                            className={`${classes.Box} box`}
                            marginTop={'18px'}
                            component='div'
                            onClick={logOut}
                            style={{
                                backgroundColor: `${logOutBg}`,


                            }}
                        >
                            <Typography
                                className={classes.Typography}
                            >
                                <LogoutIcon
                                    className={classes.icons} />
                            </Typography>
                            <Typography
                                variant='h6'
                                className={classes.options}
                            >
                                Logout
                            </Typography>
                        </Box>

                    </CardContent>
                </Card>
            </ThemeProvider>
        </div>
    );
}

