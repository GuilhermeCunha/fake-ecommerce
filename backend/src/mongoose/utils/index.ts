import { Types } from 'mongoose';

export const toMongooseId = (s?: string | number): Types.ObjectId => {
  if (!s) return;
  return Types.ObjectId(s);
};
export interface ISearchRegexOptions {
  ignoreCase: boolean;
  globalSearch: boolean;
}
export function getStringSearchRegex(
  value: string,
  options: ISearchRegexOptions = { ignoreCase: true, globalSearch: false },
): RegExp {
  let flags = '';
  if (options.ignoreCase === true) flags += 'i';
  if (options.globalSearch === true) flags += 'g';

  const regex = new RegExp(value, flags);

  return regex;
}
