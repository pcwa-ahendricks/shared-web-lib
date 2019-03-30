// @flow
import React from 'react'
import {Button} from '@material-ui/core'
// import MediaPreviewDialog from '@components/MediaPreviewDialog/MediaPreviewDialog'

const termsConditionsUrl =
  'https://s3-us-west-2.amazonaws.com/cosmicjs/003f0ec0-5273-11e9-bcdc-03bbac853653-Irrigation-Efficiency-Terms-and-Conditions.pdf'

// const termsConditionsUrl =
//   '/static/docs/Irrigation Efficiency Terms and Conditions.pdf'
const IrrigEffTermsConditions = () => {
  // const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="secondary"
        target="_blank"
        rel="noopener noreferrer"
        href={termsConditionsUrl}
        // onClick={() => setDialogOpen(true)}
      >
        Review Terms & Conditions
      </Button>
      {/* <MediaPreviewDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        name="Irrigation-Efficiency-Terms-and-Conditions.pdf"
        url={termsConditionsUrl}
      /> */}
    </React.Fragment>
  )
}

export default IrrigEffTermsConditions
