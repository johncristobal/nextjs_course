import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined, DashboardOutlined } from '@mui/icons-material';
import { useContext, useState } from "react";
import { AuthContext, UiContext } from "../../context";
import { useRouter } from "next/router";

export const SideMenu = () => {

    const router = useRouter();
    const { isMenuOpen, toogleSideMenu} = useContext(UiContext);
    const { logged, user, logout } = useContext(AuthContext);

    const [searchTerm, setSearchTerm] = useState("");

    const navigateTo = (url: string) => {
        toogleSideMenu();
        router.push(url);
    }

    const onSearchTerm = () => {
        if(searchTerm.trim().length === 0) return;        
        navigateTo(`/search/${searchTerm}`);
    }

    const onLogout = () => {
        logout();
    }

    const loginAction = () => {
        const { asPath } = router;
        navigateTo(`/auth/login?p=${asPath}`)
    }

  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={toogleSideMenu}
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                        autoFocus
                        type='text'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={ (e) => e.key ==='Enter' ? onSearchTerm() : null }
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={ onSearchTerm }
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                <ListItem 
                    button
                    onClick={() => navigateTo('/category/men')}
                    sx={{ display: { xs: '', sm: 'none' } }}>
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Hombres'} />
                </ListItem>

                <ListItem 
                    button
                    onClick={() => navigateTo('/category/women')}
                    sx={{ display: { xs: '', sm: 'none' } }}
                >
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mujeres'} />
                </ListItem>

                <ListItem 
                    button
                    onClick={() => navigateTo('/category/kid')}
                    sx={{ display: { xs: '', sm: 'none' } }}
                >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Niños'} />
                </ListItem>

                {
                    (logged && user?.role == 'client')
                    ? (
                        <>
                        <ListItem button>
                            <ListItemIcon>
                                <AccountCircleOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Perfil'} />
                        </ListItem>

                        <ListItem button onClick={() => navigateTo('/orders/history')}>
                            <ListItemIcon>
                                <ConfirmationNumberOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Mis Ordenes'} />
                        </ListItem>

                        <ListItem button onClick={onLogout}>
                            <ListItemIcon>
                                <LoginOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItem>

                        </>
                    )
                    : (logged && user?.role == 'admin')
                    ? (
                        <>
                        <Divider />
                        <ListSubheader>Admin Panel</ListSubheader>
                            <ListItem
                            button
                            onClick={() => navigateTo('/admin')}
                            >
                                <ListItemIcon>
                                    <DashboardOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Dashboard'} />
                            </ListItem>
                            <ListItem button
                                onClick={() => navigateTo('/admin/orders')}
                            >
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Ordenes'} />
                            </ListItem>

                            <ListItem 
                            onClick={() => navigateTo('/admin/users')}
                            button
                            >
                                <ListItemIcon>
                                    <AdminPanelSettings/>
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />
                            </ListItem>

                            <ListItem button onClick={onLogout}>
                                <ListItemIcon>
                                    <LoginOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Salir'} />
                            </ListItem>
                        </>
                    )
                    : (
                        <ListItem button onClick={loginAction}>
                            <ListItemIcon>
                                <VpnKeyOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Ingresar'} />
                        </ListItem>
                    )
                }
            </List>
        </Box>
    </Drawer>
  )
}