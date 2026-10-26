import type { gsap as GSAP } from "gsap";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";

export type Gsap = typeof GSAP;
export type ScrollTriggerType = typeof ST;

let loading: Promise<{ gsap: Gsap; ScrollTrigger: ScrollTriggerType }> | null = null;

/**
 * Lazily loads GSAP + ScrollTrigger after hydration (keeps ~42 KB gzip off the critical path)
 * and registers the plugin exactly once for the whole app.
 */
export function loadGsap() {
  loading ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, st]) => {
    g.gsap.registerPlugin(st.ScrollTrigger);
    st.ScrollTrigger.config({ ignoreMobileResize: true });
    return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger };
  });
  return loading;
}
