import { nanoid } from 'nanoid';

export type Burger = {
  id:    string
  name:  string
  url:   string
  price: number
}

let cheese: Burger = {
  id: nanoid(),
  name: "Cheese",
  url: "/images/burger1.png",
  price: 16000
}

let big: Burger = {
  id: nanoid(),
  name: 'Big Burger',
  url: '/images/burger1.png',
  price: 36_000
}

export const burgers: Burger[] = [ 
  cheese, 
  big
]