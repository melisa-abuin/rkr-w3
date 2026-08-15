export interface NavRoute {
  label: string
  pathname: string
  url: string
  target: '_self' | '_blank'
  isNew: boolean
  method?: 'get' | 'post'
}
