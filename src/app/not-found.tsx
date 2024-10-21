// import CustomButton from "@/component/ui/Button/CustomButton";
import { Box, Typography } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h2"
        component="h2"
        fontWeight={{ xs: 600, md: 700 }}
        color="primary.main"
        textAlign="center"
        fontSize={{ xs: "25px", sm: "40px", md: "60px" }}
      >
        404!!
      </Typography>
      <Typography
        variant="h3"
        component="h3"
        fontWeight={{ xs: 600, md: 700 }}
        textAlign="center"
        fontSize={{ xs: "18px", sm: "30px", md: "36px" }}
        mt={{ xs: "8px", md: "16px" }}
      >
        {"Something's missing."}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        fontWeight={{ xs: 600, md: 700 }}
        color="rgb(100 116 139)"
        textAlign="center"
        fontSize={{ xs: "12px", sm: "15px", md: "16px" }}
        mt={{ xs: "8px", md: "12px" }}
        mb={{ xs: "12px", md: "18px" }}
      >
        {
          "Sorry, we can't find that page. You'll find lots to explore on the home page."
        }
      </Typography>
      {/* <CustomButton fullWidth={false} href="/">
        Back To Home Page
      </CustomButton> */}
    </Box>
  );
};

export default NotFoundPage;
