import CodeMirror from '@uiw/react-codemirror'
import type { ViewUpdate } from '@uiw/react-codemirror'
import { useMemo } from 'react'
import { json } from '@codemirror/lang-json'
import { javascript } from '@codemirror/lang-javascript'
import { html } from '@codemirror/lang-html'
import classNames from 'classnames'
import css from './index.module.less'

export interface Props {
  className?: string
  lang?: 'ts' | 'json' | 'html'
  value?: string
  onChange?: (value: string, viewUpdate: ViewUpdate) => void
  height?: number
  readOnly?: boolean
}

export default function CodeEditor({
  className,
  lang,
  value,
  onChange,
  height,
  readOnly
}: Props) {
  const extensions = useMemo(() => {
    if (lang === 'html') {
      return [html()]
    }

    if (lang === 'json') {
      return [json()]
    }

    return [javascript({ typescript: true })]
  }, [lang])

  return (
    <CodeMirror
      className={classNames(css.editor, className)}
      value={value}
      extensions={extensions}
      onChange={onChange}
      height={`${height || 400}px`}
      readOnly={readOnly}
    />
  )
}
