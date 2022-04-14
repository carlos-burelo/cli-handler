interface Flags {
  [key: string]: boolean;
}

export interface Directive {
  path: string;
  description?: string;
  input?: boolean;
  children?: Directive[];
  handler?: (value: string | boolean, flags: Flags | {}) => void;
  flags?: string[];
}
export type Handler = (value: string | boolean, flags: Flags | {}) => void;

const inputRe = '(?<value>[^\\s]+)';

function match(regex: RegExp, ctx: string) {
  const result = regex.exec(ctx);
  if (result?.groups) return result?.groups?.value;
  return result && (result[1] || true);
}
function matchFlags(flags: string[], context: string) {
  const res: any = {};
  for (const flag of flags) {
    const flagName = flag.replace('$', '');
    if (flag.includes('$')) {
      const flagRe = new RegExp(`-?-${flagName}[=\\s]${inputRe}`);
      const result = flagRe.exec(context);
      result && (res[flagName] = result[1] || true);
    } else {
      const flagRe = new RegExp(`-?-${flagName}`);
      const result = flagRe.exec(context);
      res[flag] = result ? true : false;
    }
  }
  return res;
}
function rx(path: string, prop?: boolean) {
  return new RegExp(`${path} ${prop ? inputRe : ''}`);
}

export function parse(
  args: Directive[],
  ctx: string = process.argv.slice(2).join(' ')
) {
  for (const { path, children, input, handler, flags } of args) {
    if (children) {
      for (const child of children) {
        const res = match(rx(`(${path}) (${child.path})`, child.input), ctx);
        const _flags = child.flags ? matchFlags(child.flags, ctx) : {};
        res && child.handler && child.handler(res, _flags);
      }
    } else {
      const res = match(rx(path, input), ctx);
      const _flags = flags ? matchFlags(flags, ctx) : {};
      res && handler && handler(res, _flags);
    }
  }
}
