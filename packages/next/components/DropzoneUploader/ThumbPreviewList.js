// @flow
import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {type DroppedFile, type UploadedFile} from './DropzoneUploader'
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Paper,
  withWidth
  // Typography as Type
} from '@material-ui/core'

type Props = {
  classes: any,
  droppedFiles: Array<DroppedFile>,
  uploadedFiles: Array<UploadedFile>,
  onRemoveUpload: (file: DroppedFile) => void,
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const styles = () => ({})

const ThumbPreviewList = ({
  // classes,
  droppedFiles,
  uploadedFiles
}: //
// onRemoveUpload,
// width
Props) => {
  console.log(uploadedFiles)
  // const [thumbHover, setThumbHover] = useState<string | null>(null)
  return (
    <Paper>
      <List>
        {droppedFiles.map((file) => (
          <ListItem key={file.name}>
            <ListItemAvatar>
              <Avatar alt="File Upload Preview" src={file.previewUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={file.originalName}
              // secondary={
              //   <React.Fragment>
              //     <Type
              //       component="span"
              //       className={classes.inline}
              //       color="textPrimary"
              //     >
              //       Ali Connors
              //     </Type>
              //     {" — I'll be in your neighborhood doing errands this…"}
              //   </React.Fragment>
              // }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

ThumbPreviewList.defaultProps = {
  droppedFiles: [],
  uploadedFiles: [],
  onRemoveUpload: () => {}
}

export default withWidth()(withStyles(styles)(ThumbPreviewList))
