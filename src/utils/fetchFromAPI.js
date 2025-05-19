import axios from "axios";

// API Configuration with proper formatting
const API_CONFIG = {
  BASE_URL: "https://youtube-v31.p.rapidapi.com",
  DEFAULT_PARAMS: {
    maxResults: '50'
  },
  HEADERS: {
    'X-RapidAPI-Key': '1b184c69f1mshd8e2d6a2ed5ea49p1c946fjsn26ef5fa5ad76', // Your RapidAPI key
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

// Queue for throttling requests
const requestQueue = [];
let isProcessingQueue = false;
const DELAY_BETWEEN_REQUESTS = 1000; // 1 second

/**
 * Process the queue of API requests with delay to avoid rate limiting
 */
const processQueue = async () => {
  if (isProcessingQueue || requestQueue.length === 0) return;
  
  isProcessingQueue = true;
  const { endpoint, params, resolve, reject } = requestQueue.shift();
  
  try {
    const result = await executeAPIRequest(endpoint, params);
    resolve(result);
  } catch (error) {
    reject(error);
  } finally {
    isProcessingQueue = false;
    // Wait before processing next request
    setTimeout(processQueue, DELAY_BETWEEN_REQUESTS);
  }
};

/**
 * Execute the actual API request
 */
const executeAPIRequest = async (endpoint, params = {}, retryCount = 2) => {
  try {
    console.log(`Making API request to ${endpoint} with params:`, params);
    
    // Construct the complete URL
    const url = `${API_CONFIG.BASE_URL}/${endpoint}`;
    
    // Prepare the request params
    const requestParams = {
      ...API_CONFIG.DEFAULT_PARAMS,
      ...params
    };
    
    // Make the request
    const { data } = await axios.get(url, {
      params: requestParams,
      headers: API_CONFIG.HEADERS
    });
    
    // Log successful response
    console.log(`API Response from ${endpoint}:`, data);
    
    if (data.error) {
      throw new Error(`API Error: ${data.error.message || 'Unknown error'}`);
    }
    
    return data;
  } catch (error) {
    // Handle 429 rate limit errors with retry logic
    if (error.response?.status === 429 && retryCount > 0) {
      console.log(`Rate limited. Retrying in 2 seconds... (${retryCount} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return executeAPIRequest(endpoint, params, retryCount - 1);
    }
    
    // Enhanced error logging
    console.error('API Request Failed:', {
      endpoint,
      params,
      status: error.response?.status,
      message: error.response?.data || error.message
    });
    
    // Return empty results object instead of throwing an error
    // This allows the UI to display "No videos found" instead of crashing
    return { items: [] };
  }
};

/**
 * Main API client function with queue and throttling
 */
export const fetchFromAPI = (endpoint, params = {}) => {
  return new Promise((resolve, reject) => {
    // Verify endpoint is not empty
    if (!endpoint) {
      reject(new Error("API endpoint cannot be empty"));
      return;
    }
    
    // Extract specific parameters from the endpoint string and move them to params object
    // This is a more reliable way to pass parameters to the API
    if (endpoint.includes('?')) {
      const [basePath, queryString] = endpoint.split('?');
      
      const queryParams = new URLSearchParams(queryString);
      const paramObject = {};
      
      // Convert all query params to the params object
      queryParams.forEach((value, key) => {
        paramObject[key] = value;
      });
      
      // Update the endpoint and params
      endpoint = basePath;
      params = { ...params, ...paramObject };
    }
    
    requestQueue.push({ endpoint, params, resolve, reject });
    // Start processing if not already running
    if (!isProcessingQueue) {
      processQueue();
    }
  });
};

// Helper function to get mock data for channel videos when API fails
export const getMockChannelVideos = (channelId) => {
  return {
    items: [
      {
        id: { videoId: 'sample-video-1' },
        snippet: {
          title: 'Sample Video 1',
          thumbnails: { high: { url: 'https://via.placeholder.com/320x180?text=Sample+Video+1' } },
          channelTitle: 'Channel Name',
          channelId: channelId
        }
      },
      {
        id: { videoId: 'sample-video-2' },
        snippet: {
          title: 'Sample Video 2',
          thumbnails: { high: { url: 'https://via.placeholder.com/320x180?text=Sample+Video+2' } },
          channelTitle: 'Channel Name',
          channelId: channelId
        }
      }
    ]
  };
};

// Specific API methods 
export const youtubeAPI = {
  searchVideos: (query) => fetchFromAPI('search', { q: query, part: 'snippet' }),
  getRelatedVideos: (videoId) => fetchFromAPI('search', { 
    relatedToVideoId: videoId,
    type: 'video',
    part: 'snippet'
  }),
  getChannelVideos: (channelId) => fetchFromAPI('search', {
    channelId,
    order: 'date',
    type: 'video',
    part: 'snippet,id'
  }),
  getVideoDetails: (videoId) => fetchFromAPI('videos', {
    id: videoId,
    part: 'snippet,statistics'
  }),
  getChannelDetails: (channelId) => fetchFromAPI('channels', {
    id: channelId,
    part: 'snippet,statistics'
  })
};