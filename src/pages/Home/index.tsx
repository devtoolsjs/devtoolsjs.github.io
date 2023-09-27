import { Link } from 'react-router-dom'
import css from './index.module.less'

export default function Home() {
  return (
    <div className={css.page}>
      <h1>Devtools for Web Development</h1>
      <ul>
        <li>
          <Link to="/html/prettier">HTML Prettier</Link>
        </li>
      </ul>
    </div>
  )
}
