import { ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import React, { memo, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import clsx from "clsx";

interface BgParticlesProps {
  id: string;
  className?: string;
}

export const BgParticles: React.FC<BgParticlesProps> = memo(
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
        fullScreen: false,
        background: { color: "transparent" },

        particles: {
          number: {
            value: 600,
            density: { enable: true, area: 900 },
          },

          color: {
            value: ["#C78010", "#BE750F", "#FEF80F", "#F8F4B6"],
          },

          shape: { type: "circle" },

          size: {
            value: { min: 1, max: 5 },
            random: true,
          },

          opacity: {
            value: { min: 0.2, max: 1 },
            animation: {
              enable: true,
              speed: 0.3,
              minimumValue: 0.1,
              sync: false,
            },
          },

          move: {
            enable: true,

            /** ⭐ Đi từ dưới lên */
            direction: "top",

            /** ⭐ Speed nhẹ — hiệu ứng mơ mộng */
            speed: { min: 0.1, max: 0.4 },

            /** ⭐ Gravity âm để bay lên */
            gravity: { enable: true, acceleration: -0.08 },

            outModes: { default: "out" },
            drift: 0.02,

            attract: {
              enable: true,
              rotateX: 60,
              rotateY: 120,
            },
          },

          glow: {
            enable: true,
            color: "#FFD45E",
            intensity: 0.7,
          },
        },

        // ⭐ Twinkle lấp lánh
        twinkle: {
          particles: {
            enable: true,
            color: "#ffffff",
            frequency: 0.04,
            opacity: 1,
          },
        },
      }),
      []
    );

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {init && (
          <Particles
            id={id}
            className={clsx("pointer-events-none", className)}
            options={options}
          />
        )}
      </motion.div>
    );
  }
);

BgParticles.displayName = "BgParticles";
