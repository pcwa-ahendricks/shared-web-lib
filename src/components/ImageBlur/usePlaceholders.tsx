import {useEffect, useContext} from 'react'
import {addPlaceholders, ImageBlurContext, Placeholders} from './ImageBlurStore'

const usePlaceholders = (placeholders: Placeholders = []) => {
  const imageBlurContext = useContext(ImageBlurContext)
  const {dispatch} = imageBlurContext
  useEffect(() => {
    dispatch(addPlaceholders(placeholders))
  }, [dispatch, placeholders])
}

export default usePlaceholders
