import Particles, { initParticlesEngine } from "@tsparticles/react";
import React, { memo, useEffect, useMemo, useState } from "react";
import { ISourceOptions } from "@tsparticles/engine";
import { motion } from "motion/react";
import { loadSlim } from "@tsparticles/slim";
import clsx from "clsx";

interface GameSnowfallProps {
  id: string;
  className?: string;
}

export const GameSnowfall: React.FC<GameSnowfallProps> = memo(
  ({ id, className }) => {
    const [init, setInit] = useState(false);

    useEffect(() => {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        setInit(true);
      });
    }, []);

    const options: ISourceOptions = useMemo(
      () => ({
        fullScreen: { enable: true, zIndex: 1 },

        particles: {
          number: {
            value: 200,
            // limit: 120, // ❗ Slim bắt buộc để respawn
            density: { enable: true, area: 800 },
          },

          shape: { type: "circle" },
          color: { value: "#ffffff" },

          size: {
            value: { min: 1, max: 3 },
          },

          opacity: {
            value: { min: 0.7, max: 1},
          },

          move: {
            enable: true,
            direction: "bottom",
            speed: { min: 0.7, max: 1.5 },

            straight: true, // ❗ Rơi thẳng, không lệch ngang
            drift: 0, // ❗ Bắt buộc = 0 nếu không Slim sẽ random ngang

            outModes: {
              default: "destroy",
            },
          },

          life: {
            duration: {
              value: { min: 4, max: 8 },
            },
            count: 0, // ❗ Loop vô hạn — Slim PHẢI để = 0
          },
        },

        detectRetina: true,
      }),
      []
    );

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {init && <Particles id={id} className={clsx("pointer-events-none", className)} options={options} />}
      </motion.div>
    );
  }
);

GameSnowfall.displayName = "GameSnowfall";
