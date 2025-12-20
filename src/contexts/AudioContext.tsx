import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Howler } from "howler";

interface AudioContextValue {
  /**
   * Global mute state for all sounds
   */
  isMuted: boolean;
  /**
   * Global volume level (0.0 to 1.0)
   */
  volume: number;
  /**
   * Background music enabled state
   */
  isMusicEnabled: boolean;
  /**
   * Sound effects enabled state
   */
  isSoundEffectsEnabled: boolean;
  /**
   * Toggle global mute
   */
  toggleMute: () => void;
  /**
   * Set global volume
   */
  setVolume: (volume: number) => void;
  /**
   * Toggle background music
   */
  toggleMusic: () => void;
  /**
   * Toggle sound effects
   */
  toggleSoundEffects: () => void;
  /**
   * Set background music enabled
   */
  setMusicEnabled: (enabled: boolean) => void;
  /**
   * Set sound effects enabled
   */
  setSoundEffectsEnabled: (enabled: boolean) => void;
}

const AudioContext = createContext<AudioContextValue | undefined>(undefined);

interface AudioProviderProps {
  children: ReactNode;
  /**
   * Initial volume (0.0 to 1.0)
   * @default 0.5
   */
  initialVolume?: number;
  /**
   * Initial mute state
   * @default false
   */
  initialMuted?: boolean;
  /**
   * Initial music enabled state
   * @default true
   */
  initialMusicEnabled?: boolean;
  /**
   * Initial sound effects enabled state
   * @default true
   */
  initialSoundEffectsEnabled?: boolean;
  /**
   * LocalStorage key for persisting settings
   * @default 'audio-settings'
   */
  storageKey?: string;
}

/**
 * Provider component for managing global audio settings
 *
 * @example
 * ```tsx
 * // In your App root
 * <AudioProvider initialVolume={0.7}>
 *   <App />
 * </AudioProvider>
 * ```
 */
export const AudioProvider: React.FC<AudioProviderProps> = ({
  children,
  initialVolume = 0.5,
  initialMuted = false,
  initialMusicEnabled = true,
  initialSoundEffectsEnabled = true,
  storageKey = "audio-settings",
}) => {
  // Load from localStorage
  const loadSettings = useCallback(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          volume: parsed.volume ?? initialVolume,
          isMuted: parsed.isMuted ?? initialMuted,
          isMusicEnabled: parsed.isMusicEnabled ?? initialMusicEnabled,
          isSoundEffectsEnabled:
            parsed.isSoundEffectsEnabled ?? initialSoundEffectsEnabled,
        };
      }
    } catch (error) {
      console.error("Failed to load audio settings:", error);
    }
    return {
      volume: initialVolume,
      isMuted: initialMuted,
      isMusicEnabled: initialMusicEnabled,
      isSoundEffectsEnabled: initialSoundEffectsEnabled,
    };
  }, [
    storageKey,
    initialVolume,
    initialMuted,
    initialMusicEnabled,
    initialSoundEffectsEnabled,
  ]);

  const [settings, setSettings] = useState(loadSettings);

  // Save to localStorage
  const saveSettings = useCallback(
    (newSettings: typeof settings) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(newSettings));
      } catch (error) {
        console.error("Failed to save audio settings:", error);
      }
    },
    [storageKey]
  );

  // Apply global Howler settings
  useEffect(() => {
    Howler.volume(settings.volume);
    Howler.mute(settings.isMuted);
  }, [settings.volume, settings.isMuted]);

  // Resume audio context on page visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && Howler.ctx) {
        // Wait a bit before resuming to avoid issues
        setTimeout(() => {
          Howler.ctx.resume();
        }, 100);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setSettings((prev) => {
      const newSettings = { ...prev, isMuted: !prev.isMuted };
      saveSettings(newSettings);
      return newSettings;
    });
  }, [saveSettings]);

  // Set volume
  const setVolume = useCallback(
    (volume: number) => {
      const clampedVolume = Math.max(0, Math.min(1, volume));
      setSettings((prev) => {
        const newSettings = { ...prev, volume: clampedVolume };
        saveSettings(newSettings);
        return newSettings;
      });
    },
    [saveSettings]
  );

  // Toggle music
  const toggleMusic = useCallback(() => {
    setSettings((prev) => {
      const newSettings = { ...prev, isMusicEnabled: !prev.isMusicEnabled };
      saveSettings(newSettings);
      return newSettings;
    });
  }, [saveSettings]);

  // Toggle sound effects
  const toggleSoundEffects = useCallback(() => {
    setSettings((prev) => {
      const newSettings = {
        ...prev,
        isSoundEffectsEnabled: !prev.isSoundEffectsEnabled,
      };
      saveSettings(newSettings);
      return newSettings;
    });
  }, [saveSettings]);

  // Set music enabled
  const setMusicEnabled = useCallback(
    (enabled: boolean) => {
      setSettings((prev) => {
        const newSettings = { ...prev, isMusicEnabled: enabled };
        saveSettings(newSettings);
        return newSettings;
      });
    },
    [saveSettings]
  );

  // Set sound effects enabled
  const setSoundEffectsEnabled = useCallback(
    (enabled: boolean) => {
      setSettings((prev) => {
        const newSettings = { ...prev, isSoundEffectsEnabled: enabled };
        saveSettings(newSettings);
        return newSettings;
      });
    },
    [saveSettings]
  );

  const value: AudioContextValue = {
    isMuted: settings.isMuted,
    volume: settings.volume,
    isMusicEnabled: settings.isMusicEnabled,
    isSoundEffectsEnabled: settings.isSoundEffectsEnabled,
    toggleMute,
    setVolume,
    toggleMusic,
    toggleSoundEffects,
    setMusicEnabled,
    setSoundEffectsEnabled,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

/**
 * Hook to access global audio settings
 *
 * @example
 * ```tsx
 * function VolumeControl() {
 *   const audio = useAudioContext();
 *
 *   return (
 *     <div>
 *       <button onClick={audio.toggleMute}>
 *         {audio.isMuted ? 'Unmute' : 'Mute'}
 *       </button>
 *       <input
 *         type="range"
 *         min="0"
 *         max="1"
 *         step="0.1"
 *         value={audio.volume}
 *         onChange={(e) => audio.setVolume(parseFloat(e.target.value))}
 *       />
 *       <button onClick={audio.toggleMusic}>
 *         Music: {audio.isMusicEnabled ? 'ON' : 'OFF'}
 *       </button>
 *       <button onClick={audio.toggleSoundEffects}>
 *         SFX: {audio.isSoundEffectsEnabled ? 'ON' : 'OFF'}
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export const useAudioContext = (): AudioContextValue => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within AudioProvider");
  }
  return context;
};
