import type { ReactNode } from "react"

export function ResourceCard({
  title,
  description,
  href,
  children,
  external = true,
}: {
  title: string
  description: string
  href: string
  children?: ReactNode
  external?: boolean
}) {
  const className =
    "group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-zinc-600 hover:bg-zinc-900"
  const content = (
    <>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-zinc-400">{description}</p>
      {children}
      <span className="mt-3 text-sm font-medium text-white/80 group-hover:text-white">
        {external ? "Open link →" : "Go →"}
      </span>
    </>
  )
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    )
  }
  return (
    <a href={href} className={className}>
      {content}
    </a>
  )
}
