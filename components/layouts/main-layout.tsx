import { Inbox, Send } from '@mui/icons-material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect, useState } from 'react'
import { getName, removeName } from '../../common/name-helper'
import CustomAvatar from '../custom-avatar'
import { NextLinkComposed } from '../link'

const MainLayout: React.ComponentType<PropsWithChildren<{}>> = ({
  children,
}) => {
  const router = useRouter()

  const [name, setName] = useState('')

  // eslint-disable-next-line unicorn/no-null
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)

  useEffect(() => {
    setName(getName() ?? '')
  }, [])

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget)
  }

  const handleClose = () => {
    // eslint-disable-next-line unicorn/no-null
    setAnchorElement(null)
  }

  const handleLogout = () => {
    removeName()
    router.push('/login')
  }

  return (
    <Box sx={{ height: '100vh' }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {!!name && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <CustomAvatar name={name} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElement}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={!!anchorElement}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', height: 'calc(100% - 64px)' }}>
        <Box
          sx={{
            width: 240,
          }}
        >
          <Button
            sx={{
              margin: '10px 0',
            }}
            fullWidth={true}
            startIcon={<Send />}
            component={NextLinkComposed}
            to="/send"
          >
            Send
          </Button>
          <Divider />
          <List>
            {[{ text: 'Inbox', to: '/' }].map(({ text, to }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton component={NextLinkComposed} to={to}>
                  <ListItemIcon>
                    <Inbox />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider orientation="vertical" flexItem={true} />
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default MainLayout
