import { PropsWithChildren } from 'react'

export function Title(props: PropsWithChildren) {
  return (
    <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold text-slate-800 text-pretty max-w-3xl_">
      {props.children}
    </h1>
  )
}