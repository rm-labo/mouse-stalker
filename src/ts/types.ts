export type MsOptions = {
  mouseElementClassName?: string
  pointerElementClassName?: string
  iconTargetElementClassName?: string
  pageBaseColor?: string // ページに背景色がないと mix-blend-mode が正しく機能しない問題の回避、 iconのカラーとして使用
  pointerColor?: string
  pointerSize?: number
  zIndex?: string
  hoveringExpansionRatio?: number
  hoveringBorderWidth?: number
  scoped?: boolean // shadowRootを使うかどうか
  targetSelectorsDataName?: string
  hoveringIconName?: string
  hoveringIconAnimationName?: string
}
