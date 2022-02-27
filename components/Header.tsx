import Menu from './Menu'
import {useWordPressContext} from './WordpressProvider'

export default function Header() {
  const {data} = useWordPressContext()

  return (
    <header className="flex justify-between">
      <div className="flex space-x-8">
        <h1>{data?.generalSettings?.title}</h1>
        <aside>{data?.generalSettings?.description}</aside>
      </div>
      <Menu />
    </header>
  )
}
