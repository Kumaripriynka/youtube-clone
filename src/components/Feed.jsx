import { useState, useEffect } from "react";
import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import SideBar from "./SideBar";
import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
      <Box sx={{
        height: { xs: "auto", md: "92vh" },
        borderRight: "1px solid #3d3d3d",
        px: { xs: 0, md: 2 },
      }}>
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography variant="body2" sx={{ mt: 1.5, color: "#fff" }}>
          Copyright 2025 Priyanka Singh
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: 'auto', height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory} <span style={{ color: "#F31503" }}>Videos</span>
        </Typography>
        
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress color="error" />
          </Box>
        ) : error ? (
          <Typography variant="body1" color="error" textAlign="center">
            {error}
          </Typography>
        ) : (
          <Videos videos={videos} />
        )}
      </Box>
    </Stack>
  );
};

export default Feed;