import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import ChannelCard from "./ChannelCard";
import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First fetch the channel details
        const channelData = await fetchFromAPI(`channels?part=snippet,statistics&id=${id}`);
        setChannelDetail(channelData?.items[0]);
        
        // Then fetch the videos for this channel
        const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet,id&order=date&maxResults=50`);
        
        // Debug log the response
        console.log("Channel videos response:", videosData);
        
        // Make sure we're setting an array, even if empty
        setVideos(videosData?.items || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load channel data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchResults();
    }
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress color="error" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box minHeight="95vh">
      <Box>
        <Box sx={{
          height: '300px',
          background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%)',
          zIndex: 10,
        }} />
        <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
      </Box>
      <Box p={2} display="flex">
        <Box sx={{ mr: { sm: '100px' } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;