
import {Box, Stack} from '@mui/material';
const Logo = () => {
    return (
        <Stack>
            <Box
                sx = {{
                    backgroundImage: "url(/logo.png)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                }}
            />

        </Stack>
    )
}

export default Logo;