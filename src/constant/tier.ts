// Assets
// import memberBackground from "assets/images/tiers/member-bg.webp";
// import memberLogo from "assets/images/tiers/member-logo.webp";
// import goldBackground from "assets/images/tiers/gold-bg.webp";
// import platinumBackground from "assets/images/tiers/platinum-bg.webp";
// import silverLogo from "assets/images/tiers/silver-logo.webp";
// import goldLogo from "assets/images/tiers/gold-logo.webp";
// import platinumLogo from "assets/images/tiers/platinum-logo.webp";

// Schemas
import { Tier } from "schemas";

export const TIER_KEY = {
  // GOLD: "GOLD",
  // PLATINUM: "PLATINUM",
  MEMBER: "MEMBER",
  SLIVER: "SILVER",
} as const;

type TierKey = (typeof TIER_KEY)[keyof typeof TIER_KEY];

export const TIER: Partial<Record<TierKey, Tier>> = {
  [TIER_KEY.MEMBER]: {
    name: "member",
    key: TIER_KEY.MEMBER,
    title: "Member",
    description: "Thành viên",
    textColor: "#000000",
    backgroundColor: "#B2292E",
    backgroundTextColor: "#262626",
    dripsBackgroundColor: "#FFFCF6",
    dripsColor: "#B2292E",
    // background: memberBackground,
    // logo: memberLogo,
    minSpend: 0,
    promotionConfig: {
      title: "Member",
      description: "0 - 699k",
      textAlign: "left",
    },
  },
  [TIER_KEY.SLIVER]: {
    name: "silver",
    key: TIER_KEY.SLIVER,
    title: "Silver Member",
    description: "Phin Bạc",
    textColor: "#FFFFFF",
    backgroundColor:
      "linear-gradient(289.79deg, #DDDAD6 -24%, #CECBC8 -5.36%, #A7A4A6 31.9%, #89868C 56.75%, #8D8A90 59.85%, #D5D5D7 112.65%, #F2F3F3 137.49%, #E3E4E4 159.23%, #BEBDBF 196.49%, #817E82 246.18%, #7F7C80 249.29%, #A6A8AA 286.55%)",
    backgroundTextColor: "#FFFFFF",
    dripsBackgroundColor: "#FFFCF6",
    dripsColor: "#000000",
    // background: memberBackground,
    // logo: silverLogo,
    minSpend: 700000,
    promotionConfig: {
      title: "Silver",
      description: "Trên 700k",
      textAlign: "right",
    },
  },
  // [TIER_KEY.GOLD]: {
  //   name: "gold",
  //   key: TIER_KEY.GOLD,
  //   title: "Gold",
  //   description: "Hạng Vàng",
  //   textColor: "#32120A",
  //   background: goldBackground,
  //   backgroundColor: "#B79667",
  //   backgroundTextColor: "#32120A",
  //   dripsBackgroundColor: "#32120A",
  //   dripsColor: "#F9F9E8",
  //   logo: goldLogo,
  //   minSpend: 3000000,
  //   promotionConfig: {
  //     title: "Gold",
  //     description: "3 - 10 Triệu",
  //     textAlign: "center",
  //   },
  // },
  // [TIER_KEY.PLATINUM]: {
  //   name: "platinum",
  //   key: TIER_KEY.PLATINUM,
  //   title: "Platinum",
  //   description: "Hạng Bạch Kim",
  //   textColor: "#ffffff",
  //   dripsColor: "#000000",
  //   background: platinumBackground,
  //   backgroundColor: "#000000",
  //   backgroundTextColor: "#ffffff",
  //   dripsBackgroundColor: "#ffffff",
  //   logo: platinumLogo,
  //   minSpend: 10000000,
  //   promotionConfig: {
  //     title: "Platinum",
  //     description: "Trên 10 triệu",
  //     textAlign: "right",
  //   },
  // },
};
