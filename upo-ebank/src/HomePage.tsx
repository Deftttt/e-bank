import Container from "@mui/material/Container";
import Navbar from "./shared/Navbar";

const HomePage = () => {
    return (
        <>
        <Navbar />
        <Container maxWidth={false}>
            <h1>Welcome to the Home Pagaaaaaaaaaaaaaaaaaaae</h1>
            <p>This is the content of the home page.</p>
        </Container>
        </>
    );
};

export default HomePage;