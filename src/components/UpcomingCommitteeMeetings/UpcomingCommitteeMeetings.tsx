import {
  Box,
  CircularProgress,
  Typography as Type,
  useTheme
} from '@material-ui/core'
import {format} from 'date-fns'
import InboxRoundedIcon from '@material-ui/icons/InboxRounded'
import {MappedAgenda} from '@pages/board-of-directors/meeting-agendas'
import slugify from 'slugify'
import ImageThumbLink from '@components/ImageThumbLink/ImageThumbLink'
import OpenInNewLink from '@components/OpenInNewLink/OpenInNewLink'

const DATE_FNS_FORMAT = 'yyyy-MM-dd'

export default function UpcomingCommitteeMeetings({
  data: agendas
}: {
  data: MappedAgenda[]
}) {
  const theme = useTheme()

  if (!agendas) {
    return (
      <Box display="flex" height={75}>
        <Box m="auto">
          <CircularProgress color="secondary" variant="indeterminate" />
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      {/* <CommitteeAgendas title="Upcoming Committee Meetings" /> */}

      <Type gutterBottom variant="h4">
        {/* {title}: */}
        Upcoming Committee Meetings:
      </Type>
      <Box
        p={3}
        bgcolor={theme.palette.common.white}
        boxShadow={1}
        borderRadius={2}
      >
        {agendas.length > 0 ? (
          agendas.map((item, idx) => {
            // Don't slugify route (ie "/")
            const linkAs = `/board-of-directors/meeting-agendas/${
              // item.derivedFilenameAttr?.date + '-' + item.metadata?.type
              slugify(format(item.dateTime, DATE_FNS_FORMAT) + '-' + item.title)
            }`
            return (
              <Box key={idx} display="flex" flexDirection="row">
                <Box>
                  <ImageThumbLink
                    isNextLink
                    imgixUrl={item.metadata.agenda_pdf.imgix_url}
                    alt={`Thumbnail and link for ${item.title}`}
                    as={linkAs}
                    href="/board-of-directors/meeting-agendas/[agenda-slug]"
                    sizes="(max-width: 600px) 33vw, 15vw"
                  />
                </Box>
                <Box marginLeft={4}>
                  <OpenInNewLink
                    pdf
                    isNextLink
                    as={linkAs}
                    href="/board-of-directors/meeting-agendas/[agenda-slug]"
                  >
                    <Type variant="subtitle1">{item.title}</Type>
                  </OpenInNewLink>
                  <Type variant="subtitle2" color="textSecondary" gutterBottom>
                    {format(item.dateTime, "eeee',' MMMM do, yyyy")}
                  </Type>
                  <Type variant="body2" paragraph>
                    Click the title link (or thumbnail image on left) to view
                    the agenda, and for additional information including the
                    time and location of this meeting.
                  </Type>
                </Box>
              </Box>
            )
          })
        ) : (
          <Box
            display="flex"
            flexDirection="row"
            fontStyle="italic"
            alignItems="center"
          >
            <Box justifyContent="center">
              <InboxRoundedIcon fontSize="large" color="disabled" />
            </Box>
            <Box ml={4}>
              <Type color="textSecondary">None at this time.</Type>
            </Box>
          </Box>
        )}
      </Box>
      {/* <Spacing factor={2} />
		    <OtherAgenda
		      list={auditCommitteeAgendas}
		      title="Upcoming Board of Directors' Audit Committee Meetings"
		    />
		    <Spacing factor={2} />
		    <OtherAgenda
		      list={otherCommitteeAgendas}
		      title="Other Upcoming Board of Directors' Committee Meetings"
		    /> */}
    </Box>
  )
}
