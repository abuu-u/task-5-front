import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

interface Properties {
  sender: string
  title: string
  body: string
}

const Message: React.ComponentType<Properties> = ({ sender, title, body }) => {
  return (
    <>
      <Box
        sx={{
          whiteSpace: 'nowrap',
          width: 'calc(100vw - 240px)',
          display: 'flex',
          gap: '20px',
          p: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            fontWeight: 600,
            width: '200px',
            flexShrink: 0,
          }}
        >
          {sender}
        </Typography>
        <Typography
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            fontWeight: 500,
            maxWidth: '500px',
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            flexGrow: 1,
          }}
        >
          {body}
        </Typography>
      </Box>
      <Divider />
    </>
  )
}

export default Message
