import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { APP_CONTENT } from "../utils/constants";

const VideoCard = ({ video }) => {
  // Handle null or undefined video object
  if (!video) {
    console.error("VideoCard received null or undefined video");
    return null;
  }
  
  // Extra validation and debugging
  console.log("VideoCard processing item:", video);
  
  // Handle different response formats from YouTube API
  let videoId, snippet, channelId, thumbnailUrl, title, channelTitle;
  
  try {
    // Extract video ID - handling different API response formats
    videoId = video.id?.videoId || (typeof video.id === 'string' ? video.id : null);
    
    // Extract snippet data
    snippet = video.snippet;
    
    // If no valid data is present, return null
    if (!videoId || !snippet) {
      console.error("Invalid video data structure:", video);
      return null;
    }
    
    // Extract required fields with fallback values
    channelId = snippet.channelId || '';
    channelTitle = snippet.channelTitle || 'Unknown Channel';
    title = snippet.title || 'Unknown Video';
    
    // Get the best available thumbnail
    thumbnailUrl = snippet.thumbnails?.high?.url || 
                  snippet.thumbnails?.medium?.url || 
                  snippet.thumbnails?.default?.url ||
                  APP_CONTENT.demo.thumbnailUrl;
  } catch (error) {
    console.error("Error processing video data:", error);
    return null;
  }
  
  return (
    <Card sx={{
      width: { xs: "100%", sm: '358px', md: '320px' },
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      borderRadius: 2,
      backgroundColor: 'rgba(30,30,30,0.6)',
      backdropFilter: 'blur(5px)',
      transition: 'all 0.3s ease',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.05)',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
        backgroundColor: 'rgba(40,40,40,0.8)',
      }
    }}>
      <Link to={videoId ? `/video/${videoId}` : APP_CONTENT.demo.videoUrl}>
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            image={thumbnailUrl}
            alt={title}
            sx={{ 
              width: { xs: '100%', sm: '358px', md: '320px' }, 
              height: 180,
              transition: 'transform 0.5s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }}
          />
          <Box 
            sx={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              width: '100%', 
              height: '40px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            }} 
          />
        </Box>
      </Link>

      <CardContent sx={{ 
        padding: 2, 
        height: "106px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <Link to={videoId ? `/video/${videoId}` : APP_CONTENT.demo.videoUrl} style={{ textDecoration: 'none' }}>
          <Typography 
            variant="subtitle1" 
            fontWeight="600" 
            color="#FFF"
            sx={{ 
              lineHeight: 1.3,
              mb: 1,
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              textOverflow: 'ellipsis',
              fontSize: '0.95rem'
            }}
          >
            {title}
          </Typography>
        </Link>

        <Link to={channelId ? `/channel/${channelId}` : APP_CONTENT.demo.channelUrl} style={{ textDecoration: 'none' }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              color: "rgba(255,255,255,0.6)",
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.8rem',
              '&:hover': {
                color: "rgba(255,255,255,0.9)",
              }
            }}
          >
            {channelTitle}
            <CheckCircle sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;