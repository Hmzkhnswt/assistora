import { useId } from "react";

/**
 * Per-instance SVG id (gradients, masks). Hard-coded ids collide when a component renders more
 * than once: url(#id) resolves to the FIRST match, and if that copy sits in a display:none
 * subtree (e.g. the desktop mosaic on phones) the reference silently fails to paint.
 * Works in both Server and Client Components and is stable across hydration.
 */
export function useSvgId(prefix: string) {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
}
