import * as yup from "yup";

export const hoyolabSchema = yup.object({
  uid: yup.number().default(0),
  level: yup.number().default(0),
  nickname: yup.string().default("username"),
});
