import getMenuBySlug from '@/lib/api/queries/getMenuBySlug'

export default async function Header() {
  const menu = await getMenuBySlug('header')

  return (
    <header>
      <div>
        <h1 className="mb-0">Next.js WordPress</h1>
        <p>It&apos;s Headless WordPress</p>
      </div>
      <nav className="flex justify-between gap-4">
        {!!menu &&
          menu.menuItems.edges.map((item) => (
            <a key={item.node.databaseId} href={item.node.uri}>
              {item.node.label}
            </a>
          ))}
      </nav>
    </header>
  )
}
