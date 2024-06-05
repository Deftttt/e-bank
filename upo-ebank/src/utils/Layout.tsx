import { Outlet } from "react-router-dom"
import Footer from "../shared/ui/Footer";
import Navbar from "../shared/ui/Navbar";
import { Box } from "@mui/material";


const Layout = () => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Navbar />
            <Box component="main" flexGrow={1}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
}

export default Layout;