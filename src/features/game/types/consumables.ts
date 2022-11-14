import Decimal from "decimal.js-light";
import { BuildingName } from "./buildings";
import { Cake } from "./craftables";
import { Inventory } from "./game";

export type ConsumableName =
  | "Mashed Potato"
  | "Pumpkin Soup"
  | "Bumpkin Broth"
  | "Boiled Eggs"
  | "Mushroom Soup"
  | "Roast Veggies"
  | "Bumpkin Salad"
  | "Cauliflower Burger"
  | "Mushroom Jacket Potatoes"
  | "Goblin's Treat"
  | "Club Sandwich"
  | "Kale Stew"
  | "Pancakes"
  | "Kale & Mushroom Pie"
  | "Fermented Carrots"
  | "Sauerkraut"
  | "Blueberry Jam"
  | "Apple Pie"
  | "Orange Cake"
  | "Honey Cake"
  | "Sunflower Crunch"
  | Cake;

export type Consumable = {
  experience: number;
  name: ConsumableName;
  description: string;
  ingredients: Inventory;
  cookingSeconds: number;
  building: BuildingName;
  // SFL sell rate
  marketRate: number;
};

export const CONSUMABLES: Record<ConsumableName, Consumable> = {
  "Mashed Potato": {
    name: "Mashed Potato",
    description: "Boiled Eggss are always a good breakfast choice",
    experience: 3,
    building: "Fire Pit",
    cookingSeconds: 30,
    ingredients: {
      Potato: new Decimal(10),
    },
    marketRate: 10,
  },

  "Pumpkin Soup": {
    name: "Pumpkin Soup",
    description: "Boiled Eggss are always a good breakfast choice",
    experience: 24,
    building: "Fire Pit",
    cookingSeconds: 60 * 3,
    ingredients: {
      Pumpkin: new Decimal(10),
    },
    marketRate: 15,
  },

  "Bumpkin Broth": {
    name: "Bumpkin Broth",
    description: "A perfect broth for a cold day.",
    experience: 96,
    building: "Fire Pit",
    cookingSeconds: 60 * 10,
    ingredients: {
      Carrot: new Decimal(10),
      Cabbage: new Decimal(5),
    },
    marketRate: 25,
  },

  "Boiled Eggs": {
    name: "Boiled Eggs",
    description: "Boiled Eggss are always a good breakfast choice",
    experience: 44,
    building: "Fire Pit",
    cookingSeconds: 60 * 10,
    ingredients: {
      Egg: new Decimal(5),
    },
    marketRate: 50,
  },

  "Roast Veggies": {
    name: "Roast Veggies",
    description: "Even Goblin's need to eat their veggies!",
    experience: 226,
    building: "Kitchen",
    cookingSeconds: 60 * 10,
    ingredients: {
      Cauliflower: new Decimal(15),
      Carrot: new Decimal(10),
    },
    marketRate: 30,
  },

  "Bumpkin Salad": {
    name: "Bumpkin Salad",
    description: "Gotta keep your Bumpkin healthy!",
    experience: 440,
    building: "Kitchen",
    cookingSeconds: 60 * 20,
    ingredients: {
      Beetroot: new Decimal(20),
      Parsnip: new Decimal(10),
    },
    marketRate: 50,
  },

  "Goblin's Treat": {
    name: "Goblin's Treat",
    description: "Boiled Eggss are always a good breakfast choice",
    experience: 520,
    building: "Kitchen",
    cookingSeconds: 60 * 30,
    ingredients: {
      Pumpkin: new Decimal(10),
      Radish: new Decimal(20),
      Cabbage: new Decimal(10),
    },
    marketRate: 80,
  },

  "Cauliflower Burger": {
    name: "Cauliflower Burger",
    description: "Calling all cauliflower lovers!",
    experience: 420,
    building: "Kitchen",
    cookingSeconds: 60 * 30,
    ingredients: {
      Cauliflower: new Decimal(15),
      Wheat: new Decimal(5),
    },
    marketRate: 120,
  },

  Pancakes: {
    name: "Pancakes",
    description: "A great start to a Bumpkins day",
    experience: 480,
    building: "Kitchen",
    cookingSeconds: 60 * 20,
    ingredients: {
      Wheat: new Decimal(5),
      Honey: new Decimal(10),
    },
    marketRate: 10,
  },

  "Club Sandwich": {
    name: "Club Sandwich",
    description: "Filled with Carrots and Roasted Sunflower Seeds",
    experience: 320,
    building: "Kitchen",
    cookingSeconds: 60 * 20,
    ingredients: {
      Sunflower: new Decimal(100),
      Carrot: new Decimal(25),
      Wheat: new Decimal(5),
    },
    marketRate: 180,
  },

  "Sunflower Cake": {
    name: "Sunflower Cake",
    description: "Sunflower Cake",
    building: "Bakery",
    experience: 685,
    cookingSeconds: 60 * 180,
    ingredients: {
      Sunflower: new Decimal(1000),
      Wheat: new Decimal(10),
      Egg: new Decimal(10),
    },
    marketRate: 500,
  },
  "Potato Cake": {
    name: "Potato Cake",
    description: "Potato Cake",
    building: "Bakery",
    experience: 685,
    cookingSeconds: 60 * 180,
    ingredients: {
      Potato: new Decimal(500),
      Wheat: new Decimal(10),
      Egg: new Decimal(15),
    },
    marketRate: 450,
  },
  "Pumpkin Cake": {
    name: "Pumpkin Cake",
    description: "Pumpkin Cake",
    building: "Bakery",
    experience: 685,
    cookingSeconds: 60 * 180,
    ingredients: {
      Pumpkin: new Decimal(130),
      Wheat: new Decimal(10),
      Egg: new Decimal(15),
    },
    marketRate: 550,
  },
  "Carrot Cake": {
    name: "Carrot Cake",
    description: "Carrot Cake",
    building: "Bakery",
    experience: 685,
    cookingSeconds: 60 * 180,
    ingredients: {
      Carrot: new Decimal(120),
      Wheat: new Decimal(10),
      Egg: new Decimal(15),
    },
    marketRate: 400,
  },
  "Cabbage Cake": {
    name: "Cabbage Cake",
    description: "Cabbage Cake",
    building: "Bakery",
    experience: 685,
    cookingSeconds: 60 * 180,
    ingredients: {
      Cabbage: new Decimal(90),
      Wheat: new Decimal(10),
      Egg: new Decimal(15),
    },
    marketRate: 700,
  },
  "Beetroot Cake": {
    name: "Beetroot Cake",
    description: "Beetroot Cake",
    building: "Bakery",
    experience: 685,
    cookingSeconds: 60 * 180,
    ingredients: {
      Beetroot: new Decimal(100),
      Wheat: new Decimal(10),
      Egg: new Decimal(15),
    },
    marketRate: 700,
  },
  "Cauliflower Cake": {
    name: "Cauliflower Cake",
    description: "Cauliflower Cake",
    building: "Bakery",
    experience: 685,
    cookingSeconds: 60 * 180,
    ingredients: {
      Cauliflower: new Decimal(60),
      Wheat: new Decimal(10),
      Egg: new Decimal(15),
    },
    marketRate: 450,
  },
  "Parsnip Cake": {
    name: "Parsnip Cake",
    description: "Parsnip Cake",
    building: "Bakery",
    experience: 685,
    cookingSeconds: 60 * 180,
    ingredients: {
      Parsnip: new Decimal(45),
      Wheat: new Decimal(10),
      Egg: new Decimal(15),
    },
    marketRate: 525,
  },
  "Radish Cake": {
    name: "Radish Cake",
    description: "Radish Cake",
    building: "Bakery",
    experience: 685,
    cookingSeconds: 60 * 180,
    ingredients: {
      Radish: new Decimal(25),
      Wheat: new Decimal(10),
      Egg: new Decimal(15),
    },
    marketRate: 650,
  },
  "Wheat Cake": {
    name: "Wheat Cake",
    description: "Wheat Cake",
    building: "Bakery",
    experience: 685,
    cookingSeconds: 60 * 180,
    ingredients: {
      Wheat: new Decimal(35),
      Egg: new Decimal(15),
    },
    marketRate: 550,
  },
  "Apple Pie": {
    name: "Apple Pie",
    description: "Bumpkin Betty's famous recipe",
    building: "Bakery",
    experience: 720,
    cookingSeconds: 60 * 240,
    ingredients: {
      Apple: new Decimal(5),
      Wheat: new Decimal(10),
      Egg: new Decimal(10),
    },
    marketRate: 550,
  },
  "Blueberry Jam": {
    name: "Blueberry Jam",
    description: "Goblin's will do anything for this jam",
    building: "Deli",
    experience: 380,
    cookingSeconds: 60 * 24 * 60,
    ingredients: {
      Blueberry: new Decimal(5),
    },
    marketRate: 550,
  },
  "Fermented Carrots": {
    name: "Fermented Carrots",
    description: "Got a surplus of carrots?",
    building: "Deli",
    experience: 440,
    cookingSeconds: 60 * 24 * 60,
    ingredients: {
      Carrot: new Decimal(20),
    },
    marketRate: 550,
  },
  "Honey Cake": {
    name: "Honey Cake",
    description: "A scrumptious cake!",
    building: "Bakery",
    experience: 760,
    cookingSeconds: 60 * 240,
    ingredients: {
      Honey: new Decimal(10),
      Wheat: new Decimal(10),
      Egg: new Decimal(10),
    },
    marketRate: 550,
  },
  "Kale & Mushroom Pie": {
    name: "Kale & Mushroom Pie",
    description: "A traditional Saphiron recipe",
    building: "Bakery",
    cookingSeconds: 60 * 240,
    experience: 720,
    ingredients: {
      "Wild Mushroom": new Decimal(10),
      Kale: new Decimal(5),
      Wheat: new Decimal(5),
    },
    marketRate: 550,
  },
  "Kale Stew": {
    name: "Kale Stew",
    description: "A perfect Bumpkin Booster",
    building: "Fire Pit",
    cookingSeconds: 60 * 60,
    ingredients: {
      Kale: new Decimal(10),
    },
    experience: 144,
    marketRate: 350,
  },
  "Mushroom Jacket Potatoes": {
    name: "Mushroom Jacket Potatoes",
    description: "Cram them taters with what ya got!",
    building: "Kitchen",
    cookingSeconds: 10 * 60,
    experience: 240,
    ingredients: {
      "Wild Mushroom": new Decimal(10),
      Potato: new Decimal(5),
    },
    marketRate: 240,
  },
  "Mushroom Soup": {
    name: "Mushroom Soup",
    description: "Warm your Bumpkin's soul.",
    building: "Fire Pit",
    cookingSeconds: 10 * 60,
    experience: 56,
    ingredients: {
      "Wild Mushroom": new Decimal(5),
    },
    marketRate: 240,
  },
  "Orange Cake": {
    name: "Orange Cake",
    description: "Orange you glad we aren't cooking apples",
    building: "Bakery",
    cookingSeconds: 240 * 60,
    ingredients: {
      Orange: new Decimal(5),
      Egg: new Decimal(15),
      Wheat: new Decimal(10),
    },
    experience: 730,
    marketRate: 600,
  },
  "Sunflower Crunch": {
    name: "Sunflower Crunch",
    description: "Crunchy goodness. Try not to burn it.",
    building: "Kitchen",
    cookingSeconds: 30 * 60,
    experience: 120,
    ingredients: {
      Sunflower: new Decimal(300),
    },
    marketRate: 400,
  },
  Sauerkraut: {
    name: "Sauerkraut",
    description: "No more boring Cabbage!",
    building: "Deli",
    cookingSeconds: 24 * 60 * 60,
    experience: 480,
    ingredients: {
      Cabbage: new Decimal(20),
    },
    marketRate: 640,
  },
};
