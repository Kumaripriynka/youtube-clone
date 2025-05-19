import { Stack, Box, Typography, Alert } from "@mui/material";
import ChannelCard from "./ChannelCard";
import VideoCard from "./VideoCard";
import { SentimentDissatisfied } from "@mui/icons-material";

const Videos = ({ videos = [], direction = 'row' }) => {
  // Enhanced validation and debugging
  if (!Array.isArray(videos)) {
    console.error("Videos component received non-array:", videos);
    videos = [];
  }
  
  // Filter out any invalid items
  const validVideos = videos.filter(item => {
    // Need to check if the item exists first
    if (!item) {
      console.warn("Found null or undefined item in videos array");
      return false;
    }
    
    // Check for video or channel ID
    const hasVideoId = item.id?.videoId || (typeof item.id === 'string');
    const hasChannelId = item.id?.channelId;
    const hasSnippet = !!item?.snippet;
    
    if (!hasSnippet || (!hasVideoId && !hasChannelId)) {
      console.warn("Filtering out invalid video/channel item:", item);
      return false;
    }
    
    return true;
  });
  
  // Display message when no valid videos found
  if (validVideos.length === 0) {
    return (
      <Box 
        display="flex" 
        flexDirection="column"
        justifyContent="center" 
        alignItems="center" 
        mt={4}
        sx={{ width: '100%' }}
      >
        <SentimentDissatisfied sx={{ fontSize: 60, color: 'gray', mb: 2 }} />
        <Typography variant="body1" color="gray" textAlign="center">
          No videos found. Try refreshing or check back later.
        </Typography>
      </Box>
    );
  }

  return (
    <Stack
      direction={direction}
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
      gap={2}
      sx={{
        overflowY: 'auto',
        '&::-webkit-scrollbar': { display: 'none' }
      }}
    >
      {validVideos.map((item, idx) => {
        // Determine what type of item this is
        const isVideo = item.id?.videoId || (typeof item.id === 'string' && !item.id?.channelId);
        const isChannel = item.id?.channelId;
        
        return (
          <Box key={idx}>
            {isVideo && <VideoCard video={item} />}
            {isChannel && <ChannelCard channelDetail={item} />}
          </Box>
        );
      })}
    </Stack>
  );
};

export default Videos;