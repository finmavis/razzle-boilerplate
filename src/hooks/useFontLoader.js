import { useEffect } from 'react';

export default function useFontLoader(config) {
  useEffect(() => {
    /**
     *  We use dynamic import to prevent "window is not defined" error
     */
    import('webfontloader').then(WebFontLoader => {
      WebFontLoader.load({
        ...config,
      });
    });
  }, [config]);
}
