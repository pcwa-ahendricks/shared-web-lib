import {BaseEditor} from 'slate'
import {ReactEditor} from 'slate-react'
import type {CustomElement, CustomText} from './slate'
import {type HistoryEditor} from 'slate-history'

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}
