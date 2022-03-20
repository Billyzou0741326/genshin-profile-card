import * as yup from 'yup'


export const characterSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().default(''),
  element: yup.string().default(''),
  rarity: yup.number().default(0),
  icon: yup.string().default(''),
  image: yup.string().default(''),
  collab: yup.boolean().default(false),
  level: yup.number().default(0),
  friendship: yup.number().default(1),
})

export interface Character extends yup.InferType<typeof characterSchema> {}
