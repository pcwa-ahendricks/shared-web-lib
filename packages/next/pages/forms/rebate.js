// @flow
import React, {useState} from 'react'
import {Typography as Type} from '@material-ui/core'
// import PageLayout from '../../components/PageLayout/PageLayout'
import DropzoneUploader from '../../components/DropzoneUploader/DropzoneUploader'
import {withStyles} from '@material-ui/core/styles'
import Head from 'next/head'
import {Formik, Form} from 'formik'
import {string, object} from 'yup'

// type Props = {
//   classes: any
// }

const formSchema = object()
  .camelCase()
  .shape({
    // attachments: array().of(string()),
    email: string()
      .email()
      .required()
      .label('Email')
  })

const initialFormValues = {
  email: ''
}

const styles = {}

const Rebate = () => {
  const [formIsDirty, setFormIsDirty] = useState<boolean>(false)
  const [formValues, setFormValues] = useState(null)
  const [formIsTouched, setFormIsTouched] = useState<boolean>(false)

  // <PageLayout title="Irrigation Canal Information">
  return (
    <React.Fragment>
      <Head>
        <title>Rebate Form</title>
        <meta name="description" content="PCWA Water Efficiency Rebate Form" />
      </Head>
      <main>
        <Type variant="h3">Rebate Form</Type>

        <Formik
          // Always run validation. Ie. don't use validateOnBlur prop cause when a valid email is actually entered the form will remain invalid until field is blurred.
          // Instead, we control the displaying of the error message below in the field to ensure the field was touched before showing errors, which will start
          // propagating as soon as the first character is entered in the input.
          initialValues={initialFormValues}
          validationSchema={formSchema}
          onSubmit={(values, actions) => {
            // Dispatch submit
            console.log(values, actions)
          }}
        >
          {({
            values,
            touched = {},
            dirty
            // errors = {},
            // handleChange,
            // handleBlur,
            // isSubmitting,
            // isValid,
          }) => {
            if (dirty !== formIsDirty) {
              setFormIsDirty(dirty)
            }
            if (values !== formValues) {
              setFormValues(values)
            }
            // Use state to save a boolean version of 'touched'.
            const formTouched = Object.keys(touched).length > 0
            if (formTouched !== formIsTouched) {
              setFormIsTouched(formTouched)
            }

            return (
              <Form>
                <DropzoneUploader />
              </Form>
            )
          }}
        </Formik>
      </main>
    </React.Fragment>
  )
}
/* </PageLayout> */

export default withStyles(styles)(Rebate)
