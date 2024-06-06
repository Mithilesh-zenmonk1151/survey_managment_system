// components/UserDropdown.tsx
import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Avatar, Typography, Box } from "@mui/material";
import { AccountCircle, Logout } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const UserDropdown: React.FC = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut();
    handleMenuClose();
  };

  return (
    <Box sx={{
        display:"flex",

        alignItems:"center"

    }}>
      <IconButton  size="large">
        <Avatar alt={session?.user?.name || "User"} src={session?.user?.image || ""}>
          {session?.user?.name ? session.user.name.charAt(0) : <AccountCircle />}
        </Avatar>
        
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 1,
          sx: {
            mt: 1.5,
            overflow: "visible",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 5,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem disabled>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography>{session?.user?.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {session?.user?.email}
            </Typography>
          </Box>
        </MenuItem>
        <Box sx={{
          width:"100%",
          height:"1px",
          bgcolor:"black"
        }}></Box>
        <MenuItem onClick={handleLogout}>
          <Logout fontSize="small" />
          <Typography  sx={{ ml: 1 ,bgcolor:"white"}}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
      <Box>
      <Typography>{session?.user?.name}</Typography>

      </Box>
      <KeyboardArrowDownIcon onClick={handleMenuOpen}/>

    </Box>
  );
};

export default UserDropdown;
