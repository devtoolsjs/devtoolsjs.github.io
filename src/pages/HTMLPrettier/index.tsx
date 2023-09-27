import CodeEditor from '@/components/CodeEditor'
import { useState } from 'react'
import * as prettier from 'prettier'
import * as html from 'prettier/plugins/html'
import useWindowSize from '@/hooks/useWindowSize'
import css from './index.module.less'
import { useNavigate } from 'react-router-dom'

export default function HTMLPrettier() {
  const [value, setValue] = useState('')
  const size = useWindowSize()
  const navigate = useNavigate()

  return (
    <div>
      <div className={css.actions}>
        <button
          onClick={() => {
            prettier
              .format(value, {
                parser: 'html',
                plugins: [html]
              })
              .then((res) => {
                setValue(res)
                console.log(res)
              })
          }}
        >
          Beautify HTML
        </button>
        <button
          onClick={() => {
            if (value) {
              const ok = window.confirm('Back to home?')
              if (ok) {
                navigate('/')
              }
            } else {
              navigate('/')
            }
          }}
        >
          Back to home
        </button>

        <span>{value.length} chars</span>
      </div>
      <div className={css.editor}>
        <CodeEditor
          lang="html"
          value={value}
          onChange={setValue}
          height={size.height - 41}
        />
      </div>
    </div>
  )
}
