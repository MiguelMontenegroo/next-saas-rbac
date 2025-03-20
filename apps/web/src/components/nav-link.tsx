'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentProps } from "react"


export function NavLink(props: ComponentProps<typeof Link>) {
  const pathname = usePathname()

  const isCurrent = props.href.toString() === pathname
 
  return <Link data-current={isCurrent} {...props} />
}