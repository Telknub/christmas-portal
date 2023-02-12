import { Bumpkin } from "./game";

export type ValentineFoodName =
  | "Mashed Potato"
  | "Pumpkin Soup"
  | "Bumpkin Broth"
  | "Kale Stew"
  | "Reindeer Carrot"
  | "Roast Veggies"
  | "Bumpkin Salad"
  | "Goblin's Treat"
  | "Cauliflower Burger"
  | "Club Sandwich";

export const VALENTINE_CONSUMABLES: ValentineFoodName[] = [
  "Bumpkin Salad",
  "Club Sandwich",
  "Reindeer Carrot",
  "Kale Stew",
  "Cauliflower Burger",
  "Bumpkin Salad",
  "Cauliflower Burger",
  "Cauliflower Burger",
  "Pumpkin Soup",
  "Club Sandwich",
  "Pumpkin Soup",
  "Reindeer Carrot",
  "Goblin's Treat",
  "Reindeer Carrot",
  "Bumpkin Salad",
  "Reindeer Carrot",
  "Cauliflower Burger",
  "Cauliflower Burger",
  "Goblin's Treat",
  "Roast Veggies",
  "Kale Stew",
  "Roast Veggies",
  "Mashed Potato",
  "Goblin's Treat",
  "Roast Veggies",
  "Goblin's Treat",
  "Club Sandwich",
  "Club Sandwich",
  "Roast Veggies",
  "Reindeer Carrot",
  "Bumpkin Salad",
  "Cauliflower Burger",
  "Mashed Potato",
  "Club Sandwich",
  "Mashed Potato",
  "Mashed Potato",
  "Roast Veggies",
  "Club Sandwich",
  "Bumpkin Broth",
  "Goblin's Treat",
  "Mashed Potato",
  "Reindeer Carrot",
  "Roast Veggies",
  "Pumpkin Soup",
  "Bumpkin Salad",
  "Cauliflower Burger",
  "Goblin's Treat",
  "Bumpkin Broth",
  "Mashed Potato",
  "Cauliflower Burger",
  "Roast Veggies",
  "Mashed Potato",
  "Club Sandwich",
  "Bumpkin Salad",
  "Roast Veggies",
  "Cauliflower Burger",
  "Roast Veggies",
  "Kale Stew",
  "Roast Veggies",
  "Reindeer Carrot",
  "Pumpkin Soup",
  "Bumpkin Salad",
  "Club Sandwich",
  "Reindeer Carrot",
  "Bumpkin Salad",
  "Cauliflower Burger",
  "Goblin's Treat",
  "Kale Stew",
  "Cauliflower Burger",
  "Bumpkin Salad",
  "Pumpkin Soup",
  "Roast Veggies",
  "Bumpkin Salad",
  "Reindeer Carrot",
  "Roast Veggies",
  "Bumpkin Broth",
  "Kale Stew",
  "Mashed Potato",
  "Bumpkin Salad",
  "Club Sandwich",
  "Kale Stew",
  "Roast Veggies",
  "Pumpkin Soup",
  "Mashed Potato",
  "Club Sandwich",
  "Goblin's Treat",
  "Pumpkin Soup",
  "Bumpkin Salad",
  "Cauliflower Burger",
  "Pumpkin Soup",
  "Goblin's Treat",
  "Reindeer Carrot",
  "Mashed Potato",
  "Pumpkin Soup",
  "Mashed Potato",
  "Pumpkin Soup",
  "Bumpkin Salad",
  "Club Sandwich",
  "Mashed Potato",
  "Bumpkin Salad",
];

export const getValentineFood = (bumpkin?: Bumpkin) => {
  const loveLettersCollected =
    bumpkin?.activity?.["Love Letter Collected"] || 0;
  return VALENTINE_CONSUMABLES[
    loveLettersCollected % VALENTINE_CONSUMABLES.length
  ];
};
