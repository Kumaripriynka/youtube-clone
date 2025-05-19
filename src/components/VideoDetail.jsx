import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, CircularProgress, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RefreshIcon from '@mui/icons-material/Refresh';
import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { APP_CONTENT } from "../utils/constants";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerError, setPlayerError] = useState(false);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      setPlayerError(false);

      // Fetch video details and related videos in parallel
      const [videoData, relatedVideos] = await Promise.all([
        fetchFromAPI(`videos?part=snippet,statistics&id=${id}`),
        fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      ]);

      // Check if video data was successfully retrieved
      if (!videoData?.items || videoData.items.length === 0) {
        setError("Video not found or unavailable. It might have been removed.");
        setLoading(false);
        return;
      }

      setVideoDetail(videoData.items[0]);
      
      // Ensure related videos is an array before setting state
      if (Array.isArray(relatedVideos?.items)) {
        setVideos(relatedVideos.items);
      } else {
        console.warn("Related videos is not an array:", relatedVideos);
        setVideos([]);
      }
    } catch (error) {
      console.error("Error fetching video details:", error);
      setError("Failed to load video. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  // Handle player errors
  const handlePlayerError = (e) => {
    console.error("React Player error:", e);
    setPlayerError(true);
  };

  // Refresh handler
  const handleRefresh = () => {
    fetchData();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress color="error" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography variant="h6" color="error" mb={3}>
          {error}
        </Typography>
        <Button 
          variant="contained" 
          color="error" 
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  if (!videoDetail?.snippet) return null;

  const { 
    snippet: { title, channelId, channelTitle }, 
    statistics: { viewCount = 0, likeCount = 0 } = {} 
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            {playerError ? (
              <Box 
                height="400px" 
                display="flex" 
                flexDirection="column" 
                justifyContent="center" 
                alignItems="center"
                sx={{ bgcolor: '#000' }}
              >
                <Typography variant="h6" color="error" mb={2}>
                  Unable to play this video
                </Typography>
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={() => setPlayerError(false)}
                >
                  Try Again
                </Button>
              </Box>
            ) : (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                className="react-player"
                controls
                width="100%"
                height="400px"
                onError={handlePlayerError}
                fallback={
                  <Box height="400px" display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress color="error" />
                  </Box>
                }
              />
            )}
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2}>
              <Link to={`/channel/${channelId}`} style={{ textDecoration: 'none' }}>
                <Typography variant="h6" color="#fff">
                  {channelTitle}
                  <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
          <Typography variant="h6" fontWeight="bold" mb={2} color="#FFF">
            Related Videos
          </Typography>
          {videos.length > 0 ? (
            <Videos videos={videos} direction="column" />
          ) : (
            <Typography color="gray">No related videos found</Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;