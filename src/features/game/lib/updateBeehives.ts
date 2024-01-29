/* eslint-disable no-console */
import cloneDeep from "lodash.clonedeep";
import { Beehive, Beehives, FlowerBeds } from "../types/game";
import { getKeys } from "../types/craftables";
import { FLOWERS, FLOWER_SEEDS } from "../types/flowers";

/**
 * updateBeehives runs on any event that changes the state for bees or flowers
 * e.g.
 * flower.planted, flower.harvested
 * beehive.placed, beehive.harvested, beehive.removed
 *
 * The update forecasts and allocates flowers to beehives so that bees are able to
 * autonomously switch beehives and continue producing while the player is offline.
 */

export const HONEY_PRODUCTION_TIME = 24 * 60 * 60 * 1000;

interface GetFlowerDetail {
  flowerId: string;
  beehives: Beehives;
  flowerBeds: FlowerBeds;
  createdAt: number;
}

interface GetBeehiveDetail {
  beehive: Beehive;
  createdAt: number;
}

interface CalculateFlowerDetails {
  beehives: Beehives;
  flowerBeds: FlowerBeds;
  createdAt: number;
}

interface CalculateHiveDetails {
  beehives: Beehives;
  createdAt: number;
}

interface RemoveInactiveFlowers {
  beehives: Beehives;
  createdAt: number;
}

interface AttachFlowers {
  beehives: Beehives;
  flowerBeds: FlowerBeds;
  createdAt: number;
}

interface UpdateBeehives {
  beehives: Beehives;
  flowerBeds: FlowerBeds;
  createdAt: number;
}

type BeehiveDetail = {
  beehiveAvailableAt: number;
  availableTime: number;
};

type FlowerDetail = {
  flowerAvailableAt: number;
  availableTime: number;
};

const getFlowerReadyAt = (flowerId: string, flowerBeds: FlowerBeds) => {
  const plantedFlower = flowerBeds[flowerId].flower;

  if (!plantedFlower) {
    console.error(
      `Unexpected! Flower ${flowerId} does not exist when calculating ready time.`
    );
    return 0;
  }

  const plantMilliseconds =
    FLOWER_SEEDS()[FLOWERS[plantedFlower.name].seed].plantSeconds * 1000;

  return plantedFlower.plantedAt + plantMilliseconds;
};

const updateProducedHoney = ({
  beehives,
  flowerBeds,
  createdAt,
}: UpdateBeehives) => {
  const beehivesCopy = cloneDeep(beehives);

  getKeys(beehivesCopy).forEach((hiveId) => {
    const hive = beehivesCopy[hiveId];
    const attachedFlowers = hive.flowers.sort(
      (a, b) => a.attachedAt - b.attachedAt
    );

    attachedFlowers.forEach((attachedFlower, i) => {
      const plantedFlower = flowerBeds[attachedFlower.id].flower;

      if (!plantedFlower) {
        console.error(
          `Unexpected! Flower ${attachedFlower.id} does not exist, but is attached to a beehive ${hiveId}.`
        );
        return;
      }

      const start = Math.max(hive.honey.updatedAt, attachedFlower.attachedAt);
      const end = Math.min(createdAt, attachedFlower.attachedUntil);

      // Prevent future dates
      const honey = Math.max(end - start, 0);

      hive.honey.produced += honey;

      if (hive.honey.produced >= HONEY_PRODUCTION_TIME) {
        hive.flowers.splice(i, 1);
      }
    });

    hive.honey.updatedAt = createdAt;
  });

  return beehivesCopy;
};

const removeInactiveFlowers = ({
  beehives,
  createdAt,
}: RemoveInactiveFlowers) => {
  const beehivesCopy = cloneDeep(beehives);

  getKeys(beehivesCopy).forEach((hiveId) => {
    const hive = beehivesCopy[hiveId];
    hive.flowers = hive.flowers.filter(
      (flower) =>
        flower.attachedAt <= createdAt && flower.attachedUntil > createdAt
    );
  });

  return beehivesCopy;
};

const getFlowerDetail = ({
  flowerId,
  flowerBeds,
  beehives,
  createdAt,
}: GetFlowerDetail): FlowerDetail => {
  const attachments = getKeys(beehives).flatMap((beehiveId) =>
    beehives[beehiveId].flowers.map((flower) => ({
      beehiveId,
      flowerId: flower.id,
      attachedAt: flower.attachedAt,
      attachedUntil: flower.attachedUntil,
    }))
  );

  const flowerAttachment = attachments
    .filter((attachment) => attachment.flowerId === flowerId)
    .sort((a, b) => b.attachedAt - a.attachedAt)[0];

  const flowerReadyAt = getFlowerReadyAt(flowerId, flowerBeds);

  if (!flowerAttachment) {
    return {
      flowerAvailableAt: createdAt,
      availableTime: Math.max(0, flowerReadyAt - createdAt),
    };
  }

  return {
    flowerAvailableAt: flowerAttachment.attachedUntil,
    availableTime: Math.max(0, flowerReadyAt - flowerAttachment.attachedUntil),
  };
};

const calculateFlowerDetails = ({
  flowerBeds,
  beehives,
  createdAt,
}: CalculateFlowerDetails): Record<string, FlowerDetail> => {
  return getKeys(flowerBeds).reduce(
    (flowerDetails, flowerId) => ({
      ...flowerDetails,
      [flowerId]: getFlowerDetail({
        flowerId,
        flowerBeds,
        beehives,
        createdAt,
      }),
    }),
    {}
  );
};

const getBeehiveDetail = ({
  beehive,
  createdAt,
}: GetBeehiveDetail): BeehiveDetail => {
  const produced = beehive.flowers.reduce(
    (honey, flower) => honey + flower.attachedUntil - flower.attachedAt,
    beehive.honey.produced
  );
  const lastAttachment = beehive.flowers.sort(
    (a, b) => b.attachedUntil - a.attachedUntil
  )[0];

  return {
    beehiveAvailableAt: lastAttachment
      ? lastAttachment.attachedUntil
      : createdAt,
    availableTime: HONEY_PRODUCTION_TIME - produced,
  };
};

const calculateHiveDetails = ({
  beehives,
  createdAt,
}: CalculateHiveDetails): Record<string, BeehiveDetail> => {
  return getKeys(beehives).reduce(
    (hiveDetails, beeHiveId) => ({
      ...hiveDetails,
      [beeHiveId]: getBeehiveDetail({
        beehive: beehives[beeHiveId],
        createdAt,
      }),
    }),
    {}
  );
};

const attachFlowers = ({ beehives, flowerBeds, createdAt }: AttachFlowers) => {
  const beehivesCopy = cloneDeep(beehives);

  let flowerDetails = calculateFlowerDetails({
    beehives,
    flowerBeds,
    createdAt,
  });
  let hiveDetails = calculateHiveDetails({ beehives, createdAt });

  // eslint-disable-next-line no-constant-condition
  while (true) {
    flowerDetails = Object.fromEntries(
      Object.entries(flowerDetails).filter(
        ([, flowerDetail]) => flowerDetail.availableTime > 0
      )
    );
    hiveDetails = Object.fromEntries(
      Object.entries(hiveDetails).filter(
        ([, hiveDetail]) => hiveDetail.availableTime > 0
      )
    );

    const flower = Object.entries(flowerDetails).sort(
      (a, b) => a[1].flowerAvailableAt - b[1].flowerAvailableAt
    )[0];

    const hive = Object.entries(hiveDetails).sort(
      (a, b) => a[1].beehiveAvailableAt - b[1].beehiveAvailableAt
    )[0];

    // Nothing more to be done
    if (!flower || !hive) break;

    const [flowerId, flowerDetail] = flower;
    const [hiveId, hiveDetail] = hive;

    const attachedAt = Math.max(
      hiveDetail.beehiveAvailableAt,
      flowerDetail.flowerAvailableAt
    );
    const attachedUntil =
      attachedAt +
      Math.min(hiveDetail.availableTime, flowerDetail.availableTime);

    // Attach to hive
    beehivesCopy[hiveId].flowers.push({
      attachedAt,
      attachedUntil,
      id: flowerId,
    });

    // Update flowerDetails
    flowerDetails[flowerId].availableTime -= attachedUntil - attachedAt;
    flowerDetails[flowerId].flowerAvailableAt = attachedUntil;
    hiveDetails[hiveId].availableTime -= attachedUntil - attachedAt;
    hiveDetails[hiveId].beehiveAvailableAt = attachedUntil;
  }

  return beehivesCopy;
};

export function updateBeehives({
  beehives,
  flowerBeds,
  createdAt,
}: UpdateBeehives) {
  let beehivesCopy = updateProducedHoney({ beehives, flowerBeds, createdAt });
  beehivesCopy = removeInactiveFlowers({
    beehives: beehivesCopy,
    createdAt,
  });
  beehivesCopy = attachFlowers({
    beehives: beehivesCopy,
    flowerBeds,
    createdAt,
  });

  return beehivesCopy;
}
