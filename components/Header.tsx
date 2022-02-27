import Menu from './Menu'

export default function Header() {
  return (
    <header className="flex justify-between">
      <div className="flex space-x-8">
        <h1>Site Title</h1>
        <aside>Description</aside>
      </div>
      <Menu />
    </header>
  )
}
