import { NPC_WEARABLES } from "lib/npcs";
import React, { useContext, useState } from "react";
import { SpeakingModal } from "features/game/components/SpeakingModal";
import { translate } from "lib/i18n/translate";
import { MachineState } from "features/game/lib/gameMachine";
import { Context } from "features/game/GameProvider";
import { useSelector } from "@xstate/react";
import { useRandomItem } from "lib/utils/hooks/useRandomItem";
import { FlowerBounties } from "./FlowerBounties";

const desiredFlowerDialogues = (desiredFlowerName: string) => [
  `${translate("flowerShop.desired.dreaming", {
    desiredFlowerName: desiredFlowerName,
  })}`,
  `${translate("flowerShop.desired.delightful", {
    desiredFlowerName: desiredFlowerName,
  })}`,
  `${translate("flowerShop.desired.wonderful", {
    desiredFlowerName: desiredFlowerName,
  })}`,
  `${translate("flowerShop.desired.setMyHeart", {
    desiredFlowerName: desiredFlowerName,
  })}`,
];

const _flowerShop = (state: MachineState) => state.context.state.flowerShop;

interface Props {
  onClose: () => void;
}
export const FlowerShop: React.FC<Props> = ({ onClose }) => {
  const { gameService } = useContext(Context);
  const flowerShop = useSelector(gameService, _flowerShop);

  const desiredFlowerDialogue = useRandomItem(
    desiredFlowerDialogues(flowerShop?.weeklyFlower ?? "Flower"),
  );

  const [confirmAction, setConfirmAction] = useState(false);

  if (flowerShop === undefined) {
    return (
      <SpeakingModal
        onClose={onClose}
        bumpkinParts={NPC_WEARABLES.poppy}
        message={[
          {
            text: `${translate("flowerShop.noFlowers.noTrade")}`,
            actions: [
              {
                text: "Close",
                cb: () => onClose(),
              },
            ],
          },
        ]}
      />
    );
  }

  if (!confirmAction) {
    return (
      <SpeakingModal
        onClose={onClose}
        bumpkinParts={NPC_WEARABLES.poppy}
        message={[
          {
            text: desiredFlowerDialogue,
          },
          {
            text: `${translate("flowerShop.do.have.trade", {
              desiredFlower: flowerShop.weeklyFlower,
            })}`,

            actions: [
              {
                text: "Close",
                cb: () => onClose(),
              },
              {
                text: "Trade",
                cb: () => setConfirmAction(true),
              },
            ],
          },
        ]}
      />
    );
  }
  return <FlowerBounties onClose={onClose} />;
};
