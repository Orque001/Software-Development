import { makeStyles } from '@material-ui/core';
import React from 'react'
import Typography from '@material-ui/core/Typography';

import { useLocation } from 'react-router-dom';

const useStyles = makeStyles({
    div: {
        height: '42px',
        width: '40px',
        marginLeft: '20px',
        alignSelf: 'center',
        fontSize: 'large'
       
    },
});


export default function Header() {
    const classes = useStyles();

    return (
     

        <div className={classes.div}>
                
        
                <Typography
                                variant='h3'
                                className={classes.options}
                                style={{
                                    fontFamily: '"Segoe UI"',
                                    width: '600px',
                                    height: '80px',
                                    paddingLeft: '8em',
                                    paddingTop: '4.3rem',
                                    paddingBottom: '1.0rem',
                                    marginTop: '1.0rem',
                                    fontWeight: '700'
                                }}
                            >
                                
                                {/* if pathname contains / after main, get the right most pathname and display */}
                                {useLocation().pathname.split('/')[2].toUpperCase()}
                            </Typography>
            
        </div>


    );
}