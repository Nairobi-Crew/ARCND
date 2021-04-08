export interface ILink {
  image?: string
  href: string
  name: string
  auth: boolean
}
export type MainProps = {
  items: ILink[]
  auth: boolean
}
