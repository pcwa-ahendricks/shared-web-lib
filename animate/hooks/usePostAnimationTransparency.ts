import {useMemo} from 'react'

export interface UsePostAnimationTransparencyProps {
  alwaysAnimate: boolean
  previouslyAnimated: boolean
}

const usePostAnimationTransparency = ({
  alwaysAnimate,
  previouslyAnimated
}: UsePostAnimationTransparencyProps) => {
  return useMemo(() => {
    return !alwaysAnimate && previouslyAnimated
  }, [alwaysAnimate, previouslyAnimated])
}

export default usePostAnimationTransparency
