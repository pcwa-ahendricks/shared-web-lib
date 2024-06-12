import {Box, Typography as Type, alpha} from '@mui/material'
import {kiperman} from '@lib/material-theme'
import useTheme from '@hooks/useTheme'

type Props = {}

const BlockQuote: React.FC<Props> = () => {
  const theme = useTheme()
  return (
    <Box sx={{display: 'flex'}}>
      <Box
        sx={{
          position: 'relative'
          //   maxWidth: 720,
          //   margin: '80px auto',
          //   alignSelf: 'center'
        }}
      >
        <Type
          component="h1"
          variant="h2"
          sx={{
            fontFamily: kiperman.style.fontFamily,
            color: 'primary.main',
            position: 'relative' /* for pseudos */,
            margin: 0,
            border: `solid 2px ${alpha(theme.palette.secondary.light, 0.8)}`,
            borderRadius: 5,
            padding: 3,
            ':before': {
              content: '""',
              position: 'absolute',
              width: 80,
              border: '6px solid #fafafa',
              bottom: -3,
              left: 50,
              zIndex: 2
            },
            ':after': {
              content: '""',
              position: 'absolute',
              border: `solid 2px ${alpha(theme.palette.secondary.light, 0.8)}`,
              borderRadius: '0 50px 0 0',
              width: 60,
              height: 60,
              bottom: -60,
              left: 50,
              borderBottom: 'none',
              borderLeft: 'none',
              zIndex: 3
            }
          }}
        >
          Water is not just essential for our daily lives; it's the cornerstone
          of Placer County's future.{' '}
          <strong>
            <em>"Water for Our Future"</em>
          </strong>{' '}
          symbolizes PCWA's proactive commitment to supporting a thriving
          community and the economic vitality of Placer County.
        </Type>
        {/* <Type
          variant="h4"
          sx={{
            position: 'relative',
            color: '#000000',
            fontSize: '1.3rem',
            fontWeight: 400,
            margin: 0,
            paddingTop: '15px',
            zIndex: 1,
            marginLeft: '150px',
            paddingLeft: '12px',
            ':first-letter': {
              marginLeft: '-20px'
            }
          }}
        >
          &mdash;John Doe
          <br />
          <em>Web Site Usability: A Designer's Guide</em>
        </Type> */}
      </Box>
    </Box>
  )
}
export default BlockQuote
