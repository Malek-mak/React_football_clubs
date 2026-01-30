import * as React from 'react';
import {Box, Typography} from '@mui/material';

export default function MyMessage({MyMessageText, bgcolor}) {
    return (
        <Box sx={{width: '100%',
                height: '30px',
                color: 'white',
                 marginBottom: '30px',
                 padding: '15px',
                 display: 'flex',
                 alignItems: 'center',
                 backgroundColor: bgcolor
                }}
                 >

            <Typography>
                {MyMessageText}
            </Typography>
        </Box>
    )
}