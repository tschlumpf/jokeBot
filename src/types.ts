export type ApiConfig = {
  name: string,
  url: string,
  property?: string // property within the answer which contains the joke
}

export type DenyAllowList = {
  type: "allow" | "deny" | "disabled",
  ids: number[]
}