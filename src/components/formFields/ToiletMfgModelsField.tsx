import React from 'react'
import {Box, Fab, Grid, Tooltip} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/DeleteForever'
import ClearIcon from '@mui/icons-material/Clear'
import {FieldArrayRenderProps, FormikProps} from 'formik'
import FormTextField from '@components/formFields/FormTextField'
import {ToiletRebateFormData as RebateFormData} from '@lib/services/formService'
import {FlexBox} from 'mui-sleazebox'

type Props = {
  disabled?: boolean
} & FieldArrayRenderProps

const ToiletMfgModelsField = ({disabled = false, ...arrayHelpers}: Props) => {
  const {values}: FormikProps<RebateFormData> = arrayHelpers.form
  return (
    <div>
      {values.manufacturerModel && values.manufacturerModel.length > 0
        ? values.manufacturerModel.map((item, index, items) => (
            <div key={index}>
              <Grid
                container
                spacing={5}
                justifyContent="center"
                alignContent="center"
              >
                <Grid item xs={12} sm={5}>
                  <FormTextField
                    disabled={disabled}
                    required
                    name={`manufacturerModel[${index}].manufacturer`}
                    label={`Toilet/Urinal Manufacturer ${
                      index > 1 ? index : ''
                    }`}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <FormTextField
                    disabled={disabled}
                    required
                    name={`manufacturerModel[${index}].model`}
                    label={`Toilet/Urinal Model ${index > 1 ? index : ''}`}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  {items.length - index === 1 &&
                  (item.model || item.manufacturer || index === 0) ? (
                    <FlexBox height="100%" alignItems="center">
                      <Box flex="0 0 auto">
                        <Tooltip
                          title="Add additional toilet/urinal"
                          aria-label="Add row"
                        >
                          <Fab
                            disabled={disabled}
                            size="medium"
                            color="secondary"
                            onClick={() =>
                              arrayHelpers.push({
                                manufacturer: '',
                                model: ''
                              })
                            }
                          >
                            <AddIcon />
                          </Fab>
                        </Tooltip>
                      </Box>
                    </FlexBox>
                  ) : null}
                  {items.length - index !== 1 ||
                  (!item.model && !item.manufacturer && index !== 0) ? (
                    <Box display="flex" height="100%" alignItems="center">
                      <Box flex="0 0 auto">
                        <Tooltip
                          title="Remove toilet/urinal"
                          aria-label="Remove row"
                        >
                          <Fab
                            disabled={disabled}
                            size="medium"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            {!item.model &&
                            !item.manufacturer &&
                            index !== 0 ? (
                              <ClearIcon />
                            ) : (
                              <DeleteIcon />
                            )}
                          </Fab>
                        </Tooltip>
                      </Box>
                    </Box>
                  ) : null}
                </Grid>
              </Grid>
            </div>
          ))
        : null}
    </div>
  )
}

export default ToiletMfgModelsField
