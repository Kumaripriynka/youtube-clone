import { useState, useEffect } from "react";
import { Box, Stack, Typography, CircularProgress, Container, useTheme, useMediaQuery } from "@mui/material";
import SideBar from "./SideBar";
import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchFromAPI(`search?part=snippet&q=${selectedCategory}`);
        setVideos(data.items || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("Failed to load videos. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [selectedCategory]);

  return (
    <Container maxWidth="xl" disableGutters sx={{ height: '92vh' }}>
      <Stack sx={{ 
        flexDirection: { xs: "column", md: "row" },
        height: '100%' 
      }}>
        <Box sx={{
          height: { xs: "auto", md: "100%" },
          borderRight: "1px solid rgba(255,255,255,0.05)",
          width: { xs: '100%', md: '220px' },
          flexShrink: 0,
          backgroundImage: { 
            xs: 'none', 
            md: 'linear-gradient(to bottom, rgba(30,30,30,0.6), rgba(20,20,20,1))' 
          },
        }}>
          <SideBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Box>

        <Box 
          p={3} 
          sx={{ 
            overflowY: 'auto', 
            height: "100%", 
            flex: 1,
            background: 'linear-gradient(180deg, rgba(25,25,25,1) 0%, rgba(15,15,15,1) 100%)',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255,255,255,0.05)',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '4px',
              '&:hover': {
                background: 'rgba(255,255,255,0.2)',
              },
            },
          }}
        >
          <Typography 
            variant="h5" 
            fontWeight="700" 
            mb={3} 
            sx={{ 
              color: "white",
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '0',
                width: '60px',
                height: '3px',
                background: 'linear-gradient(to right, #FC1503, transparent)',
                borderRadius: '2px',
              }
            }}
          >
            {selectedCategory} <span style={{ color: "#F31503", marginLeft: '8px' }}>Videos</span>
          </Typography>
          
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="400px">
              <CircularProgress 
                color="error" 
                size={50}
                thickness={4}
                sx={{
                  filter: 'drop-shadow(0 0 8px rgba(255,0,0,0.2))'
                }}
              />
            </Box>
          ) : error ? (
            <Box 
              sx={{
                p: 3, 
                bgcolor: 'rgba(255,0,0,0.05)', 
                borderRadius: 2,
                border: '1px solid rgba(255,0,0,0.1)'
              }}
            >
              <Typography variant="body1" color="error" textAlign="center">
                {error}
              </Typography>
            </Box>
          ) : (
            <Videos videos={videos} />
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export default Feed;