import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { CheckCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { APP_CONTENT } from '../utils/constants';

const ChannelCard = ({ channelDetail, marginTop = 0 }) => {
  // Safely extract the channel ID
  const channelId = channelDetail?.id 
    ? (typeof channelDetail.id === 'string' ? channelDetail.id : channelDetail.id.channelId) 
    : '';

  return (
    <Box sx={{
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      borderRadius: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: { xs: '356px', md: '320px' },
      height: '326px',
      margin: 'auto',
      marginTop,
      background: 'rgba(30,30,30,0.5)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.05)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        background: 'rgba(40,40,40,0.7)',
      }
    }}>
      <Link to={`/channel/${channelId}`} style={{ textDecoration: 'none' }}>
        <CardContent sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: '#FFF',
          padding: 3
        }}>
          <Box 
            sx={{
              position: 'relative',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              mb: 3,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 30px rgba(255,0,0,0.15)',
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: '-5px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(255,50,50,0.3), transparent)',
                opacity: 0.5
              }
            }}
          >
            <CardMedia
              image={channelDetail?.snippet?.thumbnails?.high?.url || APP_CONTENT.demo.profilePicture}
              alt={channelDetail?.snippet?.title}
              sx={{
                borderRadius: '50%',
                height: '168px',
                width: '168px',
                border: '3px solid rgba(255,255,255,0.1)',
                objectFit: 'cover',
                zIndex: 1
              }}
            />
          </Box>
          <Typography 
            variant="h6" 
            sx={{
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              mb: 1.5,
              background: 'linear-gradient(to right, #fff, #ccc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {channelDetail?.snippet?.title}
            <CheckCircle sx={{ fontSize: "20px", color: "#FC1503", ml: "8px", WebkitTextFillColor: '#FC1503' }} />
          </Typography>
          {channelDetail?.statistics?.subscriberCount && (
            <Typography 
              sx={{ 
                color: 'rgba(255,255,255,0.7)',
                fontWeight: '500',
                fontSize: '0.95rem',
                letterSpacing: '0.5px'
              }}
            >
              {parseInt(channelDetail.statistics.subscriberCount).toLocaleString()} Subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;