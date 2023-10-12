import JSON5 from 'json5'
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import CodeEditor from '@/components/CodeEditor'
import copyToClipboard from '@/utils/copyToClipboard'
import jsonToTypeScript from './jsonToTypeScript'
import css from './index.module.less'

export default function JSONToTypeScript() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<Error | null>(null)
  const [copied, setCopied] = useState(false)
  const refTimer = useRef<{ timerId: number | null }>({ timerId: null })

  const handleConvert = () => {
    if (input.trim()) {
      try {
        setOutput(jsonToTypeScript(JSON5.parse(input)))
        setError(null)
      } catch (err) {
        setError(err as any)
      }
    } else {
      setError(null)
      setOutput('')
    }
  }

  const handleCopy = () => {
    copyToClipboard(output).then(() => {
      setCopied(true)

      if (refTimer.current.timerId !== null) {
        clearTimeout(refTimer.current.timerId)
      }

      refTimer.current.timerId = setTimeout(() => {
        refTimer.current.timerId = null
        setCopied(false)
      }, 3000)
    })
  }

  return (
    <div className={css.page}>
      <h1>JSON to TypeScript</h1>
      <p>
        This tool will generate TypeScript type declaration code from your JSON
        object.
      </p>
      <p>Please input your JSON content into the following code editor:</p>
      <div className={css.editor}>
        <CodeEditor
          height={320}
          lang="json"
          value={input}
          onChange={setInput}
        />
      </div>
      <div className={css.actions}>
        <button onClick={handleConvert}>Convert to TypeScript</button>
        {!error && output ? (
          <button onClick={handleCopy}>
            {copied ? 'Copied to Clipboard' : 'Copy TypeScript to Clipboard'}
          </button>
        ) : null}
        <button
          onClick={() => {
            if (input) {
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
      </div>
      {!error && output ? (
        <div className={css.editor}>
          <CodeEditor
            height={320}
            lang="ts"
            value={output}
            onChange={setOutput}
          />
        </div>
      ) : null}

      {error && (
        <div className={css.error}>
          <b>Error: </b>
          <span className={css.errorMessage}>{error.message}</span>
        </div>
      )}
    </div>
  )
}
