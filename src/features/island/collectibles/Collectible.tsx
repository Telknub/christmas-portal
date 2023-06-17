import React, { useContext, useState } from "react";

import { CollectibleName } from "features/game/types/craftables";
import { MysteriousHead } from "./components/MysteriousHead";
import { WarSkulls } from "./components/WarSkulls";
import { WarTombstone } from "./components/WarTombstone";
import { ChristmasTree } from "./components/ChristmasTree";
import { ApprenticeBeaver } from "./components/ApprenticeBeaver";
import { WoodyTheBeaver } from "./components/WoodyTheBeaver";
import { ForemanBeaver } from "./components/ForemanBeaver";
import { ChickenCoop } from "./components/ChickenCoop";
import { EasterBunny } from "./components/EasterBunny";
import { FarmCat } from "./components/FarmCat";
import { FarmDog } from "./components/FarmDog";
import { FarmerBath } from "./components/FarmerBath";
import { FatChicken } from "./components/FatChicken";
import { SpeedChicken } from "./components/SpeedChicken";
import { RichChicken } from "./components/RichChicken";
import { Rooster } from "./components/Rooster";
import { GoblinCrown } from "./components/GoblinCrown";
import { GoldEgg } from "./components/GoldEgg";
import { GoldenBonsai } from "./components/GoldenBonsai";
import { UndeadRooster } from "./components/UndeadRooster";
import { GoldenCauliflower } from "./components/GoldenCauliflower";
import { HomelessTent } from "./components/HomelessTent";
import { MysteriousParsnip } from "./components/MysteriousParsnip";
import { PotatoStatue } from "./components/PotatoStatue";
import { NyonStatue } from "./components/NyonStatue";
import { RockGolem } from "./components/RockGolem";
import { RockyTheMole } from "./components/RockyTheMole";
import { TunnelMole } from "./components/TunnelMole";
import { Nugget } from "./components/Nugget";
import { SunflowerRock } from "./components/SunflowerRock";
import { SunflowerStatue } from "./components/SunflowerStatue";
import { SunflowerTombstone } from "./components/SunflowerTombstone";
import { WickerMan } from "./components/WickerMan";
import { Fountain } from "./components/Fountain";
import { Gnome } from "./components/Gnome";
import { Nancy } from "./components/Nancy";
import { Scarecrow } from "./components/Scarecrow";
import { Kuebiko } from "./components/Kuebiko";
import { flags } from "./components/Flags";
import { CarrotSword } from "./components/CarrotSword";
import { WhiteTulips } from "./components/WhiteTulips";
import { PottedSunflower } from "./components/PottedSunflower";
import { Cactus } from "./components/Cactus";
import { BasicBear } from "./components/BasicBear";
import { CabbageBoy } from "./components/CabbageBoy";
import { CabbageGirl } from "./components/CabbageGirl";
import { PeeledPotato } from "./components/PeeledPotato";
import { WoodNymphWendy } from "./components/WoodNymphWendy";
import { ChefBear } from "./components/ChefBear";
import { ConstructionBear } from "./components/ConstructionBear";
import { AngelBear } from "./components/AngelBear";
import { DevilBear } from "./components/DevilBear";
import { BearTrap } from "./components/BearTrap";
import { BrilliantBear } from "./components/BrilliantBear";
import { ClassyBear } from "./components/ClassyBear";
import { FarmerBear } from "./components/FarmerBear";
import { RichBear } from "./components/RichBear";
import { SunflowerBear } from "./components/SunflowerBear";
import { BadassBear } from "./components/BadassBear";
import { VictoriaSisters } from "./components/VictoriaSisters";
import { TimeLeftPanel } from "components/ui/TimeLeftPanel";
import { Bar } from "components/ui/ProgressBar";
import useUiRefresher from "lib/utils/hooks/useUiRefresher";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { Bean } from "./components/Bean";
import { PottedPumpkin } from "features/island/collectibles/components/PottedPumpkin";
import { PottedPotato } from "features/island/collectibles/components/PottedPotato";
import { ChristmasBear } from "./components/ChristmasBear";
import { RainbowArtistBear } from "./components/RainbowArtistBear";
import { Observatory } from "./components/Observatory";
import { SnowGlobe } from "./components/SnowGlobe";
import { ImmortalPear } from "./components/ImmortalPear";
import { AyamCemani } from "./components/AyamCemani";
import { CollectibleBear } from "./components/CollectibleBear";
import { CyborgBear } from "./components/CyborgBear";
import { ManekiNeko } from "./components/ManekiNeko";
import { LadyBug } from "./components/LadyBug";
import { BlackBearry } from "./components/BlackBearry";
import { SquirrelMonkey } from "./components/SquirrelMonkey";
import { TikiTotem } from "./components/TikiTotem";
import { LunarCalendar } from "./components/LunarCalendar";
import { AbandonedBear } from "./components/AbandonedBear";
import { TurtleBear } from "./components/TurtleBear";
import { TRexSkull } from "./components/TRexSkull";
import { LifeguardBear } from "./components/LifeguardBear";
import { SnorkelBear } from "./components/SnorkelBear";
import { ParasaurSkull } from "./components/ParasaurSkull";
import { GoblinBear } from "./components/GoblinBear";
import { GoldenBearHead } from "./components/GoldenBearHead";
import { HumanBear } from "./components/HumanBear";
import { PirateBear } from "./components/PirateBear";
import { SunflowerCoin } from "./components/SunflowerCoin";
import { Galleon } from "./components/Galleon";
import { SkeletonKingStaff } from "./components/SkeletonKingStaff";
import { Foliant } from "./components/Foliant";
import { DinosaurBone } from "./components/DinosaurBone";
import { HeartOfDavyJones } from "./components/HeartOfDavyJones";
import { TreasureMap } from "./components/TreasureMap";
import { WhaleBear } from "./components/WhaleBear";
import { HeartBalloons } from "./components/HeartBalloons";
import { Flamingo } from "./components/Flamingo";
import { BlossomTree } from "./components/BlossomTree";
import { IronIdol } from "./components/IronIdol";
import { ValentineBear } from "./components/ValentineBear";
import { BeachBall } from "./components/BeachBall";
import { PalmTree } from "./components/PalmTree";
import { Karkinos } from "./components/Karkinos";
import { PabloBunny } from "features/island/collectibles/components/PabloBunny";
import { EasterBear } from "features/island/collectibles/components/EasterBear";
import { EasterBush } from "features/island/collectibles/components/EasterBush";
import { GiantCarrot } from "features/island/collectibles/components/GiantCarrot";
import { MushroomHouse } from "./components/MushroomHouse";
import { Bush } from "./components/Bush";
import { Shrub } from "./components/Shrub";
import { PineTree } from "./components/PineTree";
import { Fence } from "./components/Fence";
import { GameGrid } from "features/game/expansion/placeable/lib/makeGrid";
import { useSelector } from "@xstate/react";
import { MoveableComponent } from "./MovableComponent";
import { MachineState } from "features/game/lib/gameMachine";
import { Context } from "features/game/GameProvider";
import { DawnBreakerBanner } from "./components/DawnBreakerBanner";
import { SolarFlareBanner } from "./components/SolarFlareBanner";
import { HumanBanner } from "./components/HumanBanner";
import { GoblinBanner } from "./components/GoblinBanner";
import { ITEM_DETAILS } from "features/game/types/images";
import { BonniesTombstone } from "./components/BonniesTombstone";
import { ChestnutFungiStool } from "./components/ChestnutFungiStool";
import { CrimsonCap } from "./components/CrimsonCap";
import { DawnUmbreallSeat } from "./components/DawnUmbrellaSeat";
import { EggplantGrill } from "./components/EggplantGrill";
import { GiantDawnMushroom } from "./components/GiantDawnMushroom";
import { GrubnashTombstone } from "./components/GrubnashTombstone";
import { MahoganyCap } from "./components/MahoganyCap";
import { ShroomGlow } from "./components/ShroomGlow";
import { ToadstoolSeat } from "./components/ToadstoolSeat";
import { Clementine } from "./components/Clementine";
import { Cobalt } from "./components/Cobalt";
import { PurpleTrail } from "./components/PurpleTrail";
import { Obie } from "./components/Obie";
import { Maximus } from "./components/Maximus";
import { GenieLamp } from "./components/GenieLamp";
import { LuminousLantern } from "./components/LuminousLantern";
import { AuroraLantern } from "./components/AuroraLantern";
import { RadianceLantern } from "./components/RadianceLantern";
import { Hoot } from "./components/Hoot";
import { GenieBear } from "./components/GenieBear";
import { BasicScarecrow } from "./components/BasicScarecrow";
import lightning from "assets/icons/lightning.png";
import { EmeraldTurtle } from "./components/EmeraldTurtle";
import { TinTurtle } from "./components/TinTurtle";
import { StoneFence } from "./components/StoneFence";
import { FieldMaple } from "./components/FieldMaple";
import { GoldenMaple } from "./components/GoldenMaple";
import { RedMaple } from "./components/RedMaple";
import { OceanLantern } from "./components/OceanLantern";
import { BetaBear } from "./components/BetaBear";
import { SirGoldenSnout } from "./components/SirGoldenSnout";
import { Bale } from "./components/Bale";
import { InnerPanel } from "components/ui/Panel";
import classNames from "classnames";
import { hasRestriction } from "features/game/types/removeables";
import lockIcon from "assets/skills/lock.png";

export type CollectibleProps = {
  name: CollectibleName;
  id: string;
  readyAt: number;
  createdAt: number;
  x: number;
  y: number;
  grid: GameGrid;
};

type Props = CollectibleProps & {
  showTimers: boolean;
};

// TODO: Remove partial once all placeable treasures have been added (waiting on artwork)
export const COLLECTIBLE_COMPONENTS: Record<
  CollectibleName,
  React.FC<CollectibleProps>
> = {
  "Mysterious Head": MysteriousHead,
  "War Skull": WarSkulls,
  "War Tombstone": WarTombstone,
  "Christmas Tree": ChristmasTree,

  // Beavers
  "Woody the Beaver": WoodyTheBeaver,
  "Apprentice Beaver": ApprenticeBeaver,
  "Foreman Beaver": ForemanBeaver,

  "Chicken Coop": ChickenCoop,
  "Easter Bunny": EasterBunny,

  // Animals
  "Farm Cat": FarmCat,
  "Farm Dog": FarmDog,
  "Farmer Bath": FarmerBath,
  // Chickens
  "Fat Chicken": FatChicken,
  "Rich Chicken": RichChicken,
  "Speed Chicken": SpeedChicken,
  Rooster,
  "Undead Rooster": UndeadRooster,

  "Dirt Path": () => null,
  Fence: Fence,
  Bush: Bush,
  Shrub: Shrub,
  "Pine Tree": PineTree,
  "Field Maple": FieldMaple,
  "Red Maple": RedMaple,
  "Golden Maple": GoldenMaple,
  "Stone Fence": StoneFence,
  "Goblin Crown": GoblinCrown,
  "Gold Egg": GoldEgg,
  "Golden Bonsai": GoldenBonsai,
  "Golden Cauliflower": GoldenCauliflower,
  "Homeless Tent": HomelessTent,
  "Mysterious Parsnip": MysteriousParsnip,
  "Potato Statue": PotatoStatue,
  "Nyon Statue": NyonStatue,
  "Rock Golem": RockGolem,
  "Cabbage Boy": CabbageBoy,
  "Cabbage Girl": CabbageGirl,
  "Peeled Potato": PeeledPotato,
  "Wood Nymph Wendy": WoodNymphWendy,

  // Moles
  "Rocky the Mole": RockyTheMole,
  "Tunnel Mole": TunnelMole,
  Nugget,

  "Sunflower Rock": SunflowerRock,
  "Sunflower Statue": SunflowerStatue,
  "Sunflower Tombstone": SunflowerTombstone,
  "Wicker Man": WickerMan,
  Fountain,
  Gnome,

  // Scarecrows
  Nancy,
  Scarecrow,
  Kuebiko,

  // AoE
  "Basic Scarecrow": BasicScarecrow,
  "Emerald Turtle": EmeraldTurtle,
  "Tin Turtle": TinTurtle,
  Bale: Bale,

  "Carrot Sword": CarrotSword,

  // Flags
  ...flags,

  //Decorations
  "White Tulips": WhiteTulips,
  "Potted Sunflower": PottedSunflower,
  "Potted Pumpkin": PottedPumpkin,
  Cactus,
  "Basic Bear": BasicBear,
  "Chef Bear": ChefBear,
  "Construction Bear": ConstructionBear,
  "Angel Bear": AngelBear,
  "Badass Bear": BadassBear,
  "Bear Trap": BearTrap,
  "Beta Bear": BetaBear,
  "Brilliant Bear": BrilliantBear,
  "Classy Bear": ClassyBear,
  "Farmer Bear": FarmerBear,
  "Rich Bear": RichBear,
  "Sunflower Bear": SunflowerBear,
  "Christmas Bear": ChristmasBear,
  "Rainbow Artist Bear": RainbowArtistBear,
  "Victoria Sisters": VictoriaSisters,
  "Devil Bear": DevilBear,
  "Valentine Bear": ValentineBear,
  "Easter Bear": EasterBear,
  "Easter Bush": EasterBush,
  "Giant Carrot": GiantCarrot,
  Observatory,
  "Luminous Lantern": LuminousLantern,
  "Aurora Lantern": AuroraLantern,
  "Radiance Lantern": RadianceLantern,
  "Ocean Lantern": OceanLantern,

  "Golden Bean": Bean,
  "Magic Bean": Bean,
  "Shiny Bean": Bean,

  "Egg Basket": () => null,

  // TODO
  "Potted Potato": PottedPotato,
  "Colossal Crop": () => null,
  "Peaceful Potato": () => null,
  "Perky Pumpkin": () => null,
  "Stellar Sunflower": () => null,
  "Christmas Snow Globe": SnowGlobe,
  "Immortal Pear": ImmortalPear,
  "Lady Bug": LadyBug,
  "Squirrel Monkey": SquirrelMonkey,
  "Black Bearry": BlackBearry,
  "Ayam Cemani": AyamCemani,
  "Collectible Bear": CollectibleBear,
  "Cyborg Bear": CyborgBear,
  "Maneki Neko": ManekiNeko,
  "Pablo The Bunny": PabloBunny,

  // Treasure
  "Abandoned Bear": AbandonedBear,
  "Tiki Totem": TikiTotem,
  "Lunar Calendar": LunarCalendar,
  "Goblin Bear": GoblinBear,
  "Turtle Bear": TurtleBear,
  "T-Rex Skull": TRexSkull,
  "Lifeguard Bear": LifeguardBear,
  "Snorkel Bear": SnorkelBear,
  "Whale Bear": WhaleBear,
  "Parasaur Skull": ParasaurSkull,
  "Golden Bear Head": GoldenBearHead,
  "Human Bear": HumanBear,
  "Pirate Bear": PirateBear,
  "Sunflower Coin": SunflowerCoin,
  Galleon: Galleon,
  "Skeleton King Staff": SkeletonKingStaff,
  Foliant: Foliant,
  "Dinosaur Bone": DinosaurBone,
  "Treasure Map": TreasureMap,
  "Heart of Davy Jones": HeartOfDavyJones,
  "Heart Balloons": HeartBalloons,
  Flamingo: Flamingo,
  "Blossom Tree": BlossomTree,
  "Iron Idol": IronIdol,

  // Solar Flare Items
  "Beach Ball": BeachBall,
  "Palm Tree": PalmTree,
  Karkinos: Karkinos,
  "Dawn Breaker Banner": DawnBreakerBanner,
  "Solar Flare Banner": SolarFlareBanner,
  "Human War Banner": HumanBanner,
  "Goblin War Banner": GoblinBanner,

  "Bonnie's Tombstone": BonniesTombstone,
  "Chestnut Fungi Stool": ChestnutFungiStool,
  "Crimson Cap": CrimsonCap,
  "Dawn Umbrella Seat": DawnUmbreallSeat,
  "Eggplant Grill": EggplantGrill,
  "Giant Dawn Mushroom": GiantDawnMushroom,
  "Grubnash's Tombstone": GrubnashTombstone,
  "Mahogany Cap": MahoganyCap,
  "Shroom Glow": ShroomGlow,
  "Toadstool Seat": ToadstoolSeat,
  Clementine: Clementine,
  Cobalt: Cobalt,

  // Dawn Breaker items
  "Mushroom House": MushroomHouse,
  "Purple Trail": PurpleTrail,
  Obie: Obie,
  Maximus: Maximus,
  "Genie Lamp": GenieLamp,
  Hoot: Hoot,
  "Genie Bear": GenieBear,
  "Sir Goldensnout": SirGoldenSnout,
};

// Need readonly versions for some troublesome components while in design mode
export const READONLY_COLLECTIBLES: Record<CollectibleName, React.FC<any>> = {
  ...COLLECTIBLE_COMPONENTS,
  Observatory: () => (
    <img
      src={ITEM_DETAILS["Observatory"].image}
      className="absolute bottom-0"
      style={{ width: `${PIXEL_SCALE * 31}px` }}
    />
  ),
  "Maneki Neko": () => (
    <img
      src={ITEM_DETAILS["Maneki Neko"].image}
      className="absolute bottom-0"
      style={{ width: `${PIXEL_SCALE * 16}px` }}
    />
  ),

  "Basic Scarecrow": () => (
    <div
      className="absolute bottom-0"
      style={{ width: `${PIXEL_SCALE * 22}px`, right: `${PIXEL_SCALE * -3}px` }}
    >
      <img
        src={ITEM_DETAILS["Basic Scarecrow"].image}
        className="w-full pointer-events-auto"
      />
      <div
        className="absolute bottom-0 bg-blue-300 bg-opacity-50 animate-pulse z-50"
        style={{
          width: `${PIXEL_SCALE * 16 * 3}px`,
          height: `${PIXEL_SCALE * 16 * 3}px`,
          left: `${PIXEL_SCALE * -12.8}px`,
          top: `${PIXEL_SCALE * 16 * 2 - 2}px`,
        }}
      >
        <img
          src={lightning}
          className="absolute bottom-0 opacity-50 animate-pulsate"
          style={{
            width: `${PIXEL_SCALE * 10}px`,
            left: `${PIXEL_SCALE * 19}px`,
            top: `${PIXEL_SCALE * 17}px`,
          }}
        />
      </div>
    </div>
  ),
  "Emerald Turtle": () => (
    <div
      className="absolute bottom-0"
      style={{
        width: `${PIXEL_SCALE * 22}px`,
        top: `${PIXEL_SCALE * -5}px`,
        left: `${PIXEL_SCALE * -3}px`,
      }}
    >
      <img
        src={ITEM_DETAILS["Emerald Turtle"].image}
        className="w-full"
        style={{
          width: `${PIXEL_SCALE * 22}px`,
          left: `${PIXEL_SCALE * -3}px`,
        }}
      />
      <div
        className="absolute bottom-0 bg-blue-300 bg-opacity-50 animate-pulse z-50"
        style={{
          width: `${PIXEL_SCALE * 16 * 3}px`,
          height: `${PIXEL_SCALE * 16 * 3}px`,
          left: `${PIXEL_SCALE * -12.8}px`,
          top: `${PIXEL_SCALE * -10 - 2}px`,
        }}
      >
        <img
          src={lightning}
          className="absolute bottom-0 opacity-50 animate-pulsate"
          style={{
            width: `${PIXEL_SCALE * 10}px`,
            left: `${PIXEL_SCALE * 19}px`,
            top: `${PIXEL_SCALE * 17}px`,
          }}
        />
      </div>
    </div>
  ),
  "Sir Goldensnout": () => (
    <div
      className="absolute bottom-0"
      style={{
        width: `${PIXEL_SCALE * 24}px`,
        top: `${PIXEL_SCALE * -5}px`,
        left: `${PIXEL_SCALE * -3}px`,
      }}
    >
      <img
        src={ITEM_DETAILS["Sir Goldensnout"].image}
        className="w-full absolute"
        style={{
          width: `${PIXEL_SCALE * 24}px`,
          bottom: `${PIXEL_SCALE * 2}px`,
          left: `${PIXEL_SCALE * 7}px`,
        }}
      />
      <div
        className="absolute bottom-0 bg-blue-300 bg-opacity-50 animate-pulse z-50"
        style={{
          width: `${PIXEL_SCALE * 16 * 4}px`,
          height: `${PIXEL_SCALE * 16 * 4}px`,
          left: `${PIXEL_SCALE * -12.8}px`,
          top: `${PIXEL_SCALE * -10 - 2}px`,
        }}
      >
        <img
          src={lightning}
          className="absolute bottom-0 opacity-50 animate-pulsate"
          style={{
            width: `${PIXEL_SCALE * 10}px`,
            left: `${PIXEL_SCALE * 27}px`,
            top: `${PIXEL_SCALE * 24}px`,
          }}
        />
      </div>
    </div>
  ),
  "Tin Turtle": () => (
    <div
      className="absolute bottom-0"
      style={{
        width: `${PIXEL_SCALE * 22}px`,
        top: `${PIXEL_SCALE * -4}px`,
        left: `${PIXEL_SCALE * -3}px`,
      }}
    >
      <img
        src={ITEM_DETAILS["Tin Turtle"].image}
        className="w-full"
        style={{
          width: `${PIXEL_SCALE * 22}px`,
          left: `${PIXEL_SCALE * -3}px`,
        }}
      />
      <div
        className="absolute bottom-0 bg-blue-300 bg-opacity-50 animate-pulse z-50"
        style={{
          width: `${PIXEL_SCALE * 16 * 3}px`,
          height: `${PIXEL_SCALE * 16 * 3}px`,
          left: `${PIXEL_SCALE * -12.8}px`,
          top: `${PIXEL_SCALE * -10 - 2}px`,
        }}
      >
        <img
          src={lightning}
          className="absolute bottom-0 opacity-50 animate-pulsate"
          style={{
            width: `${PIXEL_SCALE * 10}px`,
            left: `${PIXEL_SCALE * 19}px`,
            top: `${PIXEL_SCALE * 17}px`,
          }}
        />
      </div>
    </div>
  ),
  Bale: () => (
    <div
      className="absolute bottom-0"
      style={{
        width: `${PIXEL_SCALE * 28}px`,
        top: `${PIXEL_SCALE * -5}px`,
        left: `${PIXEL_SCALE * -3}px`,
      }}
    >
      <img
        src={ITEM_DETAILS["Bale"].image}
        className=" absolute w-full pointer-events-auto"
        style={{
          width: `${PIXEL_SCALE * 28}px`,
          left: `${PIXEL_SCALE * 3}px`,
          top: `${PIXEL_SCALE * 5}px`,
        }}
      />
      <div
        className="absolute bottom-0 bg-blue-300 bg-opacity-50 animate-pulse z-50"
        style={{
          width: `${PIXEL_SCALE * 16 * 4}px`,
          height: `${PIXEL_SCALE * 16 * 4}px`,
          left: `${PIXEL_SCALE * -12.8}px`,
          top: `${PIXEL_SCALE * -10 - 2}px`,
        }}
      >
        <img
          src={lightning}
          className="absolute bottom-0 opacity-50 animate-pulsate"
          style={{
            width: `${PIXEL_SCALE * 10}px`,
            left: `${PIXEL_SCALE * 27}px`,
            top: `${PIXEL_SCALE * 25}px`,
          }}
        />
      </div>
    </div>
  ),
  "Nyon Statue": () => (
    <img
      src={ITEM_DETAILS["Nyon Statue"].image}
      className="absolute bottom-0"
      style={{ width: `${PIXEL_SCALE * 32}px` }}
    />
  ),
  "Rock Golem": () => (
    <img
      src={ITEM_DETAILS["Rock Golem"].image}
      className="absolute bottom-0"
      style={{ width: `${PIXEL_SCALE * 34}px` }}
    />
  ),
  "Wicker Man": () => (
    <div
      className="absolute bottom-0"
      style={{ width: `${PIXEL_SCALE * 19}px` }}
    >
      <img src={ITEM_DETAILS["Wicker Man"].image} className="w-full" />
    </div>
  ),
  "Genie Lamp": () => (
    <div
      className="absolute"
      style={{ left: `${PIXEL_SCALE * 4}px`, width: `${PIXEL_SCALE * 22}px` }}
    >
      <img
        src={ITEM_DETAILS["Genie Lamp"].image}
        className="absolute w-full cursor-pointer hover:img-highlight"
        alt="Genie Lamp"
      />
    </div>
  ),
};

const InProgressCollectible: React.FC<Props> = ({
  name,
  id,
  readyAt,
  createdAt,
  showTimers,
  x,
  y,
  grid,
}) => {
  const CollectiblePlaced = COLLECTIBLE_COMPONENTS[name];
  const [showTooltip, setShowTooltip] = useState(false);

  const totalSeconds = (readyAt - createdAt) / 1000;
  const secondsLeft = Math.floor((readyAt - Date.now()) / 1000);

  return (
    <>
      <div
        className="h-full cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="w-full h-full pointer-events-none opacity-50">
          <CollectiblePlaced
            key={id}
            createdAt={createdAt}
            id={id}
            name={name}
            readyAt={readyAt}
            x={x}
            y={y}
            grid={grid}
          />
        </div>
        {showTimers && (
          <div
            className="absolute bottom-0 left-1/2"
            style={{
              marginLeft: `${PIXEL_SCALE * -8}px`,
            }}
          >
            <Bar
              percentage={(1 - secondsLeft / totalSeconds) * 100}
              type="progress"
            />
          </div>
        )}
      </div>
      <div
        className="flex justify-center absolute w-full pointer-events-none"
        style={{
          top: `${PIXEL_SCALE * -20}px`,
        }}
      >
        <TimeLeftPanel
          text="Ready in:"
          timeLeft={secondsLeft}
          showTimeLeft={showTooltip}
        />
      </div>
    </>
  );
};

const CollectibleComponent: React.FC<Props> = ({
  name,
  id,
  readyAt,
  createdAt,
  x,
  y,
  showTimers,
  grid,
}) => {
  const CollectiblePlaced = COLLECTIBLE_COMPONENTS[name];

  const inProgress = readyAt > Date.now();

  useUiRefresher({ active: inProgress });

  return (
    <div className="h-full">
      {inProgress ? (
        <InProgressCollectible
          key={id}
          name={name}
          id={id}
          createdAt={createdAt}
          readyAt={readyAt}
          x={x}
          y={y}
          showTimers={showTimers}
          grid={grid}
        />
      ) : (
        <CollectiblePlaced
          key={id}
          name={name}
          id={id}
          createdAt={createdAt}
          readyAt={readyAt}
          x={x}
          y={y}
          grid={grid}
        />
      )}
    </div>
  );
};

const isLandscaping = (state: MachineState) => state.matches("landscaping");

const MemorizedCollectibleComponent = React.memo(CollectibleComponent);

export const Collectible: React.FC<Props> = (props) => {
  const { gameService } = useContext(Context);
  const [showPopover, setShowPopover] = useState(false);
  const landscaping = useSelector(gameService, isLandscaping);

  const handleMouseEnter = () => {
    // set state to show details
    setShowPopover(true);
  };

  const handleMouseLeave = () => {
    // set state to hide details
    setShowPopover(false);
  };

  if (landscaping) {
    const CollectiblePlaced = READONLY_COLLECTIBLES[props.name];

    const [isRestricted, restrictionReason] = hasRestriction(
      props.name,
      props.id,
      gameService.state.context.state
    );
    if (isRestricted) {
      return (
        <div
          className="relative w-full h-full pointer-events-none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <InnerPanel
            className={classNames(
              "transition-opacity absolute whitespace-nowrap sm:opacity-0 w-fit z-50 pointer-events-none",
              {
                "opacity-100": showPopover,
                "opacity-0": !showPopover,
              }
            )}
            style={{
              top: `${PIXEL_SCALE * -10}px`,
              left: `${PIXEL_SCALE * 16}px`,
            }}
          >
            <div className="flex flex-col text-xxs text-white text-shadow mx-2">
              <div className="flex flex-1 items-center justify-center">
                <img src={lockIcon} className="w-4 mr-1" />
                <span>{restrictionReason}</span>
              </div>
            </div>
          </InnerPanel>
          <CollectiblePlaced {...props} />
        </div>
      );
    }
    return (
      <MoveableComponent {...(props as any)}>
        <CollectiblePlaced {...props} />
      </MoveableComponent>
    );
  }

  return <MemorizedCollectibleComponent {...props} />;
};
