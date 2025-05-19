import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import ChannelCard from "./ChannelCard";
import Videos from "./Videos";
import { fetchFromAPI, youtubeAPI, getMockChannelVideos } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchChannelVideos = async () => {
    try {
      const videosData = await youtubeAPI.getChannelVideos(id);
      
      if (videosData?.items?.length > 0) {
        setVideos(videosData.items);
        return true;
      }
      
      const alternativeData = await fetchFromAPI('search', { 
        channelId: id,
        order: 'date',
        type: 'video',
        part: 'snippet,id',
        maxResults: 50
      });
      
      if (alternativeData?.items?.length > 0) {
        setVideos(alternativeData.items);
        return true;
      }
      
      const mockData = getMockChannelVideos(id);
      setVideos(mockData.items);
      return false;
      
    } catch (error) {
      console.error("Error fetching channel videos:", error);
      const mockData = getMockChannelVideos(id);
      setVideos(mockData.items);
      return false;
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const channelData = await youtubeAPI.getChannelDetails(id);
        
        if (channelData?.items?.length > 0) {
          setChannelDetail(channelData.items[0]);
        } else {
          setError("Channel not found or unavailable");
          return;
        }
        
        await fetchChannelVideos();
      } catch (error) {
        console.error("Error in channel detail:", error);
        setError("Failed to load channel data.");
        
        setChannelDetail({
          id: id,
          snippet: {
            title: "Sample Channel",
            thumbnails: {
              high: { url: "https://via.placeholder.com/180x180?text=Channel" }
            }
          },
          statistics: {
            subscriberCount: "0"
          }
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchResults();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress color="error" />
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
      
      {error && (
        <Alert 
          severity="warning" 
          sx={{ 
            mt: 2, 
            mb: 2, 
            mx: 'auto', 
            maxWidth: '800px',
            bgcolor: 'rgba(211, 47, 47, 0.1)',
            color: '#f5f5f5',
          }}
        >
          {error}
        </Alert>
      )}
      
      <Box p={2} display="flex">
        <Box sx={{ mr: { sm: '100px' } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;