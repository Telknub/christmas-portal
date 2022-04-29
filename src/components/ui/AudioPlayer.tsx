import React, { useEffect, useRef, useState } from "react";
import play from "assets/ui/music_player/play.png";
import pause from "assets/ui/music_player/pause.png";
import skip_forward from "assets/ui/music_player/skip-forward.png";
import music_note from "assets/ui/music_player/music-note.png";
import chevron_right from "assets/ui/music_player/chevron-right.png";
import volume_down from "assets/ui/music_player/volume-down.png";
import volume_up from "assets/ui/music_player/volume-up.png";

import { Button } from "components/ui/Button";
import { Panel } from "components/ui/Panel";

import { getSong, getSongCount } from "assets/songs/playlist";
import { useStepper } from "lib/utils/hooks/useStepper";
import { cacheSettings, getSettings } from "features/hud/lib/settings";

export const AudioPlayer: React.FC = () => {
  const settings = getSettings();
  const volume = useStepper({ initial: 0.6, step: 0.1, max: 1, min: 0 });
  const [visible, setIsVisible] = useState<boolean>(false);
  const [isPlaying, setPlaying] = useState<boolean>(true);
  const [songIndex, setSongIndex] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const musicPlayer = useRef<any>(null);

  const savePausedState = (_bgMusicPaused: boolean) =>
    cacheSettings({
      bgMusicPaused: _bgMusicPaused,
      sfxMuted: settings.sfxMuted,
    });

  const handlePlayState = () => {
    console.log("isPlaying", isPlaying);
    if (musicPlayer.current.paused) {
      musicPlayer.current.play();
      savePausedState(false);
    } else {
      musicPlayer.current.pause();
      savePausedState(true);
    }
    setPlaying(!isPlaying);
    console.log("isPlaying", isPlaying);
  };

  const handleNextSong = () => {
    if (getSongCount() === songIndex + 1) {
      setSongIndex(0);
    } else {
      setSongIndex(songIndex + 1);
    }
  };

  const song = getSong(songIndex);

  useEffect(() => {
    if (document.getElementsByTagName("audio")[0]?.paused) {
      // setPlaying(false);
      musicPlayer.current.pause();
    }
    // do refactor this if you use OP volumeControls to + or - vol
    musicPlayer.current.volume = volume.value;
  }, [volume.value]);

  useEffect(() => {
    // update pause state when user Toggles the master settings
    setPlaying(isPlaying);
    if (settings.bgMusicPaused) {
      setPlaying(false);
      musicPlayer.current.pause();
      setIsVisible(false);
    } else if (!settings.bgMusicPaused) {
      setPlaying(true);
      musicPlayer.current.play();
    }
  }, [settings.bgMusicPaused, isPlaying]);

  useEffect(() => {
    // use the default volume which is set after initMasterVolume
    if (document.getElementsByTagName("audio")[0]) {
      volume.value = document.getElementsByTagName("audio")[0].volume;
    }
    if (settings.bgMusicPaused) {
      musicPlayer.current.pause();
      setPlaying(false);
    } else if (!settings.bgMusicPaused) {
      setTimeout(() => {
        setPlaying(true);
        musicPlayer.current.play();
      }, 500);
    }

    if (navigator.userAgent.match(/chrome|chromium|crios/i)) {
      // by the default Chrome policy doesn't allow autoplay
      setPlaying(false);
      musicPlayer.current.pause();
    }
    musicPlayer.current.volume = volume.value;
    console.log("vol", volume.value);
    console.log("player vol", musicPlayer.current.volume);
  }, []);

  return (
    <div
      className={`position-fixed ${
        visible ? "-right-6 sm:right-10" : "right-2"
      } sm:right-2 bottom-4 z-50 md:w-56 w-48 h-fit sm:-translate-x-50 transition-all duration-500 ease-in-out`}
      style={{
        transform: `translateX(${visible ? 0 : "calc(100% + 8px)"})`,
      }}
    >
      <Panel className="pointer-events-auto w-40 sm:w-56">
        <audio
          ref={musicPlayer}
          onEnded={handleNextSong}
          onPause={() => setPlaying(!musicPlayer.current.paused)}
          onPlay={() => setPlaying(!musicPlayer.current.paused)}
          src={song.path}
          className="d-none"
          autoPlay
          controls
        />
        <div className="p-1 sm:mr-2 relative">
          <div className="mb-1.5 overflow-hidden bg-brown-200 ">
            <p
              className="whitespace-no-wrap w-fit text-white font-italic text-sm"
              style={{
                animation: "marquee-like-effect 10s infinite linear",
                whiteSpace: "nowrap",
                animationPlayState: isPlaying ? "running" : "paused",
              }}
            >
              {song.name} - {song.artist}
            </p>
          </div>
          {/* Controls */}
          <div className="flex space-x-2 justify-content-between ">
            <Button onClick={handlePlayState} className="w-10 h-8">
              <img src={isPlaying ? pause : play} alt="play / pause button " />
            </Button>
            <Button onClick={handleNextSong} className="w-10 h-8">
              <img src={skip_forward} alt="next song button" />
            </Button>
            {/*Custom volume range */}
            <Button
              onClick={volume.decrease}
              className="w-10 h-8 hidden sm:flex"
            >
              <img src={volume_down} alt="next song button" />
            </Button>
            <Button
              onClick={volume.increase}
              className="w-10 h-8 hidden sm:flex"
            >
              <img src={volume_up} alt="next song button" />
            </Button>
            <div className="absolute -right-2 bottom-0 bg-brown-400 h-full w-1.5 rotate-180 rounded-sm hidden sm:block">
              <div
                className="bg-white h-1.5 transition-all duration-200 rounded-sm"
                style={{
                  height: `${volume.value * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </Panel>
      <div
        className={`position-absolute ${
          visible
            ? "-left-7 sm:-left-9"
            : "-left-11 sm:-left-12 sm:-translate-x-1"
        } bottom-0 transition-all -z-10 duration-500 ease-in-out w-fit z-50 flex align-items-center overflow-hidden`}
      >
        <Button onClick={() => setIsVisible(!visible)}>
          <img
            src={visible ? chevron_right : music_note}
            alt="show/hide music player"
            className="w-4 h-4 sm:w-6 sm:h-5"
          />
        </Button>
      </div>
    </div>
  );
};
