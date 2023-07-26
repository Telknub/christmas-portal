import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Label } from "components/ui/Label";
import Filter from "bad-words";
import classNames from "classnames";

interface Props {
  messages: { farmId: number; sessionId: string; text: string }[];
  onMessage: (text: string) => void;
}

const MAX_CHARACTERS = 48;

/* eslint-disable */
const URL_REGEX = new RegExp(
  /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
);
/* eslint-enable */

const ALPHA_REGEX = new RegExp(/^[\w*?!, '-]+$/);

export const ChatText: React.FC<Props> = ({ messages, onMessage }) => {
  const ref = useRef<HTMLInputElement>();
  const [text, setText] = useState("");
  const [valid, setValid] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        ref.current.blur();
      }
    };

    const keyDownListener = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (valid) {
          send();
        }
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    window.addEventListener("keydown", keyDownListener);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      window.removeEventListener("keydown", keyDownListener);
    };
  });

  const Validation = () => {
    if (text.length > MAX_CHARACTERS) {
      return (
        <Label className="mt-1 mb-1 float-right" type="danger">
          {`Max ${MAX_CHARACTERS} characters`}
        </Label>
      );
    }

    const isValidText = text.length === 0 || ALPHA_REGEX.test(text);

    if (!isValidText) {
      return (
        <Label className="mt-1 mb-1 float-right" type="danger">
          No special characters
        </Label>
      );
    }

    return null;
  };

  const isValid = () => {
    const isValidText = text.length <= MAX_CHARACTERS && ALPHA_REGEX.test(text);
    setValid(isValidText);
  };

  const send = (event?: React.SyntheticEvent) => {
    event?.preventDefault();

    if (text?.trim() === "") {
      setText("");
      return;
    }

    const filter = new Filter();
    const sanitized = filter.clean(text);
    onMessage(sanitized);
    setText("");
  };

  const hasMessages = messages.length > 0;

  return (
    <form onSubmit={send}>
      <div
        className={classNames(
          "bg-gray-900 bg-opacity-25 relative rounded-md w-64 sm:w-96 pt-1",
          { "mt-2": hasMessages }
        )}
        style={{ lineHeight: "10px" }}
        onClick={() => console.log("text div clicked")}
      >
        <div
          className={classNames(
            "min-h-[60px] max-h-48 overflow-y-scroll flex flex-col-reverse break-words text-xxs p-2 ",
            { "mb-1": hasMessages }
          )}
          style={{ fontFamily: "monospace" }}
        >
          {messages
            .slice(0, 1000)
            .reverse()
            .map((message, i) => {
              if (!message.farmId)
                return (
                  <p key={`${i}-${message.text}`} className="text-amber-300">
                    {message.text}
                  </p>
                );

              return (
                <p
                  key={`${i}-${message.farmId}`}
                  className="pt-0.5 -indent-6 pl-6"
                >
                  {`[${message.farmId}]`}: {message.text}
                </p>
              );
            })}
        </div>
        <input
          maxLength={MAX_CHARACTERS * 2}
          data-prevent-drag-scroll
          name="message"
          autoComplete="off"
          value={text}
          ref={(r) => (ref.current = r as HTMLInputElement)}
          onClick={() => {
            ref.current?.focus();
          }}
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
            isValid();
            e.preventDefault();
          }}
          placeholder="Type here..."
          className="text-xxs placeholder-white text-shadow w-full bg-black bg-opacity-10 px-2 py-2 rounded-md max-h-min"
          style={{ lineHeight: "12px", fontFamily: "monospace" }}
        />
        <Validation />
      </div>
    </form>
  );
};
