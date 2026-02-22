import {cn} from '../../lib/utils'

/**
 * Props for the Paragraph component.
 * Extends standard HTML <p> attributes and allows Tailwind class overrides.
 */
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>

/**
 * Paragraph
 *
 * A lightweight, Tailwind-native replacement for MUI Typography used for body text.
 * Provides consistent spacing and readable line-height by default.
 *
 * Defaults:
 * - margin-bottom: 0.9rem
 * - line-height: relaxed (≈ 1.6)
 *
 * Use `className` to extend or override styles.
 *
 * Example:
 * ```tsx
 * <Paragraph>
 *   This is a paragraph of body text.
 * </Paragraph>
 *
 * <Paragraph className="text-sm text-muted-foreground">
 *   Smaller, muted paragraph text.
 * </Paragraph>
 * ```
 */
function Paragraph({className, ...props}: ParagraphProps) {
  return (
    <p className={cn('mb-[0.9rem] leading-relaxed', className)} {...props} />
  )
}

const P = Paragraph

export {P, Paragraph as default}
export type {ParagraphProps}
