import React from 'react'
import {Typography, TypographyProps} from '@mui/material'
import {styled} from '@mui/system'

/**
 * Styled MUI Typography component with a default margin-bottom of 16px (mui v5).
 */
const StyledParagraph = styled(Typography)<TypographyProps>(({theme}) => ({
  marginBottom: theme.spacing(2) // Adds a bottom margin of 16px
}))

/**
 * Props for the Paragraph component. Inherits all MUI TypographyProps.
 */
export interface ParagraphProps extends TypographyProps {}

/**
 * A reusable component that renders text as a paragraph (`<p>` tag) with built-in spacing.
 *
 * By default, this component renders as a `<p>` element with a margin-bottom of 16px.
 * You can override the HTML element using the `component` prop, which accepts values
 * like `"div"`, `"span"`, etc.
 *
 * @component
 * @example
 * // Renders a paragraph with default spacing
 * <Paragraph>This is a paragraph with spacing.</Paragraph>
 *
 * @example
 * // Renders a div with the same styles
 * <Paragraph component="div">This is a div with paragraph styling.</Paragraph>
 *
 * @param {ParagraphProps} props - The props for the Paragraph component.
 * @param {React.ReactNode} props.children - The content to be displayed within the paragraph.
 * @param {'p' | 'div' | 'span'} [props.component='p'] - The HTML element to render.
 * @returns {JSX.Element} The rendered paragraph element.
 */
const Paragraph: React.FC<ParagraphProps> = ({component = 'p', ...props}) => {
  return <StyledParagraph component={component} {...props} />
}

// Export an alias `P` for convenience
const P = Paragraph

export {Paragraph as default, P}
