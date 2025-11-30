import React, { useCallback, useMemo, useState } from 'react';

import { init as ffiInit } from 'testing-ffigen/src/index';

export function App() {
  const JsApi = useMemo(() => {
    return ffiInit(globalThis);
  }, []);
  const [count, setCount] = useState(0);
  const handleClose = useCallback(() => {
    JsApi.print_hello_world();
  }, [JsApi]);
  return (
    <window title="My App">
      <text>Welcome to my ImGui + React app!</text>
      <separator />
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={handleClose}>Close</button>
      <text>Count: {count}</text>
    </window>
  );
}
