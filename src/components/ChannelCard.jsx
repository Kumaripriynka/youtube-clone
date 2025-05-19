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
      boxShadow: 'none',
      borderRadius: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: { xs: '356px', md: '320px' },
      height: '326px',
      margin: 'auto',
      marginTop
    }}>
      <Link to={`/channel/${channelId}`}>
        <CardContent sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#FFF'
        }}>
          <CardMedia
            image={channelDetail?.snippet?.thumbnails?.high?.url || APP_CONTENT.demo.profilePicture}
            alt={channelDetail?.snippet?.title}
            sx={{
              borderRadius: '50%',
              height: '180px',
              width: '180px',
              mb: 2,
              border: '1px solid #e3e3e3'
            }}
          />
          <Typography variant="h6">
            {channelDetail?.snippet?.title}
            <CheckCircle sx={{ fontSize: "25px", color: "gray", ml: "5px" }} />
          </Typography>
          {channelDetail?.statistics?.subscriberCount && (
            <Typography>
              {parseInt(channelDetail.statistics.subscriberCount).toLocaleString()} Subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;