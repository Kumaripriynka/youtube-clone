
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { APP_CONTENT } from "../utils/constants";
import SearchBar from "./SearchBar";

const Navbar = () => (
  <Stack
    direction="row"
    alignItems="center"
    p={2}
    sx={{
      position: "sticky",
      backgroundColor: "#000",
      top: 0,
      justifyContent: "space-between",
      zIndex: 10,
    }}
  >
    <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
      <img src={APP_CONTENT.logo} alt='logo' height={45} />
      <Typography variant="h6" sx={{ ml: 2, color: '#FFF', display: { xs: 'none', md: 'block' } }}>
        YOUTUBE CLONE BY PRIYANKA SINGH
      </Typography>
    </Link>
    <SearchBar />
  </Stack>
);

export default Navbar;