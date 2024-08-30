import { Button, Stack, Typography, Box } from "@mui/material";
import { useRouter } from "src/hooks/use-route";

const PermissionPage = () => {
    const router = useRouter();
    return (
        <Stack
          sx={{
            width: '100%',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f4f4f4', 
            padding: 2,
          }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: '6rem',
            fontWeight: 'bold',
            color: '#000',
            mb: 2,
          }}
        >
          403!
        </Typography>
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.25rem',
              
              mb: 4,
            }}
          >
            Bạn không có quyền truy cập trang này!!!
          </Typography>
          {/* <Box
                sx = {{
                    backgroundImage: "url(/icon_sad.png)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                }}
            /> */}
        </Box>
        <Button
          variant="contained"
          color="error"
          sx={{
            fontSize: '1rem',
            padding: '10px 20px',
            backgroundColor: '#d32f2f',
            '&:hover': {
              backgroundColor: '#c62828',
            },
          }}
          onClick={() => {
            router.push('/'); 
          }}
        >
          Quay lại trang chủ
        </Button>
      </Stack>
    )
}
export default PermissionPage;