import React, { useContext } from "react";

import * as Auth from "features/auth/lib/Provider";

import { Button } from "components/ui/Button";

export const NoFarm: React.FC = () => {
  const { authService } = useContext(Auth.Context);

  const explore = () => {
    authService.send("EXPLORE");
  };

  const create = () => {
    authService.send("CHOOSE_CHARITY");
  };

  const connect = () => {
    authService.send("CONNECT_TO_DISCORD");
  };

  return (
    <>
      <Button onClick={create} className="overflow-hidden mb-2">
        Get Started
      </Button>

      <Button onClick={explore} className="overflow-hidden">
        {`Explore a friend's land`}
      </Button>
    </>
  );
};
