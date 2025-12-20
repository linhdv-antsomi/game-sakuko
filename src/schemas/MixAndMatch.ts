import { z } from "zod";

const missionSchema = z.object({
  id: z.number(),
  code: z.string(),
  title: z.string(),
  description: z.string(),
  ingredients: z.array(z.string()), // Assuming ingredients are represented as strings
  correctIngredients: z.array(z.string()), // Assuming correct ingredients are represented as strings
  image: z.string().optional(),
  type: z.enum(["normal", "lto"]),
  availableDates: z.array(z.string()).optional(),
});

const ingredientSchema = z.object({
  key: z.string(),
  title: z.string(),
  image: z.string(),
  color: z.string(),
  sound: z
    .object({
      src: z.string(),
      volume: z.number().optional(),
    })
    .optional(),
});

const mixAndMatchSchema = z.object({
  eventStartDate: z.string(),
  eventEndDate: z.string(),
  termAndCondition: z.string(),
  requestPermissionMessage: z.string().optional(),
  gameEndMessage: z.string().optional(),
  missions: z.array(missionSchema),
  ingredients: z.array(ingredientSchema),
  bonusPlays: z.number().optional(),
  home: z.object({
    introImages: z.array(z.string()).optional(),
  }),
});

export type Mission = z.infer<typeof missionSchema>;
export type MixAndMatch = z.infer<typeof mixAndMatchSchema>;
export type Ingredient = z.infer<typeof ingredientSchema>;

export { mixAndMatchSchema, missionSchema, ingredientSchema };
