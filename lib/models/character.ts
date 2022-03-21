import * as yup from "yup";

const artifactSchema = yup.object({
  id: yup.number().default(0),
  icon: yup.string().url().default(""),
  name: yup.string().default(""),
  pos_name: yup.string().default(""),
  pos: yup.number().default(0),
  rarity: yup.number().default(0),
  level: yup.number().default(0),
  set: yup
    .object({
      id: yup.number().default(0),
      name: yup.string().default(""),
    })
    .default({})
    .nullable(),
});

const constellation = yup.object({
  id: yup.number().default(0),
  icon: yup.string().url().default(""),
  pos: yup.number().default(0),
  name: yup.string().default(""),
  effect: yup.string().default(""),
  activated: yup.boolean().default(false),
  scaling: yup.boolean().default(true),
});

export const characterSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().default(""),
  element: yup.string().default(""),
  rarity: yup.number().default(0),
  icon: yup.string().default(""),
  image: yup.string().default(""),
  collab: yup.boolean().default(false),
  level: yup.number().default(0),
  friendship: yup.number().default(1),
  artifacts: yup.array(artifactSchema).default([]),
  constellations: yup.array(constellation).default([]),
});

export interface Character extends yup.InferType<typeof characterSchema> {}

export interface Artifact extends yup.InferType<typeof artifactSchema> {}
