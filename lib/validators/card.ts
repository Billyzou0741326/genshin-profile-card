import * as yup from 'yup'
import * as models from '../models'


export const cardSchema = yup.object({
  hoyolab: models.hoyolabSchema.default(models.hoyolabSchema.getDefault()),
  stats: models.gameStatsSchema.default(models.gameStatsSchema.getDefault()),
  characters: yup.array(models.characterSchema).default([]),
  explorations: yup.array(models.explorationSchema).default([]),
  teapot: models.teapotSchema.default(models.teapotSchema.getDefault()),
})
