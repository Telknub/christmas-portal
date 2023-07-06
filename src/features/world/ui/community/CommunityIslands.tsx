import { SUNNYSIDE } from "assets/sunnyside";
import { OuterPanel } from "components/ui/Panel";
import React from "react";
import { useNavigate } from "react-router-dom";

type CommunityIsland = {
  url: string;
  name: string;
  id: string;
};

export const COMMUNITY_ISLANDS = [
  {
    url: "https://sunflower-land.github.io/plugin-example/public/Scene.js",
    name: "Test Island",
    id: "test_island",
  },
];

export const CommunityIslands: React.FC = () => {
  const navigate = useNavigate();
  const travel = async (island: CommunityIsland) => {
    navigate(`/community/${island.id}`);
  };

  return (
    <>
      <div className="p-2">
        <p>Community Islands</p>
        <p className="text-sm">Lorem ipsum</p>
      </div>

      {COMMUNITY_ISLANDS.map((island) => (
        <OuterPanel
          key={island.id}
          onClick={() => travel(island)}
          className={
            "flex relative items-center py-2 mb-1 cursor-pointer hover:bg-brown-200"
          }
        >
          <div className="w-16 justify-center flex mr-2">
            <img src={SUNNYSIDE.icons.happy} className="h-9" />
          </div>
          <div>
            <span>{island.name}</span>
          </div>
        </OuterPanel>
      ))}
    </>
  );
};
