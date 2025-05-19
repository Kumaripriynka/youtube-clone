import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton, InputBase, Typography, Box } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setSearchError('Please enter a search term');
      return;
    }
    
    setSearchError('');
    navigate(`/search/${searchTerm}`);
    setSearchTerm('');
  };

  return (
    <Box>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          borderRadius: 20,
          border: '1px solid #e3e3e3',
          pl: 2,
          boxShadow: 'none',
          mr: { sm: 5 },
          width: { xs: '100%', sm: 'auto' }
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
          sx={{ width: { xs: '100%', sm: 350 } }}
        />
        <IconButton type="submit" sx={{ p: '10px', color: 'red' }} aria-label="search">
          <Search />
        </IconButton>
      </Paper>
      {searchError && (
        <Typography variant="caption" color="error" sx={{ position: 'absolute', ml: 2 }}>
          {searchError}
        </Typography>
      )}
    </Box>
  );
};

export default SearchBar;