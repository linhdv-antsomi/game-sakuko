import { z } from "zod";

// Enum for countdownType
const CountdownTypeEnum = z.enum(["static", "dynamic"]);

// Base schema
const BaseCountdownSchema = z.object({
  countdownType: CountdownTypeEnum,
  storageKeyPrefix: z.string().optional(),
});

// StaticCountdown schema
const StaticCountdownSchema = BaseCountdownSchema.extend({
  countdownType: z.literal("static"),
  endDate: z.string(),
  endTime: z.string(),
  epoch: z.number(),
  timeZone: z.string().optional(),
});

// DynamicCountdown schema
const DynamicCountdownSchema = BaseCountdownSchema.extend({
  countdownType: z.literal("dynamic"),
  days: z.number(),
  hours: z.number(),
  minutes: z.number(),
  seconds: z.number(),
  timeInSeconds: z.number(),
  isRepeat: z.boolean().optional(),
});

// Countdown schema
const CountdownSchema = z.union([
  StaticCountdownSchema,
  DynamicCountdownSchema,
]);

// Types
export type BaseCountdown = z.infer<typeof BaseCountdownSchema>;
export type StaticCountdown = z.infer<typeof StaticCountdownSchema>;
export type DynamicCountdown = z.infer<typeof DynamicCountdownSchema>;
export type Countdown = z.infer<typeof CountdownSchema>;
