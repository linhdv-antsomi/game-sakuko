import { motion } from "motion/react";
import styled from "styled-components";

import dotBackgroundImage from "assets/images/merry-christmas/dot-background.webp";

export const DotBackground = styled(motion.div)`
    background: url(${dotBackgroundImage}) no-repeat top center;
    background-size: cover;
    position: absolute;
    aspect-ratio: 1128/1977;
    width: 96%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    overflow: hidden;
`;