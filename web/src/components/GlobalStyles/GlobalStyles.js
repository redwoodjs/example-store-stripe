/**
 * Josh's Custom CSS Reset
 * https://www.joshwcomeau.com/css/custom-css-reset/
 */
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  /*
    1. Use a more-intuitive box-sizing model.
  */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /*
    2. Remove default margin
  */
  * {
    margin: 0;
  }

  /*
    3. Allow percentage-based heights in the application
  */
  html, body, #redwood-app {
    height: 100%;
  }

  /*
    Typographic tweaks!
    4. Add accessible line-height
    5. Improve text rendering
  */
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  /*
    6. Improve media defaults
  */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  /*
    7. Remove built-in form typography styles
  */
  input, button, textarea, select {
    font: inherit;
  }

  /*
    8. Avoid text overflows
  */
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  /*
    9. Create a root stacking context
  */
  #redwood-app {
    isolation: isolate;
  }

  /*
    ------------------------
    Design system
    ------------------------
  */
  :root {
    --link: #7955ca;
    --padding: var(--size-3);


    /*
      Color pallette
    */
    --primary: #7955ca;
    --primary-tint: #D6B7D7;
    /* --secondary: #43FCFD; */
    --secondary: var(--gray-6);
    --white: #fff;
    --black: #0a0a0a;
    --gray-light: var(--gray-1);
    --gray-dark: var(--gray-5);

    /*
      Brand colors
    */
    --redwood: #bf4722;
    --stripe: #635aff;

    --brand-gradient: linear-gradient(-45deg, rgba(191,71,34,1) 0%, rgba(99,90,255,1) 100%);

    /*
      Constants
    */
    --shadow: var(--shadow-4);
  }

  body {
    font-family: var(--font-sans);
    background-color: var(--gray-0);
  }

  h2 {
    color: var(--primary);
  }
`

export default GlobalStyles
