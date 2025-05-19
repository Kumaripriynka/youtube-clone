import { Stack, Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { APP_CONTENT } from "../utils/constants";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: "linear-gradient(to right, #111, #000)",
        top: 0,
        justifyContent: "space-between",
        zIndex: 10,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <Link to="/" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        textDecoration: 'none',
        flexShrink: 0
      }}>
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '8px',
          padding: '8px',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'rgba(255,255,255,0.06)',
          }
        }}>
          <img src={APP_CONTENT.logo} alt='logo' height={38} style={{ filter: 'drop-shadow(0 0 2px rgba(255,0,0,0.5))' }} />
          {!isMobile && (
            <Typography 
              variant="h6" 
              sx={{ 
                ml: 1.5, 
                color: '#FFF',
                fontWeight: '600',
                letterSpacing: '0.5px',
                fontSize: '1rem',
                background: 'linear-gradient(to right, #fff, #ccc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              YOUTUBE CLONE
            </Typography>
          )}
        </Box>
      </Link>
      <SearchBar />
    </Stack>
  );
};

export default Navbar;