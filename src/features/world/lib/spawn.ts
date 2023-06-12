import { Coordinates } from "features/game/expansion/components/MapPlacement";
import { RoomId } from "../roomMachine";

type SpawnLocation = Record<
  RoomId,
  { default: Coordinates } & Partial<Record<RoomId, Coordinates>>
>;

export const SPAWNS: SpawnLocation = {
  plaza: {
    default: {
      x: 440,
      y: 440,
    },
    windmill_floor: {
      x: 420,
      y: 167,
    },
    auction_house: {
      x: 600,
      y: 300,
    },
    bert_home: {
      x: 760,
      y: 120,
    },
    timmy_home: {
      x: 660,
      y: 110,
    },
    betty_home: {
      x: 583,
      y: 123,
    },
    decorations_shop: {
      x: 793,
      y: 287,
    },
    igor_home: {
      x: 250,
      y: 175,
    },
    clothes_shop: {
      x: 264,
      y: 300,
    },
    woodlands: {
      x: 867,
      y: 142,
    },
  },
  auction_house: {
    default: {
      x: 170,
      y: 242,
    },
  },
  bert_home: {
    default: {
      x: 80,
      y: 140,
    },
  },
  betty_home: {
    default: {
      x: 80,
      y: 144,
    },
  },
  clothes_shop: {
    default: {
      x: 144,
      y: 245,
    },
  },
  decorations_shop: {
    default: {
      x: 81,
      y: 215,
    },
  },
  igor_home: {
    default: {
      x: 80,
      y: 195,
    },
  },
  timmy_home: {
    default: {
      x: 80,
      y: 144,
    },
  },
  windmill_floor: {
    default: {
      x: 80,
      y: 140,
    },
  },
  woodlands: {
    default: {
      x: 10,
      y: 290,
    },
  },
};
