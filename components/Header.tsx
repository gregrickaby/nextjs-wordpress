export default function Header({settings, menu}) {
  return (
    <header className="flex justify-between">
      <div className="flex space-x-8">
        <h1>{settings?.title}</h1>
        <aside>{settings?.description}</aside>
      </div>
      <nav>
        <ul className="flex space-x-8">
          {menu?.menuItems?.nodes?.map((menu, index) => (
            <li key={index}>
              <a href={menu?.path}>{menu?.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
