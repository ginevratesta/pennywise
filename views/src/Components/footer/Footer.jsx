import { Box, Grid, Typography } from "@mui/material";
import "./Footer.css";


const Footer = () => {
    return(
        <Box id="footer">
            <Grid container>
                <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" p="24px" sx={{bgcolor: "#9686AB", color: "white"}}>
                    <Typography variant="subtitle2">
                        Need help? Contact us 333 333 3333
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Footer;