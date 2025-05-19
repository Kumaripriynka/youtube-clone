import { Stack, Button } from "@mui/material";
import { CATEGORIES } from "../utils/constants";

const SideBar = ({ selectedCategory, setSelectedCategory }) => (
  <Stack
    direction="row"
    sx={{
      overflowY: 'auto',
      height: { xs: 'auto', md: '95%' },
      flexDirection: { md: 'column' },
      gap: 1,
      px: 1
    }}
  >
    {CATEGORIES.map((category) => (
      <Button
        key={category.name}
        onClick={() => setSelectedCategory(category.name)}
        sx={{
          background: category.name === selectedCategory ? '#FC1503' : 'transparent',
          color: 'white',
          justifyContent: 'flex-start',
          textTransform: 'none',
          minWidth: 'auto',
          '&:hover': {
            backgroundColor: category.name === selectedCategory ? '#FC1503' : '#333',
          }
        }}
      >
        <span style={{ color: category.name === selectedCategory ? 'white' : 'red', marginRight: '15px' }}>
          {category.icon}
        </span>
        <span style={{ opacity: category.name === selectedCategory ? 1 : 0.8 }}>
          {category.name}
        </span>
      </Button>
    ))}
  </Stack>
);

export default SideBar;