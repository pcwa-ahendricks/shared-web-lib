import {useMemo} from 'react'

export interface UseInitialAnimationTransparencyProps {
  alwaysAnimate: boolean
  previouslyAnimated: boolean
}

const useInitialAnimationTransparency = ({
  alwaysAnimate,
  previouslyAnimated
}: UseInitialAnimationTransparencyProps) => {
  return useMemo(() => {
    return alwaysAnimate || !previouslyAnimated
  }, [alwaysAnimate, previouslyAnimated])
}

export default useInitialAnimationTransparency
