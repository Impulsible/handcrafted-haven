declare module 'react/jsx-runtime' {
  import type { ReactElement} from 'react';

  export function jsx(
    type: React.ElementType,
    props: Record<string, unknown>,
    key?: string | number | null
  ): ReactElement;

  export function jsxs(
    type: React.ElementType,
    props: Record<string, unknown>,
    key?: string | number | null
  ): ReactElement;

  export const Fragment: React.ElementType;
}