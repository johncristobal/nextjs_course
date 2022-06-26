import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useContext } from "react";
import { UIContext } from "../../context/ui";

const menuItems : string[] = ['Inbox','Starred','Send Email', 'Drafts']

export const Sidebar = () => {

    const { sidemenuopen, closeSideMenu } = useContext( UIContext );

  return (
   <Drawer
        anchor="left"
        open={ sidemenuopen }
        onClose={ closeSideMenu }
   >

    <Box sx={{ width: 250 }}>

        <Box sx={{ padding: '5px 10px'}}>
            <Typography variant='h4'>Menu</Typography>
        </Box>

        <List>
            {
                menuItems.map( (text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            <InboxOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))
            }
        </List>

        <Divider />

        <List>
            {
                menuItems.map( (text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            <InboxOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))
            }
        </List>
    </Box>

   </Drawer>
  )
}
