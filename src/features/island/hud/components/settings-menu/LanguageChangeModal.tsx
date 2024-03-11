import React, { useState } from "react";

import { Button } from "components/ui/Button";
import { Modal } from "components/ui/Modal";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";

import i18n from "lib/i18n";
import { useAppTranslation } from "lib/i18n/useAppTranslations";

import british_flag from "assets/sfts/flags/british_flag.gif";
import usaFlag from "assets/sfts/flags/usa_flag.gif";
import brazilFlag from "assets/sfts/flags/brazil_flag.gif";
import portugalFlag from "assets/sfts/flags/portugal_flag.gif";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageSwitcher: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t } = useAppTranslation();

  const initialLanguage = localStorage.getItem("language") || "en";
  const [language, setLanguage] = useState(initialLanguage);

  const handleChangeLanguage = (languageCode: string) => {
    localStorage.setItem("language", languageCode);
    i18n.changeLanguage(languageCode);
    setLanguage(languageCode);
    onClose();
  };

  const Content = () => {
    return (
      <CloseButtonPanel title={t("change.Language")} onClose={onClose}>
        <div className="p-1">
          <Button
            onClick={() => handleChangeLanguage("en")}
            disabled={language === "en"}
          >
            <img
              style={{ display: "inline-block", marginRight: "5px" }}
              src={british_flag}
              alt="British Flag"
            />
            <img
              style={{ display: "inline-block", marginRight: "5px" }}
              src={usaFlag}
              alt="American Flag"
            />
            {"English"}
          </Button>
          <Button
            onClick={() => handleChangeLanguage("pt")}
            disabled={language === "pt"}
          >
            <img
              style={{ display: "inline-block", marginRight: "5px" }}
              src={brazilFlag}
              alt="Brazillian Flag"
            />
            <img
              style={{ display: "inline-block", marginRight: "5px" }}
              src={portugalFlag}
              alt="Portuguese Flag"
            />
            {"Português"}
          </Button>
        </div>
      </CloseButtonPanel>
    );
  };

  // Close Modal on Hide
  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  const [view, setView] = useState<"settings">("settings");

  const closeAndResetView = () => {
    onClose();
    setView("settings");
  };

  return (
    <Modal show={isOpen} onHide={closeAndResetView}>
      {Content()}
    </Modal>
  );
};
