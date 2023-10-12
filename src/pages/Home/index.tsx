import { Link } from 'react-router-dom'
import css from './index.module.less'

type Devtool = {
  title: string
  description: string
  path: string
}

const tools: Devtool[] = [
  {
    path: '/html/prettier',
    title: 'HTML Prettier',
    description: 'A tool to beautify HTML code.'
  }
  // {
  //   path: '/typescript/generator',
  //   title: 'TypeScript Generator',
  //   description: 'A tool to convert JSON object to TypeScript type declaration.'
  // }
]

export default function Home() {
  return (
    <div className={css.page}>
      <h1>Devtools</h1>
      <ul className={css.list}>
        {tools.map((tool) => (
          <li key={tool.path} className={css.item}>
            <Tool {...tool} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function Tool({ title, description, path }: Devtool) {
  return (
    <Link className={css.tool} to={path}>
      <h2>{title}</h2>
      <p>{description}</p>
    </Link>
  )
}