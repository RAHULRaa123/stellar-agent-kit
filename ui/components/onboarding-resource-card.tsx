import Link from "next/link"

export function OnboardingResourceCard({
  title,
  description,
  href,
  external = true,
}: {
  title: string
  description: string
  href: string
  external?: boolean
}) {
  const className =
    "group flex flex-col rounded-xl border border-white/10 bg-white/5 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-white/20 hover:bg-white/10"
  const content = (
    <>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-zinc-400">{description}</p>
      <span className="mt-3 text-sm font-medium text-white/80 group-hover:text-white">
        {external ? "Open link →" : "Go →"}
      </span>
    </>
  )
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  )
}
