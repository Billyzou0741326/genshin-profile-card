import * as yup from "yup";

export const teapotRealmSchema = yup.object({
  id: yup.number().moreThan(-1).default(0),
  name: yup.string().default(""),
  icon: yup.string().default(""),
});

export interface TeapotRealm extends yup.InferType<typeof teapotRealmSchema> {
  id: number;
  name: string;
  icon: string;
}

export const teapotSchema = yup.object({
  level: yup.number().moreThan(-1).default(0),
  visitors: yup.number().moreThan(-1).default(0),
  comfort: yup.number().moreThan(-1).default(0),
  items: yup.number().moreThan(-1).default(0),
  comfort_name: yup.string().default(""),
  comfort_icon: yup.string().default(""),
  realms: yup.array(teapotRealmSchema).default([]),
});

export interface Teapot extends yup.InferType<typeof teapotSchema> {}
