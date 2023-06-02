import { SUNNYSIDE } from "assets/sunnyside";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { HeliosBlacksmithItems } from "features/helios/components/blacksmith/component/HeliosBlacksmithItems";
import { NPCName, NPC_WEARABLES } from "lib/npcs";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

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

type NpcModals = Partial<Record<NPCName, boolean>>;
export const NPCModals: React.FC = () => {
  const [npc, setNpc] = useState<NPCName>();

  useEffect(() => {
    npcModalManager.listen((npc, open) => {
      setNpc(npc);
    });
  }, []);

  return (
    <>
      <Modal centered show={!!npc} onHide={() => setNpc(undefined)}>
        {npc === "adam" && (
          <CloseButtonPanel
            onClose={() => setNpc(undefined)}
            bumpkinParts={NPC_WEARABLES.adam}
          >
            <div className="p-2">
              <p className="mb-2">Howdy farmer!</p>
              <p className="mb-2">Welcome to the Pumpkin Plaza.</p>
              <p className="mb-2">
                Here you can explore, trade & compete with other Bumpkins.
              </p>
            </div>
          </CloseButtonPanel>
        )}
        {npc === "stella" && (
          <CloseButtonPanel
            onClose={() => setNpc(undefined)}
            bumpkinParts={NPC_WEARABLES.stella}
          >
            <div className="p-2">
              <p className="mb-2">I am opening </p>
            </div>
          </CloseButtonPanel>
        )}
        {npc === "timmy" && (
          <CloseButtonPanel
            onClose={() => setNpc(undefined)}
            bumpkinParts={NPC_WEARABLES.timmy}
          >
            <div className="p-2">
              <p className="mb-2">Howdy Stranger!</p>
              <p className="mb-2">
                {`Whaaaaat....you've been to Sunflower Land?!?`}
              </p>
              <p className="mb-2">{`Huh, you don't look that old...`}</p>
            </div>
          </CloseButtonPanel>
        )}
        {npc === "lily" && (
          <CloseButtonPanel
            onClose={() => setNpc(undefined)}
            bumpkinParts={NPC_WEARABLES.lily}
          >
            <div className="p-2">
              <p className="mb-2">Mum told me not to talk to the Goblins...</p>
            </div>
          </CloseButtonPanel>
        )}
        {npc === "igor" && (
          <CloseButtonPanel
            onClose={() => setNpc(undefined)}
            bumpkinParts={NPC_WEARABLES.igor}
            tabs={[{ icon: SUNNYSIDE.icons.hammer, name: "Craft" }]}
          >
            <HeliosBlacksmithItems />
          </CloseButtonPanel>
        )}
        {npc === "hammerin' harry" && (
          <CloseButtonPanel
            onClose={() => setNpc(undefined)}
            bumpkinParts={NPC_WEARABLES.lily}
          >
            <div className="p-2">
              <p className="mb-2">
                Gather round Bumpkins, an auction is about to begin!
              </p>
            </div>
          </CloseButtonPanel>
        )}
        {npc === "grimbly" && (
          <CloseButtonPanel
            onClose={() => setNpc(undefined)}
            bumpkinParts={NPC_WEARABLES.grimbly}
          >
            <div className="p-2">
              <p className="mb-2">Aaccckkkk!</p>
            </div>
          </CloseButtonPanel>
        )}
        {npc === "grimtooth" && (
          <CloseButtonPanel
            onClose={() => setNpc(undefined)}
            bumpkinParts={NPC_WEARABLES.grimtooth}
          >
            <div className="p-2">
              <p className="mb-2">Aaaa</p>
            </div>
          </CloseButtonPanel>
        )}
        {npc === "craig" && (
          <CloseButtonPanel
            onClose={() => setNpc(undefined)}
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
            onClose={() => setNpc(undefined)}
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
      </Modal>
    </>
  );
};
