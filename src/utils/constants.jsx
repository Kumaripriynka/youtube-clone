// Import all icons from a single line
import {
  MusicNote as MusicNoteIcon,
  Home as HomeIcon,
  Code as CodeIcon,
  OndemandVideo as OndemandVideoIcon,
  SportsEsports as SportsEsportsIcon,
  LiveTv as LiveTvIcon,
  School as SchoolIcon,
  FaceRetouchingNatural as FaceRetouchingNaturalIcon,
  Checkroom as CheckroomIcon,
  GraphicEq as GraphicEqIcon,
  TheaterComedy as TheaterComedyIcon,
  FitnessCenter as FitnessCenterIcon,
  DeveloperMode as DeveloperModeIcon
} from '@mui/icons-material';

// API-related constants from your screenshot
export const API_CONSTANTS = {
  BASE_URL: 'https://youtube-v31.p.rapidapi.com',
  ENDPOINTS: {
    SEARCH: 'search',
    VIDEOS: 'videos',
    CHANNELS: 'channels'
  },
  DEFAULT_PARAMS: {
    maxResults: 50,
    part: 'snippet'
  }
};

// App content constants
export const APP_CONTENT = {
  logo: 'https://i.ibb.co/s9Qys2j/logo.png',
  demo: {
    thumbnailUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_k9TujohwJBGAe45usRdh_6bgVEwM7kEyEPg-wH2w=s176-c-k-c0x00ffffff-no-rj',
    channelUrl: 'https://www.youtube.com/@creativityunleashed5669',
    videoUrl: 'https://youtu.be/uztQViSxOkA?si=QelDql2xsG-yPFzl',
    channelTitle: 'Creativity Unleashed',
    videoTitle: 'Build Tesla Coil at Home',
    profilePicture: 'https://yt3.googleusercontent.com/ytc/AIdro_k9TujohwJBGAe45usRdh_6bgVEwM7kEyEPg-wH2w=s176-c-k-c0x00ffffff-no-rj'
  }
};

// Categories with API-friendly IDs
export const CATEGORIES = [
  { id: 'new', name: 'New', icon: <HomeIcon /> },
  { id: 'coding', name: 'Coding', icon: <CodeIcon /> },
  { id: 'react', name: 'ReactJS', icon: <CodeIcon /> },
  { id: 'music', name: 'Music', icon: <MusicNoteIcon /> },
  { id: 'education', name: 'Education', icon: <SchoolIcon /> },
  { id: 'podcast', name: 'Podcast', icon: <GraphicEqIcon /> },
  { id: 'movie', name: 'Movie', icon: <OndemandVideoIcon /> },
  { id: 'gaming', name: 'Gaming', icon: <SportsEsportsIcon /> },
  { id: 'live', name: 'Live', icon: <LiveTvIcon /> },
  { id: 'sport', name: 'Sport', icon: <FitnessCenterIcon /> },
  { id: 'fashion', name: 'Fashion', icon: <CheckroomIcon /> },
  { id: 'comedy', name: 'Comedy', icon: <TheaterComedyIcon /> },
  { id: 'crypto', name: 'Crypto', icon: <DeveloperModeIcon /> }
];