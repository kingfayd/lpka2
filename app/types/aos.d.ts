declare module "aos" {
    interface AOSOptions {
      duration?: number;
      once?: boolean;
      easing?: string;
      offset?: number;
      delay?: number;
      anchor?: string;
      anchorPlacement?: string;
      mirror?: boolean;
      disable?: string | boolean;
      startEvent?: string;
      animatedClassName?: string;
      initClassName?: string;
      useClassNames?: boolean;
      disableMutationObserver?: boolean;
      debounceDelay?: number;
      throttleDelay?: number;
    }
  
    const AOS: {
      init(options?: AOSOptions): void;
      refresh(): void;
      refreshHard(): void;
      destroy(): void;
    };
  
    export default AOS;
  }