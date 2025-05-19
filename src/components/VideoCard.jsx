import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { APP_CONTENT } from "../utils/constants";

const VideoCard = ({ video }) => {
  // Extra console.log for debugging
  console.log("VideoCard received item:", video);
  
  if (!video) return null;
  
  // Handle different response formats from YouTube API
  const videoId = video.id?.videoId || video.id;
  const snippet = video.snippet;
  
  if (!videoId || !snippet) {
    console.error("Invalid video data:", video);
    return null;
  }
  
  const channelId = snippet.channelId;
  const thumbnailUrl = snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url;
  
  return (
    <Card sx={{
      width: { xs: "100%", sm: '358px', md: '320px' },
      boxShadow: "none",
      borderRadius: 0,
      backgroundColor: '#1e1e1e'
    }}>
      <Link to={videoId ? `/video/${videoId}` : APP_CONTENT.demo.videoUrl}>
        <CardMedia
          image={thumbnailUrl || APP_CONTENT.demo.thumbnailUrl}
          alt={snippet.title}
          sx={{ 
            width: { xs: '100%', sm: '358px', md: '320px' }, 
            height: 180 
          }}
        />
      </Link>

      <CardContent sx={{ height: "106px" }}>
        <Link to={videoId ? `/video/${videoId}` : APP_CONTENT.demo.videoUrl}>
          <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            {snippet.title ? (snippet.title.length > 60 ? `${snippet.title.slice(0, 60)}...` : snippet.title) : 'Video Title'}
          </Typography>
        </Link>

        <Link to={channelId ? `/channel/${channelId}` : APP_CONTENT.demo.channelUrl}>
          <Typography variant="subtitle2" color="gray">
            {snippet.channelTitle || 'Channel Title'}
            <CheckCircle sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;