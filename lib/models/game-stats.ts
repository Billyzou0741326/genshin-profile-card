import * as yup from "yup";

export const gameStatsSchema = yup.object({
  days_active: yup.number().moreThan(-1).default(0),
  characters: yup.number().moreThan(-1).default(0),
  achievements: yup.number().default(0),
  spiral_abyss: yup.string().default("-"),

  anemoculi: yup.number().moreThan(-1).default(0),
  geoculi: yup.number().moreThan(-1).default(0),
  electroculi: yup.number().moreThan(-1).default(0),

  common_chests: yup.number().moreThan(-1).default(0),
  exquisite_chests: yup.number().moreThan(-1).default(0),
  precious_chests: yup.number().moreThan(-1).default(0),
  luxurious_chests: yup.number().moreThan(-1).default(0),
  remarkable_chests: yup.number().moreThan(-1).default(0),

  unlocked_waypoints: yup.number().moreThan(-1).default(0),
  unlocked_domains: yup.number().moreThan(-1).default(0),
});

export interface GameStats extends yup.InferType<typeof gameStatsSchema> {}
