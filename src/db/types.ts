import { api } from "convex-utils/api";

type Inner<T> = T extends (infer U)[] ? U : never;

export type List = Inner<typeof api.lists.findAll._returnType>;
export type Item = Inner<typeof api.items.findAll._returnType>;
