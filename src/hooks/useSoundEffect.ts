import { useCallback, useEffect, useRef } from "react";
import { Howl } from "howler";
import { useAudioContext } from "contexts/AudioContext";

export interface SoundEffectOptions {
  /**
   * Volume level (0.0 to 1.0)
   * @default 0.5
   */
  volume?: number;
  /**
   * Play rate (0.5 to 4.0)
   * @default 1.0
   */
  rate?: number;
  /**
   * Whether to loop the sound
   * @default false
   */
  loop?: boolean;
  /**
   * Keep sound loaded in memory when component unmounts
   * Useful for sounds that are reused across multiple screens
   * @default false
   */
  persist?: boolean;
  /**
   * html5 Audio element compatibility mode
   * @default false
   */
  html5?: boolean;
  /**
   * Called when sound starts playing
   */
  onPlay?: () => void;
  /**
   * Called when sound ends
   */
  onEnd?: () => void;
}

export interface SoundEffectControls {
  /**
   * Play the sound effect
   */
  play: () => void;
  /**
   * Stop the sound effect
   */
  stop: () => void;
  /**
   * Check if sound is playing
   */
  isPlaying: () => boolean;
}

/**
 * Hook to play a single sound effect
 *
 * @example
 * ```tsx
 * // Basic usage
 * const clickSound = useSoundEffect(clickSoundFile);
 * <button onClick={clickSound.play}>Click Me</button>
 *
 * // With options
 * const explosionSound = useSoundEffect(explosionFile, {
 *   volume: 0.8,
 *   onEnd: () => console.log('Boom!')
 * });
 * ```
 */
export const useSoundEffect = (
  src: string,
  options: SoundEffectOptions = {}
): SoundEffectControls => {
  const { isSoundEffectsEnabled } = useAudioContext();
  const {
    volume = 0.5,
    rate = 1.0,
    loop = false,
    persist = false,
    onPlay,
    onEnd,
    html5 = false,
  } = options;

  const soundRef = useRef<Howl | null>(null);

  // Initialize sound
  useEffect(() => {
    const sound = new Howl({
      src: [src],
      volume,
      rate,
      loop,
      preload: true,
      html5,
      onplay: onPlay,
      onend: onEnd,
      onloaderror: (id, error) => {
        console.error(`Failed to load sound effect ${src}:`, error);
      },
    });

    soundRef.current = sound;

    return () => {
      // Only unload if persist is false
      if (!persist) {
        sound.unload();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, persist]);

  // Play sound
  const play = useCallback(() => {
    if (soundRef.current && isSoundEffectsEnabled) {
      soundRef.current.play();
    }
  }, [isSoundEffectsEnabled]);

  // Stop sound
  const stop = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
  }, []);

  // Check if playing
  const isPlaying = useCallback(() => {
    return soundRef.current?.playing() || false;
  }, []);

  return { play, stop, isPlaying };
};

/**
 * Hook to manage multiple sound effects
 *
 * @example
 * ```tsx
 * const sounds = useSoundEffects({
 *   click: clickSoundFile,
 *   explosion: explosionFile,
 *   coin: coinFile,
 * }, {
 *   volume: 0.7,
 *   persist: true // Keep sounds loaded
 * });
 *
 * <button onClick={sounds.click.play}>Click</button>
 * <button onClick={sounds.explosion.play}>Explode</button>
 * <button onClick={sounds.coin.play}>Collect Coin</button>
 * ```
 */
export const useSoundEffects = <T extends Record<string, string>>(
  sounds: T,
  options: SoundEffectOptions = {}
): Record<keyof T, SoundEffectControls> => {
  const { isSoundEffectsEnabled } = useAudioContext();
  const {
    volume = 0.5,
    rate = 1.0,
    loop = false,
    html5 = false,
    persist = false,
  } = options;

  const soundsRef = useRef<Record<string, Howl>>({});

  // Initialize all sounds
  useEffect(() => {
    const instances: Record<string, Howl> = {};

    Object.entries(sounds).forEach(([key, src]) => {
      instances[key] = new Howl({
        src: [src],
        volume,
        rate,
        html5,
        loop,
        preload: true,
        onloaderror: (id, error) => {
          console.error(`Failed to load sound effect ${key}:`, error);
        },
      });
    });

    soundsRef.current = instances;

    return () => {
      // Only unload if persist is false
      if (!persist) {
        Object.values(instances).forEach((sound) => {
          sound.unload();
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persist]);

  // Create controls for each sound
  const controls = Object.keys(sounds).reduce((acc, key) => {
    acc[key as keyof T] = {
      play: () => {
        if (soundsRef.current[key] && isSoundEffectsEnabled) {
          soundsRef.current[key].play();
        }
      },
      stop: () => {
        if (soundsRef.current[key]) {
          soundsRef.current[key].stop();
        }
      },
      isPlaying: () => {
        return soundsRef.current[key]?.playing() || false;
      },
    };
    return acc;
  }, {} as Record<keyof T, SoundEffectControls>);

  return controls;
};
