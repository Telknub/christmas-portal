import { useActor } from "@xstate/react";
import { Context } from "features/game/GameProvider";
import { AuctioneerModal } from "features/retreat/components/auctioneer/AuctioneerModal";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PotionHouse } from "features/game/expansion/components/potions/PotionHouse";
import { hasFeatureAccess } from "lib/flags";
import fanArt from "assets/fanArt/dawn_breaker.png";
import { Donations } from "./donations/Donations";
import { Modal } from "react-bootstrap";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { Button } from "components/ui/Button";
import { SpeakingModal } from "features/game/components/SpeakingModal";
import { NPC_WEARABLES } from "lib/npcs";

type InteractableName =
  | "welcome_sign"
  | "plaza_statue"
  | "fan_art"
  | "auction_item"
  | "boat_modal"
  | "homeless_man"
  | "potion_table"
  | "fan_art_1"
  | "fan_art_2"
  | "dawn_book_1"
  | "dawn_book_2"
  | "dawn_book_3"
  | "dawn_book_4"
  | "betty_home"
  | "igor_home"
  | "windmill"
  | "guild_house"
  | "timmy_home"
  | "bert_home";

class InteractableModalManager {
  private listener?: (name: InteractableName, isOpen: boolean) => void;

  public open(name: InteractableName) {
    if (this.listener) {
      this.listener(name, true);
    }
  }

  public listen(cb: (name: InteractableName, isOpen: boolean) => void) {
    this.listener = cb;
  }
}

export const interactableModalManager = new InteractableModalManager();

interface Props {
  id: number;
  onClose: () => void;
  onOpen: () => void;
}
export const InteractableModals: React.FC<Props> = ({
  id,
  onOpen,
  onClose,
}) => {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);
  const {
    context: { state },
  } = gameState;

  const [interactable, setInteractable] = useState<InteractableName>();

  useEffect(() => {
    interactableModalManager.listen((interactable, open) => {
      setInteractable(interactable);
      onOpen();
    });
  }, []);

  const closeModal = () => {
    setInteractable(undefined);
    onClose();
  };

  const navigate = useNavigate();

  return (
    <>
      {/* TODO - make smoother opening */}
      {interactable === "auction_item" && (
        <AuctioneerModal
          isOpen={interactable === "auction_item"}
          onClose={closeModal}
          gameState={state}
          onUpdate={(state) => {
            console.log("Update hit!");
            gameService.send("UPDATE", { state });
          }}
          onMint={(id) => {
            console.log("Update hit!", gameState.value);
            setInteractable(undefined);
            gameService.send("MINT", { auctionId: id });
          }}
          deviceTrackerId={gameState.context.deviceTrackerId as string}
        />
      )}

      {interactable === "potion_table" &&
        hasFeatureAccess(state.inventory, "POTION_HOUSE") && <PotionHouse />}

      <Modal centered show={interactable === "boat_modal"} onHide={closeModal}>
        <CloseButtonPanel onClose={closeModal}>
          <div className="p-2">
            <p className="mb-3">Would you like to return home?</p>
          </div>
          <Button onClick={() => navigate(`/land/${id}`)}>Go home</Button>
        </CloseButtonPanel>
      </Modal>

      <Modal
        centered
        show={interactable === "homeless_man"}
        onHide={closeModal}
      >
        <CloseButtonPanel
          title="Want to support more events like this?!"
          onClose={closeModal}
        >
          <Donations />
        </CloseButtonPanel>
      </Modal>

      <Modal centered show={interactable === "fan_art_1"} onHide={closeModal}>
        <CloseButtonPanel onClose={closeModal} title="Congratulations">
          <div className="p-2">
            <p className="text-sm mb-2 text-center">
              Congratulations Palisman, the winner of the first Fan Art
              competition
            </p>
            <img src={fanArt} className="w-2/3 mx-auto rounded-lg" />
          </div>
        </CloseButtonPanel>
      </Modal>

      <Modal centered show={interactable === "fan_art_2"} onHide={closeModal}>
        <CloseButtonPanel onClose={closeModal}>
          <p className="text-sm">
            The perfect place to for a beautiful painting. I wonder what they
            will put here next...
          </p>
        </CloseButtonPanel>
      </Modal>

      <Modal centered show={interactable === "dawn_book_1"} onHide={closeModal}>
        <SpeakingModal
          onClose={closeModal}
          bumpkinParts={NPC_WEARABLES["marcus"]}
          message={[
            {
              text: "For centuries our family has protected Dawn Breaker Island. As the island's bell ringer, we've warned of dangers from the North, even as shadowy creatures threaten our home.",
            },
            {
              text: "Our family stands as the first line of defence against the darkness spreading from the North, but alas, our sacrifices go unnoticed.",
            },
            {
              text: "Will the day come when our devotion is acknowledged?",
            },
          ]}
        />
      </Modal>

      <Modal centered show={interactable === "dawn_book_2"} onHide={closeModal}>
        <SpeakingModal
          onClose={closeModal}
          bumpkinParts={NPC_WEARABLES["bella"]}
          message={[
            {
              text: "Eggplants, they're more than they appear. Despite their dark exterior that attracts shadowy creatures, they bring light to our dishes.",
            },
            {
              text: "Grilled or mashed into a baba ganoush, their versatility is unmatched. The nightshade vegetables are a symbol of our resilience in the face of adversity.",
            },
          ]}
        />
      </Modal>

      <Modal centered show={interactable === "dawn_book_3"} onHide={closeModal}>
        <SpeakingModal
          onClose={closeModal}
          bumpkinParts={NPC_WEARABLES["sofia"]}
          message={[
            {
              text: "Dear diary, the Bumpkins' arrival has brought a ray of hope. ",
            },
            {
              text: "I dream of the day I can steer my own boat to Sunfloria, the land where adventurers and travelers congregate.",
            },
            {
              text: "I've heard whispers about the Bumpkins' special preparations there - a beacon of promise in these challenging times.",
            },
          ]}
        />
      </Modal>

      <Modal centered show={interactable === "dawn_book_4"} onHide={closeModal}>
        <SpeakingModal
          onClose={closeModal}
          bumpkinParts={NPC_WEARABLES["marcus"]}
          message={[
            { text: "The gnomes, their allure was too potent to resist." },
            {
              text: "The Witch's instructions echoed in my mind - 'Align the three, and power shall be yours.'",
            },
            {
              text: "Alas, even the eggplant soldiers couldn't guard against the temptation. But I will not falter. One day, I will claim the power I rightfully deserve​.",
            },
          ]}
        />
      </Modal>

      <Modal centered show={interactable === "timmy_home"} onHide={closeModal}>
        <SpeakingModal
          onClose={closeModal}
          bumpkinParts={NPC_WEARABLES["timmy"]}
          message={[
            {
              text: "Oh, gee, I really want you to explore my house, but Mom told me not to talk to strangers, maybe it's for the best.",
            },
          ]}
        />
      </Modal>

      <Modal centered show={interactable === "windmill"} onHide={closeModal}>
        <SpeakingModal
          onClose={closeModal}
          bumpkinParts={NPC_WEARABLES["cornwell"]}
          message={[
            {
              text: "Ah, my windmill is under repair, can't have anyone snooping around while I fix it up, come back later.",
            },
          ]}
        />
      </Modal>

      <Modal centered show={interactable === "igor_home"} onHide={closeModal}>
        <SpeakingModal
          onClose={closeModal}
          bumpkinParts={NPC_WEARABLES["igor"]}
          message={[
            {
              text: "Get lost! I'm in no mood for visitors, especially nosy ones like you!",
            },
          ]}
        />
      </Modal>

      <Modal centered show={interactable === "guild_house"} onHide={closeModal}>
        <SpeakingModal
          onClose={closeModal}
          bumpkinParts={NPC_WEARABLES["pumpkin'pete"]}
          message={[
            {
              text: "This is my Guild House, and it's not ready for outsiders yet, gotta finish the preparations first.",
            },
          ]}
        />
      </Modal>

      <Modal centered show={interactable === "guild_house"} onHide={closeModal}>
        <SpeakingModal
          onClose={closeModal}
          bumpkinParts={NPC_WEARABLES["pumpkin'pete"]}
          message={[
            {
              text: "This is my Guild House, and it's not ready for outsiders yet, gotta finish the preparations first.",
            },
          ]}
        />
      </Modal>

      <Modal centered show={interactable === "betty_home"} onHide={closeModal}>
        <SpeakingModal
          onClose={closeModal}
          bumpkinParts={NPC_WEARABLES["betty"]}
          message={[
            {
              text: "Oh, sweetie, as much as I love my crops, my house is a private space, not open to visitors right now.",
            },
          ]}
        />
      </Modal>

      <Modal centered show={interactable === "bert_home"} onHide={closeModal}>
        <SpeakingModal
          onClose={closeModal}
          bumpkinParts={NPC_WEARABLES["bert"]}
          message={[
            {
              text: "Intruders! They must be after my collection of rare items and secrets, I can't let them in!",
            },
          ]}
        />
      </Modal>
    </>
  );

  {
    /* 

      {/* <Modal
        centered
        show={!!interactable}
        onHide={closeModal}
      >
        <CloseButtonPanel onClose={closeModal}>
          {interactable === "fan_art" && (
            <div className="p-2">
              <p className="mb-2">Have you submitted your fan art?</p>
              <p className="mb-2">1000 SFL in prizes to be won!</p>
              <a
                href="https://github.com/sunflower-land/sunflower-land/discussions/2553"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>
            </div>
          )}
        </CloseButtonPanel>
      </Modal> */
  }
};
