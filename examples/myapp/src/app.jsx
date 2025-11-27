import React, { useState } from 'react';

export function App() {
  const [count, setCount] = useState(0);

  console.log(window);

  return (
    <window title="My App">
      <text>Welcome to my ImGui + React app!</text>
      <separator />
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <text>Count: {count}</text>
    </window>
  );
}
