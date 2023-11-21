import { useCallback, useEffect, useRef, useState } from 'react'
import css from './index.module.less'

type Pos = {
  top: number
  left: number
  width: number
  height: number
}

type Area = {
  x: number
  y: number
  w: number
  h: number
}

export default function ImageMeasurer() {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)
  const [imageUrl, setImageUrl] = useState('') // https://zbanx-banker-image.oss-cn-chengdu.aliyuncs.com/web/smart/20231121142757/assets/0101-k3TnNBHH.png
  const [imageReady, setImageReady] = useState(false)
  const [area, setArea] = useState<Area>()
  const [pos, setPos] = useState<Pos>(() => {
    const initPos: Pos = { top: 10, left: 10, width: 100, height: 100 }

    try {
      const text = localStorage.getItem('ImageMeasurer:pos')
      if (text) {
        const p = JSON.parse(text) as Pos
        if (p && typeof p.width === 'number') {
          initPos.width = Math.min(window.innerWidth - 30, p.width)
        }
        if (p && typeof p.height === 'number') {
          initPos.height = Math.min(window.innerHeight - 30, p.height)
        }
      }
    } catch (e) {
      // nothing
    }

    return initPos
  })
  const ref = useRef({ pos, imageUrl, imageReady })

  ref.current.pos = pos

  const measure = useCallback(() => {
    const img = document.getElementById('ImageMeasurer_img')
    if (img) {
      const rect = img.getBoundingClientRect()
      const x = ref.current.pos.left - rect.x
      const y = ref.current.pos.top - rect.y
      setArea({
        x,
        y,
        w: ref.current.pos.width,
        h: ref.current.pos.height
      })
    }
  }, [ref])

  useEffect(() => {
    ref.current.pos = pos
    ref.current.imageReady = imageReady
    ref.current.imageUrl = imageUrl
    localStorage.setItem('ImageMeasurer:pos', JSON.stringify(pos))
    measure()
  }, [ref, pos, imageReady, imageUrl, measure])

  useEffect(() => {
    window.addEventListener('scroll', measure, false)
    return () => {
      window.removeEventListener('scroll', measure, false)
    }
  }, [measure])

  const onImageLoad = useCallback<React.ReactEventHandler<HTMLImageElement>>(
    (e) => {
      const img = e.target as HTMLImageElement
      setImageReady(true)
      setSize({
        w: img.width,
        h: img.height
      })
    },
    []
  )

  return (
    <>
      {imageUrl ? (
        <>
          <img
            id="ImageMeasurer_img"
            draggable={false}
            onLoad={onImageLoad}
            className={css.img}
            src={imageUrl}
            onDragStart={(e) => {
              e.preventDefault()
            }}
          />
          <div className={css.bottomBorder}></div>
        </>
      ) : (
        <ImagePicker onPicked={setImageUrl} />
      )}

      {imageReady ? (
        <>
          <Selector pos={pos} setPos={setPos} />
          <div className={css.toolbar}>
            <div>
              {size ? (
                <div>
                  Image size: {size.w} x {size.h}
                </div>
              ) : null}
            </div>
            {area ? (
              <div>
                Current Area: {'{'} x: {area.x}, y: {area.y}, w: {area.w}, h:{' '}
                {area.h} {'}'}
              </div>
            ) : null}
            <div className={css.grow}></div>
            <button
              onClick={() => {
                setImageReady(false)
                setImageUrl('')
              }}
            >
              Choose another image...
            </button>
          </div>
        </>
      ) : null}
    </>
  )
}

function Selector({
  pos,
  setPos
}: {
  pos: Pos
  setPos: React.Dispatch<React.SetStateAction<Pos>>
}) {
  const ref = useRef<{
    clear?: () => void
    pos: typeof pos
  }>({ pos })

  ref.current.pos = pos

  const nodeRef = useCallback(
    (div?: HTMLDivElement | null) => {
      ref.current.clear?.()
      ref.current.clear = undefined

      const addEvents = (node: HTMLDivElement) => {
        const info: {
          working: boolean
          action: string
          pos: typeof pos
          startX: number
          startY: number
        } = {
          working: false,
          action: '',
          pos: { ...ref.current.pos },
          startX: 0,
          startY: 0
        }

        const onMouseDown = (e: MouseEvent) => {
          e.preventDefault()
          e.stopPropagation()

          const div = e.target as HTMLDivElement
          const role = div.getAttribute('data-role')

          if (role && role !== 'border') {
            info.pos = { ...ref.current.pos }
            info.working = true
            info.startX = e.screenX
            info.startY = e.screenY
            info.action = role
          }
        }

        const update = (screenX: number, screenY: number) => {
          const movedX = screenX - info.startX
          const movedY = screenY - info.startY

          const w = node.offsetWidth
          const h = node.offsetHeight
          const winW = window.innerWidth
          const winH = window.innerHeight - 64

          if (info.action === 'drag') {
            let newTop = info.pos.top + movedY
            let newLeft = info.pos.left + movedX

            if (newTop < 0) {
              newTop = 0
            }

            if (newTop + h > winH) {
              newTop = winH - h
            }

            if (newLeft < 0) {
              newLeft = 0
            }

            if (newLeft + w > winW) {
              newLeft = winW - w
            }

            setPos((prev) => ({
              ...prev,
              top: newTop,
              left: newLeft
            }))
          }

          if (info.action === 'right') {
            let newWidth = info.pos.width + movedX

            if (newWidth < 12) {
              newWidth = 12
            }

            if (info.pos.left + newWidth > winW) {
              newWidth = winW - info.pos.left
            }

            setPos((prev) => ({
              ...prev,
              width: newWidth
            }))
          }

          if (info.action === 'bottom') {
            let newHeight = info.pos.height + movedY

            if (newHeight < 12) {
              newHeight = 12
            }

            if (info.pos.top + newHeight > winH) {
              newHeight = winH - info.pos.top
            }

            setPos((prev) => ({
              ...prev,
              height: newHeight
            }))
          }
        }

        const onMouseMove = (e: MouseEvent) => {
          if (info.working) {
            update(e.screenX, e.screenY)
          }
        }

        const onMouseUp = (e: MouseEvent) => {
          if (info.working) {
            update(e.screenX, e.screenY)
            info.working = false
          }
        }

        node.addEventListener('mousedown', onMouseDown, false)
        window.addEventListener('mousemove', onMouseMove, true)
        window.addEventListener('mouseup', onMouseUp, true)

        return () => {
          node.removeEventListener('mousedown', onMouseDown, false)
          window.removeEventListener('mousemove', onMouseMove, true)
          window.removeEventListener('mouseup', onMouseUp, true)
        }
      }

      if (div) {
        ref.current.clear = addEvents(div)
      }
    },
    [ref]
  )

  return (
    <div ref={nodeRef} className={css.selector} style={pos}>
      {/* <div data-role="top"></div> */}
      {/* <div data-role="left"></div> */}
      <div data-role="right"></div>
      <div data-role="bottom"></div>
      <div data-role="drag"></div>
      <div data-role="border"></div>
    </div>
  )
}

function ImagePicker({ onPicked }: { onPicked: (url: string) => void }) {
  return (
    <div className={css.picker}>
      <div>Please pick an image file:</div>
      <br />
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]

            if (file) {
              if (file.type.startsWith('image/')) {
                const url = URL.createObjectURL(file)
                onPicked(url)
              } else {
                alert('Please pick an image file')
              }
            }
          }}
        />
      </div>
    </div>
  )
}
