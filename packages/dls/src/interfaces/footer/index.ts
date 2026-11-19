export interface FooterLink {
  action?: 'openFeedback'
  external?: boolean
  href?: string
  label: string
}

export interface FooterColumn {
  links: FooterLink[]
  title: string
}
