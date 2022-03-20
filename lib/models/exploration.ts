import * as yup from "yup";

export const explorationSchema = yup.object({
  id: yup.number().moreThan(-1).default(0),
  icon: yup.string().default(""),
  name: yup.string().default(""),
  type: yup.string().default(""),
  level: yup.number().moreThan(-1).default(0),
  explored: yup.number().moreThan(-1).default(0),
  percentage: yup.number().moreThan(-1).default(0),
});

export interface Exploration extends yup.InferType<typeof explorationSchema> {}
