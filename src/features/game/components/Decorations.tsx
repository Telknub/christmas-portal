/**
 * Placeholder for future decorations that will fall on a different grid
 */
import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Spritesheet, {
  SpriteSheetInstance,
} from "components/animation/SpriteAnimator";

import close from "assets/icons/close.png";

import sunflowerRock from "assets/nfts/sunflower_rock.png";
import sunflowerTombstone from "assets/nfts/sunflower_tombstone.png";
import sunflowerStatue from "assets/nfts/sunflower_statue.png";
import potatoStatue from "assets/nfts/potato_statue.png";
import christmasTree from "assets/nfts/christmas_tree.png";
import dog from "assets/nfts/farm_dog.gif";
import cat from "assets/nfts/farm_cat.gif";
import gnome from "assets/nfts/gnome.gif";
import nancy from "assets/nfts/nancy.png";
import scarecrow from "assets/nfts/scarecrow.png";
import kuebiko from "assets/nfts/kuebiko.gif";
import goblinKing from "assets/nfts/goblin_king.png";
import fountain from "assets/nfts/fountain.gif";
import goldenBonsai from "assets/nfts/golden_bonsai.png";
import rooster from "assets/nfts/rooster.gif";
import pottedSunflower from "assets/decorations/potted_sunflower.png";
import wickerManFire from "assets/nfts/wicker_man_fire.png";

import nyonStatue from "assets/nfts/nyon_statue.png";
import mysteriousHead from "assets/nfts/mysterious_head.png";
import homelessTent from "assets/nfts/homeless_tent.png";
import farmerBath from "assets/nfts/farmer_bath.png";
import swimmer from "assets/npcs/swimmer.gif";

import beaver from "assets/nfts/beaver.gif";
import apprentice from "assets/nfts/apprentice_beaver.gif";
import foreman from "assets/nfts/construction_beaver.gif";

import tunnelMole from "assets/nfts/tunnel_mole.gif";
import rockyMole from "assets/nfts/rocky_mole.gif";
import nugget from "assets/nfts/nugget.gif";

import easterBunny from "assets/nfts/easter/easter_bunny_eggs.gif";
import observatory from "assets/nfts/mom/observatory.gif";

import golemSheet from "assets/nfts/rock_golem.png";

import { GRID_WIDTH_PX, PIXEL_SCALE } from "../lib/constants";
import { Section } from "lib/utils/hooks/useScrollIntoView";
import { Flags } from "./Flags";
import { GameState, Inventory } from "../types/game";
import { Panel } from "components/ui/Panel";
import { fountainAudio, burningSound } from "lib/utils/sfx";
import { Sign } from "./Sign";
import { canMine } from "../events/stoneMine";
import { VipArea } from "./Vip";

// Only show 1 scarecrow at a time
export const Scarecrows: React.FC<{ inventory: Inventory }> = ({
  inventory,
}) => {
  if (inventory.Kuebiko) {
    return (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 2}px`,
        }}
        src={kuebiko}
        alt="Scarecrow"
      />
    );
  }

  if (inventory.Scarecrow) {
    return (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 1.3}px`,
        }}
        src={scarecrow}
        alt="Scarecrow"
      />
    );
  }

  if (inventory.Nancy) {
    return (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 1.2}px`,
        }}
        src={nancy}
        alt="Scarecrow"
      />
    );
  }

  return null;
};

export const Beavers: React.FC<{ inventory: Inventory }> = ({ inventory }) => {
  const [showModal, setShowModal] = useState(false);
  if (inventory["Foreman Beaver"]) {
    return (
      <>
        <img
          style={{
            width: `${GRID_WIDTH_PX * 1.2}px`,
          }}
          className="hover:img-highlight cursor-pointer"
          src={foreman}
          alt="Foreman Beaver"
          onClick={() => setShowModal(true)}
        />
        <Modal centered show={showModal} onHide={() => setShowModal(false)}>
          <Panel>
            <img
              src={close}
              className="h-6 top-4 right-4 absolute cursor-pointer"
              onClick={() => setShowModal(false)}
            />
            <div className="flex flex-col items-center justify-center m-2">
              <img src={foreman} alt="Foreman Beaver" className="w-1/3" />
              <span className="text-shadow mt-2 block text-center">
                Have you got any radishes?
              </span>
            </div>
          </Panel>
        </Modal>
      </>
    );
  }

  if (inventory["Apprentice Beaver"]) {
    return (
      <>
        <img
          style={{
            width: `${GRID_WIDTH_PX * 1.2}px`,
          }}
          src={apprentice}
          alt="Apprentice Beaver"
          className="hover:img-highlight cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <Modal centered show={showModal} onHide={() => setShowModal(false)}>
          <Panel>
            <img
              src={close}
              className="h-6 top-4 right-4 absolute cursor-pointer"
              onClick={() => setShowModal(false)}
            />
            <div className="flex flex-col items-center justify-center m-2">
              <img src={apprentice} alt="Apprentice Beaver" className="w-1/3" />
              <span className="text-shadow mt-2 block text-center">
                Have you got any radishes?
              </span>
            </div>
          </Panel>
        </Modal>
      </>
    );
  }

  if (inventory["Woody the Beaver"]) {
    return (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 1.2}px`,
        }}
        src={beaver}
        alt="Woody the Beaver"
      />
    );
  }

  return null;
};

export const Moles: React.FC<{ inventory: Inventory }> = ({ inventory }) => {
  const [showModal, setShowModal] = useState(false);

  if (inventory["Nugget"]) {
    return (
      <>
        <img
          style={{
            width: `${GRID_WIDTH_PX * 1.52}px`,
          }}
          src={nugget}
          alt="Nugget"
          className="hover:img-highlight cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <Modal centered show={showModal} onHide={() => setShowModal(false)}>
          <Panel>
            <img
              src={close}
              className="h-6 top-4 right-4 absolute cursor-pointer"
              onClick={() => setShowModal(false)}
            />
            <div className="flex flex-col items-center justify-center m-2">
              <img src={nugget} alt="Nugget" className="w-1/3" />
              <span className="text-shadow text-sm mt-2 block text-center">
                One day my father ate 300 Pumpkins. Afterwards, he had so much
                energy that he dug an entire valley!
              </span>
            </div>
          </Panel>
        </Modal>
      </>
    );
  }

  if (inventory["Rocky the Mole"]) {
    return (
      <>
        <img
          style={{
            width: `${GRID_WIDTH_PX * 1.52}px`,
          }}
          src={rockyMole}
          alt="Rocky the Mole"
          className="hover:img-highlight cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <Modal centered show={showModal} onHide={() => setShowModal(false)}>
          <Panel>
            <img
              src={close}
              className="h-6 top-4 right-4 absolute cursor-pointer"
              onClick={() => setShowModal(false)}
            />
            <div className="flex flex-col items-center justify-center m-2">
              <img src={rockyMole} alt="Rocky the Mole" className="w-1/3" />
              <span className="text-shadow text-sm mt-2 block text-center">
                One day my father ate 300 Pumpkins. Afterwards, he had so much
                energy that he dug an entire valley!
              </span>
            </div>
          </Panel>
        </Modal>
      </>
    );
  }

  if (inventory["Tunnel Mole"]) {
    return (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 1.52}px`,
        }}
        src={tunnelMole}
        alt="Tunnel Mole"
      />
    );
  }

  return null;
};

// Only show 1 Nyon statue at a time
export const NyonStatue: React.FC = () => {
  const [showNyonLore, setShowNyonLore] = useState(false);

  return (
    <>
      <img
        style={{
          width: `${GRID_WIDTH_PX * 1.8}px`,
        }}
        className="hover:img-highlight cursor-pointer"
        src={nyonStatue}
        alt="Nyon Statue"
        onClick={() => setShowNyonLore(true)}
      />
      <Modal centered show={showNyonLore} onHide={() => setShowNyonLore(false)}>
        <Panel>
          <img
            src={close}
            className="h-6 top-4 right-4 absolute cursor-pointer"
            onClick={() => setShowNyonLore(false)}
          />
          <div className="flex flex-col items-cetner justify-content-between">
            <div className="flex justify-content m-2">
              <img
                style={{
                  width: `${GRID_WIDTH_PX * 1.5}px`,
                }}
                className="img-highlight mr-2"
                src={nyonStatue}
                alt="Nyon Statue"
              />
              <div className="ml-2 mt-3">
                <span className="text-shadow text-xs block">In memory of</span>
                <span className="text-shadow block">Nyon Lann</span>
              </div>
            </div>
            <div className="flex-1 ml-2 mr-2">
              <span className="text-shadow block mb-2 text-xs">
                The legendary knight responsible for clearing the goblins from
                the mines. Shortly after his victory he died by poisoning from a
                Goblin conspirator. The Sunflower Citizens erected this statue
                with his armor to commemorate his conquests.
              </span>
            </div>
          </div>
        </Panel>
      </Modal>
    </>
  );
};

interface RockGolemProps {
  state: GameState;
}

export const RockGolem: React.FC<RockGolemProps> = ({ state }) => {
  const stone = state.stones[2];

  const golemGif = useRef<SpriteSheetInstance>();
  const golemClosingGif = useRef<SpriteSheetInstance>();

  const canMineRock = canMine(stone);

  return (
    <>
      {canMineRock ? (
        <Spritesheet
          key="standing"
          className="group-hover:img-highlight pointer-events-none transform z-10"
          style={{
            width: `${GRID_WIDTH_PX * 5}px`,
            imageRendering: "pixelated",
          }}
          getInstance={(spritesheet) => {
            golemGif.current = spritesheet;
          }}
          image={golemSheet}
          widthFrame={34}
          heightFrame={42}
          fps={6}
          steps={38}
          endAt={8}
          direction={`forward`}
          autoplay={true}
          loop={true}
        />
      ) : (
        <Spritesheet
          key="closing"
          className="group-hover:img-highlight pointer-events-none transform z-10"
          style={{
            width: `${GRID_WIDTH_PX * 5}px`,
            imageRendering: "pixelated",
          }}
          getInstance={(spritesheet) => {
            golemClosingGif.current = spritesheet;
          }}
          image={golemSheet}
          widthFrame={34}
          heightFrame={42}
          fps={10}
          startAt={8}
          endAt={23}
          steps={38}
          direction={`forward`}
          autoplay={true}
          loop={false}
        />
      )}
    </>
  );
};

interface Props {
  state: GameState;
}

const WickerManAnimation: React.FC = () => {
  const wickerManGif = useRef<SpriteSheetInstance>();
  const containerRef = useRef<HTMLDivElement>(null);

  const burn = () => {
    const isPlaying = wickerManGif.current?.getInfo("isPlaying");

    if (!isPlaying) {
      burningSound.play();
      wickerManGif.current?.goToAndPlay(0);
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute cursor-pointer hover:img-highlight z-10"
      onClick={burn}
      style={{
        width: `${PIXEL_SCALE * 19}px`,
        height: `${PIXEL_SCALE * 25}px`,
        left: `${GRID_WIDTH_PX * 82}px`,
        top: `${GRID_WIDTH_PX * 21}px`,
      }}
      id={Section["Wicker Man"]}
    >
      <Spritesheet
        className="absolute group-hover:img-highlight pointer-events-none z-10"
        style={{
          imageRendering: "pixelated",
          left: `-73%`,
          bottom: `1px`,
          width: `${PIXEL_SCALE * 44}px`,
        }}
        getInstance={(spritesheet) => {
          wickerManGif.current = spritesheet;
        }}
        image={wickerManFire}
        widthFrame={48}
        heightFrame={58}
        fps={12}
        endAt={32}
        steps={32}
        direction={`forward`}
        autoplay={false}
        loop={true}
        onLoopComplete={(spritesheet) => {
          spritesheet.pause();
        }}
      />
    </div>
  );
};

export const Decorations: React.FC<Props> = ({ state }) => (
  <div className="z-10 absolute left-0 right-0">
    <VipArea inventory={state.inventory} />
    <Flags state={state} />
    {state.inventory["Sunflower Rock"] && (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 4}px`,
          right: `${GRID_WIDTH_PX * 11.5}px`,
          top: `${GRID_WIDTH_PX * 22}px`,
        }}
        id={Section["Sunflower Rock"]}
        className="absolute"
        src={sunflowerRock}
        alt="Sunflower rock"
      />
    )}

    {state.inventory["Christmas Tree"] && (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 2}px`,
          right: `${GRID_WIDTH_PX * 16}px`,
          top: `${GRID_WIDTH_PX * 1}px`,
        }}
        id={Section["Christmas Tree"]}
        className="absolute"
        src={christmasTree}
        alt="Christmas Tree"
      />
    )}

    {state.inventory["Sunflower Statue"] && (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 2}px`,
          left: `${GRID_WIDTH_PX * 45.5}px`,
          top: `${GRID_WIDTH_PX * 32}px`,
        }}
        id={Section["Sunflower Statue"]}
        className="absolute"
        src={sunflowerStatue}
        alt="Sunflower Statue"
      />
    )}

    {state.inventory["Potato Statue"] && (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 1.5}px`,
          left: `${GRID_WIDTH_PX * 52}px`,
          top: `${GRID_WIDTH_PX * 39}px`,
        }}
        id={Section["Potato Statue"]}
        className="absolute"
        src={potatoStatue}
        alt="Potato Statue"
      />
    )}

    {state.inventory["Sunflower Tombstone"] && (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 1}px`,
          left: `${GRID_WIDTH_PX * 30}px`,
          top: `${GRID_WIDTH_PX * 36.8}px`,
        }}
        id={Section["Sunflower Tombstone"]}
        className="absolute"
        src={sunflowerTombstone}
        alt="Sunflower tombstone"
      />
    )}

    {state.inventory["Farm Cat"] && (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 1.5}px`,
          right: `${GRID_WIDTH_PX * 39.55}px`,
          top: `${GRID_WIDTH_PX * 28.2}px`,
        }}
        id={Section["Farm Cat"]}
        className="absolute z-10"
        src={cat}
        alt="Farm cat"
      />
    )}

    {state.inventory["Farm Dog"] && (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 1}px`,
          right: `${GRID_WIDTH_PX * 37.8}px`,
          top: `${GRID_WIDTH_PX * 32}px`,
        }}
        id={Section["Farm Dog"]}
        className="absolute"
        src={dog}
        alt="Farm dog"
      />
    )}

    {state.inventory["Gnome"] && (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 1}px`,
          right: "481px",
          top: "441px",
        }}
        id={Section.Gnome}
        className="absolute"
        src={gnome}
        alt="Gnome"
      />
    )}
    {/* Scarecrows */}
    <div
      className="flex justify-center absolute"
      style={{
        width: `${GRID_WIDTH_PX * 3}px`,
        left: `${GRID_WIDTH_PX * 38}px`,
        top: `${GRID_WIDTH_PX * 34}px`,
      }}
      id={Section.Scarecrow}
    >
      <Scarecrows inventory={state.inventory} />
    </div>

    {state.inventory["Nyon Statue"] && (
      <div
        className="flex justify-center absolute"
        style={{
          width: `${GRID_WIDTH_PX * 3}px`,
          left: `${GRID_WIDTH_PX * 42.5}px`,
          top: `${GRID_WIDTH_PX * 41}px`,
        }}
        id={Section["Nyon Statue"]}
      >
        <NyonStatue />
      </div>
    )}

    {state.inventory["Fountain"] && (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 2.5}px`,
          left: `${GRID_WIDTH_PX * 35}px`,
          top: `${GRID_WIDTH_PX * 28}px`,
        }}
        id={Section.Fountain}
        onClick={() => {
          //Checks if fountainAudio is playing, if false, plays the sound
          if (!fountainAudio.playing()) {
            fountainAudio.play();
          }
        }}
        className="absolute hover:img-highlight cursor-pointer"
        src={fountain}
        alt="Fountain"
      />
    )}

    {state.inventory["Goblin Crown"] && (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 3}px`,
          right: `${GRID_WIDTH_PX * 27.5}px`,
          top: `${GRID_WIDTH_PX * 92.5}px`,
        }}
        id={Section["Goblin Crown"]}
        className="absolute"
        src={goblinKing}
        alt="GoblinKing"
      />
    )}

    {/* Beavers */}
    <div
      className="flex justify-center absolute"
      style={{
        width: `${GRID_WIDTH_PX * 2}px`,
        right: `${GRID_WIDTH_PX * 24}px`,
        top: `${GRID_WIDTH_PX * 49}px`,
      }}
      id={Section.Beaver}
    >
      <Beavers inventory={state.inventory} />
    </div>

    {state.inventory["Homeless Tent"] && (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 2}px`,
          right: `${GRID_WIDTH_PX * 34.5}px`,
          top: `${GRID_WIDTH_PX * 31}px`,
        }}
        id={Section.Tent}
        className="absolute"
        src={homelessTent}
        alt="Homeless Tent"
      />
    )}

    <Sign id={state.id as number} inventory={state.inventory} />

    {state.inventory["Farmer Bath"] && (
      <div
        className="flex justify-center absolute"
        style={{
          width: `${GRID_WIDTH_PX * 2}px`,
          left: `${GRID_WIDTH_PX * 48.8}px`,
          top: `${GRID_WIDTH_PX * 39}px`,
        }}
        id={Section.Bath}
      >
        <img src={farmerBath} className="w-full" />
        <img
          src={swimmer}
          style={{
            position: "absolute",
            width: `${GRID_WIDTH_PX * 0.85}px`,
            top: `${GRID_WIDTH_PX * 0.5}px`,
            left: `${GRID_WIDTH_PX * 0.5}px`,
          }}
        />
      </div>
    )}
    {!state.inventory["Farmer Bath"] && (
      <img
        src={swimmer}
        className="absolute"
        style={{
          width: `${GRID_WIDTH_PX * 0.85}px`,
          left: `${GRID_WIDTH_PX * 84.798}px`,
          top: `${GRID_WIDTH_PX * 44.859}px`,
          transform: "scaleX(-1)",
        }}
      />
    )}
    {state.inventory["Easter Bunny"] && (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 2.5}px`,
          right: `${GRID_WIDTH_PX * 49}px`,
          top: `${GRID_WIDTH_PX * 24}px`,
        }}
        id={Section["Easter Bunny"]}
        className="absolute"
        src={easterBunny}
        alt="Easter Bunny"
      />
    )}

    {state.inventory["Observatory"] && (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 2.75}px`,
          left: `${GRID_WIDTH_PX * 47.5}px`,
          top: `${GRID_WIDTH_PX * 1.2}px`,
        }}
        id={Section.Observatory}
        className="absolute"
        src={observatory}
        alt="Observatory"
      />
    )}

    {state.inventory["Mysterious Head"] && (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 1.85}px`,
          left: `${GRID_WIDTH_PX * 34.7}px`,
          top: `${GRID_WIDTH_PX * 40.2}px`,
        }}
        id={Section["Mysterious Head"]}
        className="absolute"
        src={mysteriousHead}
        alt="Mysterious Head"
      />
    )}

    {state.inventory["Golden Bonsai"] && (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 1.0952}px`,
          left: `${GRID_WIDTH_PX * 71.786}px`,
          top: `${GRID_WIDTH_PX * 37.95}px`,
        }}
        id={Section["Golden Bonsai"]}
        className="absolute"
        src={goldenBonsai}
        alt="Golden Bonsai"
      />
    )}

    {!state.inventory["Golden Bonsai"] && (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 0.75}px`,
          left: `${GRID_WIDTH_PX * 72.12}px`,
          top: `${GRID_WIDTH_PX * 37.81}px`,
        }}
        className="absolute"
        src={pottedSunflower}
        alt="Potted Sunflower"
      />
    )}

    {state.inventory["Wicker Man"] && <WickerManAnimation />}

    {/* Moles */}

    <div
      className="flex justify-center absolute"
      style={{
        width: `${GRID_WIDTH_PX * 2}px`,
        right: `${GRID_WIDTH_PX * 21.5}px`,
        top: `${GRID_WIDTH_PX * 50.4}px`,
      }}
      id={Section.Mole}
    >
      <Moles inventory={state.inventory} />
    </div>

    {state.inventory["Rock Golem"] && (
      <div
        className="flex justify-center absolute"
        style={{
          width: `${GRID_WIDTH_PX * 2.2}px`,
          left: `${GRID_WIDTH_PX * 87.6}px`,
          top: `${GRID_WIDTH_PX * 52.7}px`,
        }}
        id={Section["Rock Golem"]}
      >
        <RockGolem state={state} />
      </div>
    )}

    {state.inventory["Rooster"] && (
      <img
        style={{
          width: `${GRID_WIDTH_PX * 0.71}px`,
          left: `${GRID_WIDTH_PX * 54.6}px`,
          top: `${GRID_WIDTH_PX * 15.7}px`,
        }}
        id={Section["Rooster"]}
        className="absolute"
        src={rooster}
        alt="Rooster"
      />
    )}
  </div>
);
