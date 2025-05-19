import { Stack, Box, Typography } from "@mui/material";
import ChannelCard from "./ChannelCard";
import VideoCard from "./VideoCard";

const Videos = ({ videos = [], direction = 'row' }) => {
  // Add proper validation to check if videos is array and not empty
  if (!Array.isArray(videos) || videos.length === 0) {
    return (
      <Typography variant="body1" color="gray" textAlign="center" mt={4}>
        No videos found
      </Typography>
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
      {videos.map((item, idx) => {
        // Log item to check what's being processed
        console.log("Processing video item:", item);
        
        return (
          <Box key={idx}>
            {item.id && item.id.videoId && <VideoCard video={item} />}
            {item.id && item.id.channelId && <ChannelCard channelDetail={item} />}
          </Box>
        );
      })}
    </Stack>
  );
};

export default Videos;