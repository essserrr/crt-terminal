const exhaustiveCheck =
  (msg: string) =>
  (arg: never): never => {
    throw new Error(`${msg}${arg}`);
  };

type Nullable<T> = T | null;

export type { Nullable };
export { exhaustiveCheck };
