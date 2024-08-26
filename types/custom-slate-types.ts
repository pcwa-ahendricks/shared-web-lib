import {BaseEditor} from 'slate'
import {ReactEditor} from 'slate-react'
import {type HistoryEditor} from 'slate-history'
import {type CustomElement, type CustomText} from '../slate'

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}
