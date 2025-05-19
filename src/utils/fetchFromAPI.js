import axios from "axios";

// API Configuration with proper formatting
const API_CONFIG = {
  BASE_URL: "https://youtube-v31.p.rapidapi.com",
  DEFAULT_PARAMS: {
    maxResults: '50',
    part: 'snippet'
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
    
    const { data } = await axios.get(`${API_CONFIG.BASE_URL}/${endpoint}`, {
      params: {
        ...API_CONFIG.DEFAULT_PARAMS,
        ...params
      },
      headers: API_CONFIG.HEADERS
    });
    
    // Log successful response for debugging
    console.log(`API Response from ${endpoint}:`, data);
    
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
    
    // Throw error with more context
    throw new Error(`API request to ${endpoint} failed: ${error.message}`);
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
    
    requestQueue.push({ endpoint, params, resolve, reject });
    // Start processing if not already running
    if (!isProcessingQueue) {
      processQueue();
    }
  });
};

// Specific API methods 
export const youtubeAPI = {
  searchVideos: (query) => fetchFromAPI('search', { q: query }),
  getRelatedVideos: (videoId) => fetchFromAPI('search', { 
    relatedToVideoId: videoId,
    type: 'video'
  }),
  getChannelVideos: (channelId) => fetchFromAPI('search', {
    channelId,
    order: 'date'
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