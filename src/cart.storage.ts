export type Item = {
  id: string,
  name: string,
  price: number
}

export type Cart = {
  total: number,
  items: Item[]
}

let cartMap = new Map<string, Cart>()

export function addCart(username: string) {
  if (cartMap.has(username)) {
    return
  }
  
  let cart: Cart = {
    total: 0,
    items: []
  }

  cartMap.set(username, cart)
}

export function findCart(username: string) {
  return cartMap.get(username)!
}
