import React, { useContext, useState } from "react";
import { Modal } from "components/ui/Modal";
import clipboard from "clipboard";
import { CONFIG } from "lib/config";

import { Button } from "components/ui/Button";
import * as Auth from "features/auth/lib/Provider";

import { Context as GameContext } from "features/game/GameProvider";

import { SUNNYSIDE } from "assets/sunnyside";
import { Label } from "components/ui/Label";
import { shortAddress } from "lib/utils/shortAddress";

import walletIcon from "assets/icons/wallet.png";
import { removeJWT } from "features/auth/actions/social";
import { WalletContext } from "features/wallet/WalletProvider";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { useAppTranslation } from "lib/i18n/useAppTranslations";

import { PokoOnRamp } from "../PokoOnRamp";
import { HowToPlay } from "./howToPlay/HowToPlay";
import { BlockchainSettings } from "./blockchain-settings/BlockchainSettings";
import { AmoyTestnetActions } from "./amoy-actions/AmoyTestnetActions";
import { GeneralSettings } from "./general-settings/GeneralSettings";
import { PlazaSettings } from "./PlazaSettingsModal";

enum MENU_LEVELS {
  ROOT = "root",
  COMMUNITY = "community",
  ON_RAMP_MATIC = "on-ramp-matic",
  ON_RAMP_SFL = "on-ramp-sfl",
}

interface Props {
  show: boolean;
  onClose: () => void;
  isFarming: boolean;
}

export const GameOptions: React.FC<Props> = ({ show, onClose, isFarming }) => {
  const { t } = useAppTranslation();

  const { authService } = useContext(Auth.Context);
  const { walletService } = useContext(WalletContext);
  const { gameService } = useContext(GameContext);

  const [isConfirmLogoutModalOpen, showConfirmLogoutModal] = useState(false);
  const [menuLevel, setMenuLevel] = useState(MENU_LEVELS.ROOT);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showBlockchainSettings, setShowBlockchainSettings] = useState(false);
  const [showAmoySettings, setShowAmoySettings] = useState(false);
  const [showGeneralSettings, setShowGeneralSettings] = useState(false);
  const [showPlazaSettings, setShowPlazaSettings] = useState(false);

  const handleHowToPlay = () => {
    setShowHowToPlay(true);
  };

  const onHide = () => {
    onClose();
    setMenuLevel(MENU_LEVELS.ROOT);
  };

  const onLogout = () => {
    removeJWT();
    authService.send("LOGOUT");
    walletService.send("RESET");
    onClose();
  };
  const handleAmoySettings = () => {
    setShowAmoySettings(true);
  };

  const handleBlockchainSettings = () => {
    setShowBlockchainSettings(true);
  };

  const handleGeneralSettings = () => {
    setShowGeneralSettings(true);
  };

  const handlePlazaSettings = () => {
    setShowPlazaSettings(true);
  };

  const openConfirmLogoutModal = () => {
    showConfirmLogoutModal(true);
  };
  const closeConfirmLogoutModal = () => {
    showConfirmLogoutModal(false);
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <CloseButtonPanel title={`Game Options`}>
          <ul className="list-none">
            {/* Root menu */}
            {menuLevel === MENU_LEVELS.ROOT && (
              <>
                <div className="flex flex-wrap items-center justify-between mx-2">
                  <Label
                    type="default"
                    icon={SUNNYSIDE.icons.search}
                    className="mb-1"
                    onClick={() => {
                      clipboard.copy(
                        gameService.state?.context?.farmId.toString() as string
                      );
                    }}
                  >
                    {`ID #${gameService.state?.context?.farmId}`}{" "}
                  </Label>
                  {gameService.state?.context?.linkedWallet && (
                    <Label
                      type="formula"
                      className="mb-1"
                      icon={walletIcon}
                      onClick={() => {
                        clipboard.copy(
                          gameService.state?.context?.linkedWallet as string
                        );
                      }}
                    >
                      {t("linked.wallet")} {"-"}{" "}
                      {shortAddress(gameService.state.context.linkedWallet)}
                    </Label>
                  )}
                </div>
                <li className="p-1">
                  <Button>
                    {/* onClick={handleHowToPlay} */}
                    <div className="flex items-center justify-center">
                      <span>{t("settingsMenu.howToPlay")}</span>
                      <img
                        src={SUNNYSIDE.icons.expression_confused}
                        className="w-3 ml-2"
                        alt="question-mark"
                      />
                    </div>
                  </Button>
                </li>
                {CONFIG.NETWORK === "amoy" && (
                  <li className="p-1">
                    <Button onClick={handleAmoySettings}>
                      <span>{`Amoy Testnet Actions`}</span>
                    </Button>
                  </li>
                )}
                <li className="p-1">
                  <Button onClick={handleBlockchainSettings}>
                    <span>{`Blockchain Settings`}</span>
                  </Button>
                </li>
                <li className="p-1">
                  <Button onClick={handleGeneralSettings}>
                    <span>{`General Settings`}</span>
                  </Button>
                </li>
                <li className="p-1">
                  <Button onClick={handlePlazaSettings}>
                    <span>{`Plaza Settings`}</span>
                  </Button>
                </li>
                <li className="p-1">
                  <Button onClick={openConfirmLogoutModal}>
                    {t("logout")}
                  </Button>
                  <Modal
                    show={isConfirmLogoutModalOpen}
                    onHide={closeConfirmLogoutModal}
                  >
                    <CloseButtonPanel className="sm:w-4/5 m-auto">
                      <div className="flex flex-col p-2">
                        <span className="text-sm text-center">
                          {t("settingsMenu.confirmLogout")}
                        </span>
                      </div>
                      <div className="flex justify-content-around mt-2 space-x-1">
                        <Button onClick={onLogout}>{t("logout")}</Button>
                        <Button onClick={closeConfirmLogoutModal}>
                          {t("cancel")}
                        </Button>
                      </div>
                    </CloseButtonPanel>
                  </Modal>
                </li>
              </>
            )}

            {menuLevel === MENU_LEVELS.ON_RAMP_MATIC && (
              <PokoOnRamp
                crypto="MATIC-polygon"
                onClose={() => setMenuLevel(MENU_LEVELS.ROOT)}
              />
            )}
            {menuLevel === MENU_LEVELS.ON_RAMP_SFL && (
              <PokoOnRamp
                crypto="SFL-polygon"
                onClose={() => setMenuLevel(MENU_LEVELS.ROOT)}
              />
            )}
          </ul>
          <p className="mx-1 text-xxs">
            {CONFIG.RELEASE_VERSION?.split("-")[0]}
          </p>
        </CloseButtonPanel>
      </Modal>
      <HowToPlay
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />
      <AmoyTestnetActions
        isOpen={showAmoySettings}
        onClose={() => setShowAmoySettings(false)}
      />
      <BlockchainSettings
        isOpen={showBlockchainSettings}
        onClose={() => setShowBlockchainSettings(false)}
      />
      <GeneralSettings
        isOpen={showGeneralSettings}
        onClose={() => setShowGeneralSettings(false)}
        isFarming={isFarming}
      />
      <PlazaSettings
        isOpen={showPlazaSettings}
        onClose={() => setShowPlazaSettings(false)}
      />
    </>
  );
};
