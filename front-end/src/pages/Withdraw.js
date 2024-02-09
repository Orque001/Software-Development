import { Container, Grid, makeStyles, TextField, Typography, Button } from '@material-ui/core'
import React from 'react'


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
  }

}))

export default function Withdraw() {

  const classes = useStyles();
  const [userInfo, setUserInfo] = React.useState([]);
  const [amount, setAmount] = React.useState('');
  const [message, setMessage] = React.useState('');


  function updateAmount(event) {
    setMessage('');
    const numberValue = Number(event.target.value);
    console.log(numberValue)
    if (isNaN(numberValue)) {
      return;
    }
    setAmount(event.target.value);
  }


  React.useEffect(() => {
    // triggers when componenet mounds
    // https://react.dev/reference/react/useEffect
    // fetching data
    // https://developer.mozilla.org/en-US/docs/Web/API/fetch

    fetchUserInfo();
  }, []);

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

  async function withdraw() {
    setMessage('');
    const transactionDto = {
      amount: Number(amount)
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(transactionDto),
      credentials: 'include',
    };
    const result = await fetch('/withdraw', options);
    const apiRes = await result.json();
    setAmount('');
    setMessage(apiRes.message);
    fetchUserInfo();
  }




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
              </Typography>
            </Container>

            <Container>
              <Typography variant="h5" align="left">
                Balance
                {userInfo.map(uInfo => (
                  <h5>$ {uInfo.balance.toFixed(2)}</h5>
                ))}
              </Typography>

            </Container>
            <Container>
              <Typography variant="h6" align="left">
                Amount
              </Typography>
              <TextField InputProps={{ disableUnderline: true }} className={classes.textfield} value={amount} onChange={updateAmount} required />
            </Container>
            <Container>
              {message}
              <Button className={classes.submitbutton} variant="contained" color="primary" onClick={withdraw}>
                Withdraw
              </Button>
            </Container>
          </Container>
        </Grid>
      </Grid>
    </div>

  );
}