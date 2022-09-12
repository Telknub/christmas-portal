import chicken from "assets/announcements/chickens.gif";
import nugget from "assets/announcements/nugget.gif";
import nomad from "assets/announcements/nomad.gif";
import cakes from "assets/announcements/cakes.png";
import rooster from "assets/announcements/rooster.png";
import shovel from "assets/announcements/shovel.png";
import warWeekOne from "assets/announcements/war_week_1.png";
import warWeekTwo from "assets/announcements/war_week_two.png";
import warTent from "assets/announcements/war_tent.png";

export interface Announcement {
  date: Date;
  image?: string;
  title: string;
  notes: string[];
  link?: string;
  type?: "war";
}

/**
 * Announcements are shown in game after the `date`.
 */
export const ANNOUNCEMENTS: Announcement[] = [
  {
    date: new Date("2022-09-12T00:00:00"),
    title: "The woods for the trees",
    notes: [
      "War is big business and requires a lot of land.",
      "We need to cut down the Forrest to the south, this will provide ample room for our soldiers to train and prepare.",
      "We have negotiated a deal with the local blacksmith who can help you with a much better rate on the items you need.",
    ],
    link: "https://docs.sunflower-land.com/fundamentals/special-events/goblin-war",
    image: warWeekTwo,
    type: "war",
  },
  {
    date: new Date("2022-09-08T00:00:00"),
    title: "The war tent opens!",
    notes: [
      "The war tent is now open",
      "Visit Goblin Village to view the available rare items.",
      "Each week new limited edition items will become available.",
    ],
    link: "https://docs.sunflower-land.com/fundamentals/special-events/goblin-war",
    image: warTent,
    type: "war",
  },
  {
    date: new Date("2022-09-05T00:00:00"),
    title: "The war begins",
    notes: [
      "All this talk of war makes me hungry.",
      "If we are going to survive the next few weeks we better prepare some food for ourselves and the troops.",
      "These rations will need to last us for at least 10 weeks",
      "Visit the war collectors and see what food is needed",
    ],
    link: "https://docs.sunflower-land.com/fundamentals/special-events/goblin-war",
    image: warWeekOne,
    type: "war",
  },
  {
    date: new Date("2022-07-21T00:00:00"),
    title: "Shovel",
    notes: [
      "The shovel is now available!",
      "Use it to remove unwanted crops.",
      "Double tap crops to remove them.",
      "Craft it at the Blacksmith.",
    ],
    link: "https://docs.sunflower-land.com/player-guides/crop-farming#tools",
    image: shovel,
  },
  {
    date: new Date("2022-07-04T00:00:00"),
    title: "Rooster",
    notes: [
      "The rooster is now available!",
      "Doubles the chance of dropping a mutant chicken.",
      "Craft it at Goblin Village.",
    ],
    link: "https://docs.sunflower-land.com/player-guides/rare-and-limited-items#boosts-1",
    image: rooster,
  },
  {
    date: new Date("2022-06-26T23:57:05.618Z"),
    title: "Cakes",
    notes: [
      "Craft a new cake weekly!",
      "Collect them all!",
      "Will you win the great bake off?",
    ],
    link: "https://docs.sunflower-land.com/fundamentals/special-events/the-great-sunflower-bakeoff",
    image: cakes,
  },
  {
    date: new Date("2022-06-22T06:27:20.861Z"),
    title: "Traveling Salesman",
    notes: [
      "Find weekly offers.",
      "Trade resources for items.",
      "What will be the next offer?",
    ],
    link: "https://docs.sunflower-land.com/fundamentals/special-events/traveling-salesman",
    image: nomad,
  },
  {
    date: new Date("Mon, 20 Jun 2022 22:30:00 GMT"),
    title: "Nugget is open for crafting!",
    notes: [
      "Gives a 25% increase to Gold Mines.",
      "Price: 50 Gold, 300 SFL",
      "Supply: 1000",
    ],
    link: "https://docs.sunflower-land.com/player-guides/rare-and-limited-items#boosts",
    image: nugget,
  },
  {
    date: new Date(
      "Tue Jun 01 2022 10:06:50 GMT-0300 (Brasilia Standard Time)"
    ),
    title: "Chickens",
    notes: [
      "Craft chickens at the Barn.",
      "Feed chickens wheat and collect eggs.",
      "Craft a rare Chicken Coop to grow your egg empire.",
      "Will you be lucky enough to find a mutant chicken in an egg?",
    ],
    link: "https://docs.sunflower-land.com/player-guides/raising-animals/chickens",
    image: chicken,
  },
];
