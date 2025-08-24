export function makeAbortCtrlRef() {
  const ref = { current: null as AbortController | null } as { current: AbortController | null } & { reset: () => AbortSignal, abort: () => void };
  (ref as any).reset = () => {
    if (ref.current) ref.current.abort();
    ref.current = new AbortController();
    return ref.current.signal;
  };
  (ref as any).abort = () => ref.current?.abort();
  return ref;
}
