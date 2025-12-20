import React, { memo } from "react";
import { motion } from "motion/react";

import btnBackImg from "assets/images/merry-christmas/btn-back.webp";

interface BtnBackProps {
  className?: string;
  onBack: () => void;
}

export const BtnBack: React.FC<BtnBackProps> = memo(({ className, onBack }) => {
  return (
    <motion.button className={className} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <img src={btnBackImg} onClick={onBack} />
    </motion.button>
  );
});

BtnBack.displayName = "BtnBack";
