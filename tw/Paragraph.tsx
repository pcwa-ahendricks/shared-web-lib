import {cn} from '../../lib/utils'

type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>

function Paragraph({className, ...props}: ParagraphProps) {
  return <p className={cn('mb-[0.9rem] leading-relaxed', className)} {...props} />
}

const P = Paragraph

export {P, Paragraph as default}
export type {ParagraphProps}
