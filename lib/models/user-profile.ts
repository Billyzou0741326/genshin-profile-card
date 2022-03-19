import * as yup from 'yup'


export const userProfileSchema = yup.object({
  username: yup.string().default(''),
  level: yup.number().moreThan(0).default(0),
  uid: yup.number().moreThan(-1).default(0),

  daysActive: yup.number().moreThan(-1).default(0),
  characterCount: yup.number().moreThan(-1).default(0),
  achievements: yup.number().default(0),
  spiralAbyss: yup.string().default('-'),
})

export interface UserProfile extends yup.InferType<typeof userProfileSchema> {}
