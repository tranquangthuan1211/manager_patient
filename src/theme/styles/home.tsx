
import {styled} from '@mui/material/styles';
import { Stack } from '@mui/material';


const HomeStyle = styled(Stack)(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
        color: 'black',
        display: 'block',
    },
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
        color: 'red',
        display: 'flex',
    },
    [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(6),
        color: 'blue',
        display: 'block',
    },
}));

export default HomeStyle