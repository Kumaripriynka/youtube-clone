import { Stack, Button, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { CATEGORIES } from "../utils/constants";

const SideBar = ({ selectedCategory, setSelectedCategory }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {isDesktop && (
        <Typography 
          variant="subtitle2" 
          sx={{
            color: 'rgba(255,255,255,0.7)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            mb: 1,
            px: 2,
            fontSize: '0.75rem'
          }}
        >
          Categories
        </Typography>
      )}
      
      <Stack
        direction="row"
        sx={{
          overflowY: 'auto',
          height: { xs: 'auto', md: '95%' },
          flexDirection: { md: 'column' },
          gap: 0.5,
          px: { xs: 0.5, md: 1 },
          py: 0.5,
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '10px',
            '&:hover': {
              background: 'rgba(255,255,255,0.2)',
            },
          },
        }}
      >
        {CATEGORIES.map((category) => (
          <Button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            sx={{
              background: category.name === selectedCategory 
                ? 'linear-gradient(135deg, #FC1503, #d31503)'
                : 'rgba(255,255,255,0.03)',
              color: 'white',
              justifyContent: isDesktop ? 'flex-start' : 'center',
              textTransform: 'none',
              borderRadius: '10px',
              mb: { xs: 0, md: 0.5 },
              py: 1,
              minWidth: { xs: '40px', md: '180px' },
              transition: 'all 0.2s ease-in-out',
              boxShadow: category.name === selectedCategory 
                ? '0 2px 8px rgba(252, 21, 3, 0.2)'
                : 'none',
              '&:hover': {
                backgroundColor: category.name === selectedCategory 
                  ? 'linear-gradient(135deg, #FC1503, #d31503)'
                  : 'rgba(255,255,255,0.08)',
                transform: 'translateY(-2px)',
              }
            }}
          >
            <span style={{ 
              color: category.name === selectedCategory ? 'white' : '#FC1503', 
              marginRight: isDesktop ? '12px' : '0',
              fontSize: isDesktop ? '1.1rem' : '1.3rem',
              display: 'flex'
            }}>
              {category.icon}
            </span>
            {isDesktop && (
              <span style={{ 
                opacity: category.name === selectedCategory ? 1 : 0.8,
                fontWeight: category.name === selectedCategory ? '600' : '400',
                fontSize: '0.9rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {category.name}
              </span>
            )}
          </Button>
        ))}
      </Stack>
      
      {isDesktop && (
        <Typography 
          variant="caption" 
          sx={{ 
            mt: 'auto', 
            pt: 2,
            pb: 1,
            px: 2,
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.7rem',
            fontWeight: 500,
            textAlign: 'center',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          Copyright © 2025 Priyanka Singh
        </Typography>
      )}
    </Box>
  );
};

export default SideBar;