import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton, InputBase, Typography, Box, alpha } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState('');
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setSearchError('Please enter a search term');
      return;
    }
    
    setSearchError('');
    navigate(`/search/${searchTerm}`);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchError('');
  };

  return (
    <Box sx={{ position: 'relative', maxWidth: '600px', width: '100%' }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          borderRadius: 3,
          border: '1px solid',
          borderColor: focused ? 'rgba(255,48,48,0.5)' : 'rgba(255,255,255,0.1)',
          pl: 2,
          pr: 0.5,
          py: 0.5,
          display: 'flex',
          alignItems: 'center',
          boxShadow: focused ? `0 0 8px ${alpha('#f31503', 0.4)}` : 'none',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(5px)',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'rgba(255,48,48,0.3)',
            background: 'rgba(255,255,255,0.08)',
          },
          width: '100%'
        }}
      >
        <InputBase
          className="search-bar"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (searchError) setSearchError('');
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          sx={{ 
            flex: 1,
            color: '#fff',
            '& .MuiInputBase-input': {
              fontSize: '0.95rem',
            }
          }}
        />
        {searchTerm && (
          <IconButton 
            onClick={handleClear}
            sx={{ 
              color: 'rgba(255,255,255,0.6)',
              '&:hover': { color: '#fff' }
            }}
          >
            <Clear fontSize="small" />
          </IconButton>
        )}
        <IconButton 
          type="submit" 
          sx={{ 
            p: '10px', 
            color: 'white',
            background: 'linear-gradient(135deg, #f31503, #d31503)',
            borderRadius: '50%',
            width: 40,
            height: 40,
            m: 0.5,
            '&:hover': {
              background: 'linear-gradient(135deg, #ff1503, #e31503)',
            }
          }} 
          aria-label="search"
        >
          <Search />
        </IconButton>
      </Paper>
      {searchError && (
        <Typography 
          variant="caption" 
          color="error" 
          sx={{ 
            position: 'absolute', 
            ml: 2,
            mt: 0.5,
            fontWeight: 500
          }}
        >
          {searchError}
        </Typography>
      )}
    </Box>
  );
};

export default SearchBar;