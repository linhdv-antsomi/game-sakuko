import { z } from "zod";
import { mixAndMatchSchema } from "./MixAndMatch";
import { ChristmasItemSchema } from "./MerryChristmas";

const luckyMoneySchema = z.object({
  eventEndDate: z.string(),
  termAndCondition: z.string(),
  consolationMessages: z.record(z.array(z.string())),
  notApplicableDates: z.array(z.string()),
  notApplicableSchemes: z.array(z.string()),
});

const affiliateSchema = z.object({
  eventStartDate: z.string(),
  eventEndDate: z.string(),
  termAndCondition: z.string(),
  notApplicableDates: z.array(z.string()).optional(),
  notApplicableSchemes: z.array(z.string()).optional(),
  requestPermissionMessage: z.string().optional(),
  banners: z.array(
    z.object({
      image: z.string(),
      link: z.string().optional(),
      title: z.string().optional(),
      navigate: z
        .object({
          path: z.string(),
          options: z.any().optional(),
        })
        .optional(),
    })
  ),
});

const stampCollector = z.object({
  eventStartDate: z.string(),
  eventEndDate: z.string(),
  productImages: z.array(z.string()),
  pushMessages: z.array(
    z.object({
      message: z.string(),
      collectedStamps: z.array(z.number()),
    })
  ),
  bannedUsers: z.array(z.string()),
});

const cardFlipSchema = z.object({
  eventStartDate: z.string(),
  eventEndDate: z.string(),
  termAndConditionTitle: z.string(),
  termAndCondition: z.string(),
  consolationMessages: z.record(z.array(z.string())),
  notApplicableDates: z.array(z.string()).optional(),
  notApplicableSchemes: z.array(z.string()),
  timeShowGift: z.number().optional(),
  timeOpenGift: z.number().optional(),
  noTurnLeftError: z.string().optional(),
  shareTitle: z.string().optional(),
  shareDescription: z.string().optional(),
  shareThumbnail: z.string().optional(),
  sharePath: z.string().optional(),
});

const merryChristmasSchema = z.object({
  eventStartDate: z.string(),
  eventEndDate: z.string(),
  termAndConditionTitle: z.string(),
  termAndCondition: z.string(),
  consolationMessages: z.record(z.array(z.string())),
  notApplicableDates: z.array(z.string()).optional(),
  notApplicableSchemes: z.array(z.string()),
  timeShowGift: z.number().optional(),
  timeDelayShowResult: z.number().optional(),
  noTurnLeftError: z.string().optional(),
  shareTitle: z.string().optional(),
  shareDescription: z.string().optional(),
  shareThumbnail: z.string().optional(),
  sharePath: z.string().optional(),
  collectionItems: z.array(ChristmasItemSchema).optional(),
});

const gamesSchema = z.object({
  luckyMoney: luckyMoneySchema,
  affiliate: affiliateSchema,
  mixAndMatch: mixAndMatchSchema,
  stampCollector: stampCollector,
  cardFlip: cardFlipSchema,
  merryChristmas: merryChristmasSchema,
  catchRewards: merryChristmasSchema,
});

const schemeCategorySchema = z.object({
  value: z.string(),
  label: z.string(),
  icon: z.string(),
});

const schemePointFilterSchema = z.object({
  value: z.string(),
  label: z.string(),
  range: z.array(z.number()),
});

const tierSchema = z.object({
  name: z.string(),
  key: z.string(),
  title: z.string(),
  description: z.string(),
  textColor: z.string(),
  backgroundColor: z.string(),
  backgroundTextColor: z.string(),
  dripsColor: z.string().optional(),
  dripsBackgroundColor: z.string().optional(),
  background: z.string(),
  logo: z.string(),
  minSpend: z.number(),
  promotionConfig: z.object({
    title: z.string(),
    description: z.string(),
    textAlign: z.enum(["left", "center", "right"]),
  }),
});

const favoriteStoreSchema = z.object({
  value: z.string(),
  label: z.string(),
  children: z.lazy(() => z.array(favoriteStoreSchema)),
});

const favoriteDishSchema = z.object({
  value: z.string(),
  label: z.string(),
  children: z.lazy(() => z.array(favoriteDishSchema)),
});

const homeBannersSchema = z.object({
  image: z.string(),
});

const loyaltySchema = z.object({
  schemeCategoryList: z.array(schemeCategorySchema),
  schemePointFilterList: z.array(schemePointFilterSchema),
  tierList: z.array(tierSchema),
  favoriteStoreList: z.array(favoriteStoreSchema),
  favoriteDishList: z.array(favoriteDishSchema),
  privacyPolicy: z.string(),
  programRules: z.string(),
  homeBanners: z.array(homeBannersSchema),
});

const globalsSchema = z.object({
  appTitle: z.string(),
  appLogo: z.string(),
  systemErrorMessages: z.object({
    osNotSupported: z.string(),
    regionNotSupported: z.string(),
    phoneNumberNotSupported: z.string(),
    networkError: z.string(),
    luckyMoneyEnd: z.string(),
    underConstruction: z.string(),
    maintenance: z.string(),
    outOfCode: z.string(),
    limitRequest: z.string(),
    gameEnd: z.string(),
    gameNotReady: z.string(),
    bannedUser: z.string(),
    cardFlipEnd: z.string(),
    merryChristmasEnd: z.string().optional(),
    requestPermission: z.string(),
    requestAcceptTerms: z.string().optional(),
  }),
  metrics: z.object({
    voucherDetailBarWidth: z.number(),
    voucherGiftBarWidth: z.number(),
  }),
  isUnderConstruction: z.boolean(),
  bannedUsers: z.array(z.string()).optional(),
  osSupported: z.object({
    ios: z.object({
      minVersion: z.number(),
    }),
    android: z.object({
      minVersion: z.number(),
    }),
  }),
  loyalty: loyaltySchema,
  checkVietNamPhoneNumber: z.boolean().optional(),
  globalCss: z.string().optional()
});

export const AppSettingsSchema = z.object({
  games: gamesSchema,
  globals: globalsSchema,
});

export type AppSettings = z.infer<typeof AppSettingsSchema>;
export type ConsolationMessages = z.infer<
  typeof luckyMoneySchema
>["consolationMessages"];
export type Tier = z.infer<typeof tierSchema>;
