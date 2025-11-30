declare global {
  namespace globalThis {
    var testingFFIGen: {
      _print_hello_world: () => void;
    };
  }
}

export {};
