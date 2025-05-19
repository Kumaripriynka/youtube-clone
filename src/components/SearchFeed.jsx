import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchTerm } = useParams();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchFromAPI(`search?part=snippet&q=${searchTerm}`);
        setVideos(data.items || []);
      } catch (error) {
        console.error("Search failed:", error);
        setError("Failed to load search results. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchSearchResults();
    }
  }, [searchTerm]);

  return (
    <Box p={2} sx={{ overflowY: 'auto', height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Search Results for: <span style={{ color: "#F31503" }}>{searchTerm}</span>
      </Typography>
      
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress color="error" />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error" textAlign="center" mt={4}>
          {error}
        </Typography>
      ) : (
        <Videos videos={videos} />
      )}
    </Box>
  );
};

export default SearchFeed;