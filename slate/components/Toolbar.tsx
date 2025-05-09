'use client'
import {
  alpha,
  Box,
  createTheme,
  Divider,
  Fade,
  Paper,
  Popper,
  styled,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
  ToggleButtonProps,
  Tooltip,
  useTheme
} from '@mui/material'
import {
  useCallback,
  useEffect,
  useState,
  forwardRef,
  useMemo,
  useRef
} from 'react'
import {Editor, Range} from 'slate'
import {useSlate, useSlateSelection, useFocused} from 'slate-react'
import UndoIcon from '@mui/icons-material/Undo'
import RedoIcon from '@mui/icons-material/Redo'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlineIcon from '@mui/icons-material/FormatUnderlined'
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough'
import FormatCodeIcon from '@mui/icons-material/Code'

/**
 * Props for the Toolbar component.
 * @property {boolean} [floating=false] - Whether the toolbar is floating.
 * @property {boolean} [historyGroup=true] - Whether to show the undo/redo history group.
 * @property {boolean} [formattingGroup=false] - Whether to show the text formatting group.
 * @property {Partial<{
 *   bold: boolean,
 *   italic: boolean,
 *   underline: boolean,
 *   strikethrough: boolean,
 *   code: boolean
 * }>} [formattingOptions] - Options for enabling/disabling specific text formatting options.
 */
type Props = {
  floating?: boolean
  historyGroup?: boolean
  formattingGroup?: boolean
  formattingOptions?: Partial<{
    bold: boolean
    italic: boolean
    underline: boolean
    strikethrough: boolean
    code: boolean
  }>
}

type Format = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code'

// const SquareIconButton = styled(Button)(({theme}) => ({
//   borderBottomLeftRadius: 0,
//   borderBottomRightRadius: 0,
//   minWidth: 40,
//   padding: 0, // Remove padding to make it look like an IconButton
//   // borderRadius: 0, // Ensure the button is square
//   '& .MuiButton-startIcon': {
//     margin: 0 // Remove margin between the icon and the button edge
//   }
// }))

// const Toolbar = useCallback(() => {
//   return (
//     <Box>
//       <ButtonGroup
//         variant="contained"
//         aria-label="Basic button group"
//         sx={{height: 40}}
//         color="inherit"
//         size="small"
//       >
//         <SquareIconButton startIcon={<UndoIcon />} />
//         <SquareIconButton startIcon={<RedoIcon />} />
//       </ButtonGroup>
//     </Box>
//   )
// }, [SquareIconButton])

/**
 * StyledToggleButtonGroup is a styled version of MUI's ToggleButtonGroup with custom styles for grouped buttons.
 */
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: 0,
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0
    }
  }
  // not sure why the example on mui.com uses the following cause it causes the width to change slightly when disabled toggles.
  // [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
  // {
  // marginLeft: -1,
  // borderLeft: '1px solid transparent'
  // }
}))

/**
 * ToolbarButton is a forwardRef wrapper around MUI's ToggleButton component,
 * with default behavior to prevent the default mouse down event to keep the Slate editor's selection intact.
 *
 * @param {ToggleButtonProps} props - The props passed to the ToolbarButton component.
 * @param {React.ReactNode} children - The content to display inside the button.
 * @returns {JSX.Element} The rendered toolbar button component.
 */
const ToolbarButton = forwardRef<
  HTMLButtonElement,
  ToggleButtonProps & {floating: boolean}
>(({children, floating, value, ...props}, ref) => {
  const {sx, ...rest} = props || {}
  const theme = useTheme()
  return (
    <ToggleButton
      value={value}
      component="button"
      {...rest}
      sx={{
        ...sx,
        // floating buttons should stand out a bit more
        ...(floating && {
          '&.Mui-selected': {
            backgroundColor: alpha(
              theme.palette.common.white,
              theme.palette.action.selectedOpacity * 1.3
            ),
            ...theme.applyStyles('dark', {
              backgroundColor: alpha(
                theme.palette.common.black,
                theme.palette.action.selectedOpacity * 1.3
              )
            })
          }
        })
      }}
      ref={ref}
      onMouseDown={(
        event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
      ) => {
        /*  preventDefault is necessary in order to persist the slate selection after button press.
              Without this, the selection is cleared on format and selects all text when un-formatted.
              stopPropagation may not be necessary, and it's not used in the Slate Rich Text example.
              See https://github.com/ianstormtaylor/slate/blob/main/site/examples/richtext.tsx for more info.
          */
        event.preventDefault()
      }}
    >
      {children}
    </ToggleButton>
  )
})
ToolbarButton.displayName = 'ToolbarButton'

/**
 * Toolbar component for Slate editor, providing formatting options and undo/redo functionality.
 *
 * @param {Props} props - The properties object containing configuration options.
 * @param {boolean} props.floating - Whether the toolbar is floating.
 * @param {boolean} props.historyGroup - Whether to show the undo/redo history group.
 * @param {boolean} props.formattingGroup - Whether to show the text formatting group.
 * @param {Partial<{ bold: boolean, italic: boolean, underline: boolean, strikethrough: boolean, code: boolean }>} props.formattingOptions - Options for enabling/disabling specific text formatting options.
 *
 * @returns {JSX.Element} The rendered toolbar component.
 */
export default function Toolbar({
  floating = false,
  historyGroup = true,
  formattingGroup = false,
  formattingOptions = {
    bold: true,
    italic: true,
    underline: true,
    strikethrough: true,
    code: true
  }
}: Props) {
  const editor = useSlate()
  const selection = useSlateSelection() // Get the current selection
  const [formats, setFormats] = useState<Format[]>([])
  const isEditorFocused = useFocused()

  useEffect(() => {
    if (!isEditorFocused) {
      setFormats([])
    }
  }, [isEditorFocused])

  /**
   * Checks if the specified text format is currently active in the editor.
   *
   * @param {Format} format - The format to check.
   * @returns {boolean} Whether the format is active.
   */
  const isMarkActive = useCallback(
    (format: Format) => {
      const marks = Editor.marks(editor)
      return marks ? marks[format] === true : false
    },
    [editor]
  )

  const isSelectionActive = useMemo(() => {
    if (!selection) {
      return false
    }
    return !Range.isCollapsed(selection)
  }, [selection])

  /**
   * Removes all marks (text formatting) from the current selection.
   */
  const removeAllMarks = useCallback(() => {
    const allMarks = Editor.marks(editor)
    if (allMarks) {
      Object.keys(allMarks).forEach((mark) => {
        Editor.removeMark(editor, mark)
      })
    }
  }, [editor])

  useEffect(() => {
    if (formattingGroup) {
      // only set formats if there is a selection, eg. two or more characters selected
      if (isSelectionActive) {
        let newFormats: Format[] = []
        const isBold = isMarkActive('bold')
        if (isBold) {
          newFormats = [...newFormats, 'bold']
        }
        const isItalic = isMarkActive('italic')
        if (isItalic) {
          newFormats = [...newFormats, 'italic']
        }
        const isUnderline = isMarkActive('underline')
        if (isUnderline) {
          newFormats = [...newFormats, 'underline']
        }
        const isStrikeThrough = isMarkActive('strikethrough')
        if (isStrikeThrough) {
          newFormats = [...newFormats, 'strikethrough']
        }
        const isCode = isMarkActive('code')
        if (isCode) {
          newFormats = [...newFormats, 'code']
        }
        setFormats(newFormats)
      } else {
        removeAllMarks()
        setFormats([])
      }
    }
  }, [isMarkActive, formattingGroup, removeAllMarks, isSelectionActive])

  /**
   * Toggles the specified text formatting mark in the editor.
   *
   * @param {Format} format - The format to toggle.
   */
  const toggleMark = useCallback(
    (format: Format) => {
      const isActive = isMarkActive(format)
      if (isActive) {
        Editor.removeMark(editor, format)
      } else {
        Editor.addMark(editor, format, true)
      }
      setFormats((prevFormats) =>
        isActive
          ? prevFormats.filter((f) => f !== format)
          : [...prevFormats, format]
      )
    },
    [editor, isMarkActive]
  )

  const undoHandler = useCallback(() => {
    editor.undo()
  }, [editor])

  const redoHandler = useCallback(() => {
    editor.redo()
  }, [editor])

  const anchorRef = useRef<HTMLDivElement>(null)

  const toolbarContent = (
    <Box sx={{display: 'flex'}}>
      <Paper
        elevation={0}
        sx={(theme) => ({
          display: 'flex',
          border: `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
          ...(floating && {
            backgroundColor: alpha(theme.palette.background.paper, 0.7)
          })
        })}
      >
        <StyledToggleButtonGroup
          disabled={!isEditorFocused}
          sx={{
            ...(!historyGroup && {display: 'none'})
          }}
          size="small"
          // value={}
          aria-label="Redo and Undo Button Group"
        >
          <Tooltip title="Undo" placement="top">
            <Box component="span">
              <ToolbarButton
                floating={floating}
                value={false}
                aria-label="Undo"
                selected={false}
                onClick={undoHandler}
              >
                <UndoIcon />
              </ToolbarButton>
            </Box>
          </Tooltip>
          <Tooltip title="Redo" placement="top">
            <Box component="span">
              <ToolbarButton
                floating={floating}
                value={false}
                aria-label="Redo"
                selected={false}
                onClick={redoHandler}
              >
                <RedoIcon />
              </ToolbarButton>
            </Box>
          </Tooltip>
        </StyledToggleButtonGroup>
        <Divider
          sx={{
            ...((!formattingGroup || !historyGroup) && {display: 'none'}),
            mx: 0.5,
            my: 1
          }}
          flexItem
          orientation="vertical"
        />
        <StyledToggleButtonGroup
          disabled={!isEditorFocused || !isSelectionActive}
          sx={{
            ...(!formattingGroup && {display: 'none'})
          }}
          size="small"
          value={formats}
          aria-label="Text Formatting Button Group"
          onChange={(_e: React.MouseEvent, value: any) => setFormats(value)}
        >
          {formattingOptions.bold ? (
            <Tooltip title="Bold" placement="top">
              <Box component="span">
                <ToolbarButton
                  floating={floating}
                  value="bold"
                  aria-label="Bold Format"
                  onClick={() => toggleMark('bold')}
                  selected={formats.includes('bold')}
                >
                  <FormatBoldIcon />
                </ToolbarButton>
              </Box>
            </Tooltip>
          ) : null}
          {formattingOptions.italic ? (
            <Tooltip title="Italic" placement="top">
              <Box component="span">
                <ToolbarButton
                  floating={floating}
                  value="italic"
                  aria-label="Italic Format"
                  onClick={() => toggleMark('italic')}
                  selected={formats.includes('italic')}
                >
                  <FormatItalicIcon />
                </ToolbarButton>
              </Box>
            </Tooltip>
          ) : null}
          {formattingOptions.underline ? (
            <Tooltip title="Underline" placement="top">
              <Box component="span">
                <ToolbarButton
                  floating={floating}
                  value="underline"
                  aria-label="Underline Format"
                  onClick={() => toggleMark('underline')}
                  selected={formats.includes('underline')}
                >
                  <FormatUnderlineIcon />
                </ToolbarButton>
              </Box>
            </Tooltip>
          ) : null}
          {formattingOptions.strikethrough ? (
            <Tooltip title="Strike-through" placement="top">
              <Box component="span">
                <ToolbarButton
                  floating={floating}
                  value="strikethrough"
                  aria-label="Strike-through Format"
                  onClick={() => toggleMark('strikethrough')}
                  selected={formats.includes('strikethrough')}
                >
                  <FormatStrikethroughIcon />
                </ToolbarButton>
              </Box>
            </Tooltip>
          ) : null}
          {formattingOptions.code ? (
            <Tooltip title="Code Block" placement="top">
              <Box component="span">
                <ToolbarButton
                  floating={floating}
                  value="code"
                  aria-label="Code block Format"
                  onClick={() => toggleMark('code')}
                  selected={formats.includes('code')}
                >
                  <FormatCodeIcon />
                </ToolbarButton>
              </Box>
            </Tooltip>
          ) : null}
        </StyledToggleButtonGroup>
        {/* <StyledToggleButtonGroup
            size="small"
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            {' '}
            <ToggleButton value="left" aria-label="left aligned">
              <FormatAlignLeftIcon />
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              <FormatAlignCenterIcon />
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              <FormatAlignRightIcon />
            </ToggleButton>
            <ToggleButton value="justify" aria-label="justified" disabled>
              <FormatAlignJustifyIcon />
            </ToggleButton>
          </StyledToggleButtonGroup>
          <Divider flexItem orientation="vertical" sx={{mx: 0.5, my: 1}} />
          <StyledToggleButtonGroup
            size="small"
            value={formats}
            onChange={handleFormat}
            aria-label="text formatting"
          >
            <ToggleButton value="bold" aria-label="bold">
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton value="italic" aria-label="italic">
              <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton value="underlined" aria-label="underlined">
              <FormatUnderlinedIcon />
            </ToggleButton>
            <ToggleButton value="color" aria-label="color" disabled>
              <FormatColorFillIcon />
              <ArrowDropDownIcon />
            </ToggleButton>
          </StyledToggleButtonGroup> */}
      </Paper>
    </Box>
  )

  // Create MUI dark theme
  const theme = useTheme()
  const flipTheme = createTheme({
    palette: {
      mode: theme.palette.mode === 'light' ? 'dark' : 'light'
    }
  })

  // Floating Toolbar with Popper
  if (floating) {
    return (
      <ThemeProvider theme={flipTheme}>
        <Box
          sx={{
            position: 'relative'
          }}
        >
          <Box
            ref={anchorRef}
            sx={{
              position: 'absolute',
              width: 0,
              height: 0,
              top: 0,
              left: 0
            }}
          />

          <Popper
            // id="popper"
            placement="top-start"
            disablePortal
            open={isEditorFocused}
            anchorEl={anchorRef.current}
            transition
            modifiers={[
              {
                name: 'offset',
                options: {
                  offset: [0, parseFloat(theme.spacing(1))] // X and Y offset values (just use number, not "XXpx")
                }
              }
            ]}
            sx={{
              backdropFilter: 'blur(4px)',
              ...theme.applyStyles('dark', {
                backdropFilter: 'blur(3px)'
              })
            }}
          >
            {({TransitionProps}) => (
              <Fade {...TransitionProps} timeout={350}>
                <Box>{toolbarContent}</Box>
              </Fade>
            )}
          </Popper>
        </Box>
      </ThemeProvider>
    )
  }

  return <Box sx={{marginBottom: 1}}>{toolbarContent}</Box>
}

export type {Props as ToolbarProps}
