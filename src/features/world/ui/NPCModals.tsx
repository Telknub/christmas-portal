import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { SpeakingModal } from "features/game/components/SpeakingModal";
import { NPCName, NPC_WEARABLES } from "lib/npcs";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Sofia } from "./dawn/Sofia";
import { Bella } from "./dawn/Bella";
import { CommunityIslands } from "./community/CommunityIslands";
import { DecorationShopItems } from "features/helios/components/decorations/component/DecorationShopItems";
import { WanderLeaf } from "./dawn/WanderLeaf";
import { DeliveryPanel } from "./deliveries/DeliveryPanel";
import { HeliosBlacksmithItems } from "features/helios/components/blacksmith/component/HeliosBlacksmithItems";
import { SUNNYSIDE } from "assets/sunnyside";
import { DeliveryPanelContent } from "./deliveries/DeliveryPanelContent";

class NpcModalManager {
  private listener?: (npc: NPCName, isOpen: boolean) => void;

  public open(npc: NPCName) {
    if (this.listener) {
      this.listener(npc, true);
    }
  }

  public listen(cb: (npc: NPCName, isOpen: boolean) => void) {
    this.listener = cb;
  }
}

export const npcModalManager = new NpcModalManager();

interface Props {
  onClose: () => void;
  onOpen: () => void;
}

export const NPCModals: React.FC<Props> = ({ onClose, onOpen }) => {
  const [npc, setNpc] = useState<NPCName>();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    npcModalManager.listen((npc, open) => {
      setNpc(npc);
      setTimeout(onOpen, 100); // Lag the pause of movement to give natural effect
    });
  }, []);

  const closeModal = () => {
    setNpc(undefined);
    setTab(0);
    onClose();
  };

  return (
    <>
      <Modal
        // dialogClassName="npc-dialog"
        show={!!npc}
        centered
        onHide={closeModal}
      >
        {npc === "sofia" && <Sofia onClose={closeModal} />}
        {npc === "bella" && <Bella onClose={closeModal} />}
        {npc === "wanderleaf" && <WanderLeaf onClose={closeModal} />}
        {npc === "frankie" && <DecorationShopItems onClose={closeModal} />}
        {npc === "stella" && (
          <CloseButtonPanel
            onClose={closeModal}
            bumpkinParts={NPC_WEARABLES.stella}
          >
            <div className="p-2">
              <p className="mb-2">Coming soon... </p>
            </div>
          </CloseButtonPanel>
        )}
        {npc === "grubnuk" && (
          <CloseButtonPanel
            onClose={closeModal}
            bumpkinParts={NPC_WEARABLES.grubnuk}
            tabs={[
              { icon: SUNNYSIDE.icons.heart, name: "Community Island" },
              { icon: SUNNYSIDE.icons.expression_chat, name: "Delivery" },
            ]}
            setCurrentTab={setTab}
            currentTab={tab}
          >
            {tab === 0 && <CommunityIslands />}
            {tab === 1 && (
              <DeliveryPanelContent npc={npc} onClose={closeModal} />
            )}
          </CloseButtonPanel>
        )}

        {npc === "hammerin' harry" && (
          <SpeakingModal
            onClose={closeModal}
            bumpkinParts={NPC_WEARABLES["hammerin' harry"]}
            message={[
              { text: "Gather round Bumpkins, an auction is about to begin." },
            ]}
          />
        )}
        {npc === "marcus" && (
          <SpeakingModal
            onClose={closeModal}
            bumpkinParts={NPC_WEARABLES["marcus"]}
            message={[
              {
                text: "Hey! You are not allowed to go in my house. Don't you dare touch my things!",
              },
            ]}
          />
        )}
        {npc === "craig" && (
          <CloseButtonPanel
            onClose={closeModal}
            bumpkinParts={NPC_WEARABLES.craig}
          >
            <div className="p-2">
              <p className="mb-2">Why are you looking at me strange?</p>
              <p className="mb-2">Is there something in my teeth...</p>
            </div>
          </CloseButtonPanel>
        )}
        {npc === "gabi" && (
          <CloseButtonPanel
            onClose={closeModal}
            bumpkinParts={NPC_WEARABLES.gabi}
          >
            <div className="p-2">
              <p className="mb-2">Oi Bumpkin!</p>
              <p className="mb-2">
                You look creative, have you ever thought about contributing art
                to the game?
              </p>
            </div>
          </CloseButtonPanel>
        )}
        {/* Delivery NPC's */}
        {npc === "pumpkin' pete" && (
          <DeliveryPanel npc={npc} onClose={closeModal} />
        )}
        {npc === "blacksmith" && (
          <CloseButtonPanel
            onClose={closeModal}
            bumpkinParts={NPC_WEARABLES.blacksmith}
            tabs={[
              { icon: SUNNYSIDE.icons.hammer, name: "Craft" },
              { icon: SUNNYSIDE.icons.expression_chat, name: "Delivery" },
            ]}
            setCurrentTab={setTab}
            currentTab={tab}
          >
            {tab === 0 && <HeliosBlacksmithItems />}
            {tab === 1 && (
              <DeliveryPanelContent npc={npc} onClose={closeModal} />
            )}
          </CloseButtonPanel>
        )}
        {npc === "raven" && <DeliveryPanel npc={npc} onClose={closeModal} />}
        {npc === "tywin" && <DeliveryPanel npc={npc} onClose={closeModal} />}
        {npc === "grimbly" && <DeliveryPanel npc={npc} onClose={closeModal} />}
        {npc === "grimtooth" && (
          <DeliveryPanel npc={npc} onClose={closeModal} />
        )}
        {npc === "bert" && <DeliveryPanel npc={npc} onClose={closeModal} />}
        {npc === "timmy" && <DeliveryPanel npc={npc} onClose={closeModal} />}
        {npc === "old salty" && (
          <DeliveryPanel npc={npc} onClose={closeModal} />
        )}
        {npc === "betty" && <DeliveryPanel npc={npc} onClose={closeModal} />}
        {npc === "cornwell" && <DeliveryPanel npc={npc} onClose={closeModal} />}
      </Modal>
    </>
  );
};
