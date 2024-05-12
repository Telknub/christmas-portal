import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import React, { useEffect, useState } from "react";
import { Modal } from "components/ui/Modal";
import levelIcon from "assets/icons/level_up.png";

import { BumpkinParts } from "lib/utils/tokenUriBuilder";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { getBumpkinLevel } from "features/game/lib/level";
import { BumpkinLevel } from "features/bumpkins/components/BumpkinModal";
import { SUNNYSIDE } from "assets/sunnyside";
import { PlayerTrade } from "./PlayerTrade";
import { GameState } from "features/game/types/game";
import { useAppTranslation } from "lib/i18n/useAppTranslations";
import { Label } from "components/ui/Label";

type Player = {
  id: number;
  clothing: BumpkinParts;
  experience: number;
};

class PlayerModalManager {
  private listener?: (player: Player) => void;

  public open(player: Player) {
    if (this.listener) {
      this.listener(player);
    }
  }

  public listen(cb: (player: Player) => void) {
    this.listener = cb;
  }
}

export const playerModalManager = new PlayerModalManager();

const PlayerDetails: React.FC<{ player: Player }> = ({ player }) => {
  const { t } = useAppTranslation();

  return (
    <>
      <div className="flex items-center ml-1 mt-2 mb-4">
        <img
          src={levelIcon}
          style={{
            width: `${PIXEL_SCALE * 10}px`,
            marginRight: `${PIXEL_SCALE * 4}px`,
          }}
        />
        <div>
          <p className="text-base">
            {t("lvl")} {getBumpkinLevel(player?.experience ?? 0)}
          </p>
          {/* Progress bar */}
          <BumpkinLevel experience={player?.experience} />
        </div>

        {player?.id && (
          <div className="flex-auto self-start text-right text-xs mr-3 f-10">
            {"#"}
            {player?.id}
          </div>
        )}
      </div>
    </>
  );
};

const PlayerGift: React.FC<{ player: Player }> = ({ player }) => {
  const { t } = useAppTranslation();

  return (
    <>
      <div className="flex items-center ml-1 mt-2 mb-4">
        <div className="flex justify-between items-center">
          <Label type="success" icon={giftIcon}>
            Giver giver
          </Label>
          <Label type="default" icon={SUNNYSIDE.icons.player}>
            {player.id}
          </Label>
        </div>
        <div>
          <p className="text-sm">
            Congratulations, you discovered a gift giver!
          </p>
          <p className="text-sm">
            Each day you can claim a free prize from them.
          </p>
        </div>
      </div>
    </>
  );
};
interface Props {
  game: GameState;
}

export const PlayerModals: React.FC<Props> = ({ game }) => {
  const [tab, setTab] = useState(0);
  const [player, setPlayer] = useState<Player>();
  const { t } = useAppTranslation();

  useEffect(() => {
    playerModalManager.listen((npc) => {
      setTab(0);
      setPlayer(npc);
    });
  }, []);

  const closeModal = () => {
    setPlayer(undefined);
  };

  const playerHasGift = player?.clothing.hat === "Gift Giver";

  return (
    <>
      <Modal
        // dialogClassName="npc-dialog"
        show={!!player}
        onHide={closeModal}
      >
        <CloseButtonPanel
          onClose={closeModal}
          bumpkinParts={player?.clothing}
          currentTab={tab}
          setCurrentTab={setTab}
          tabs={[
            {
              icon: SUNNYSIDE.icons.player,
              name: "Player",
            },
            {
              icon: SUNNYSIDE.icons.heart,
              name: "Trades",
            },
          ]}
        >
          {tab === 0 &&
            (playerHasGift ? (
              <PlayerGift player={player} />
            ) : (
              <PlayerDetails player={player} />
            ))}
          {tab === 1 && (
            <PlayerTrade onClose={closeModal} farmId={player?.id as number} />
          )}
        </CloseButtonPanel>
      </Modal>
    </>
  );
};
