/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    // The `screens` property in the Tailwind CSS configuration file is used to define custom breakpoints for responsive design. 
    screens: {
      'fold': '350px', //@media (min-width: 340px) { ... }
      'sm': '640px', //@media (min-width: 640px) { ... }
      'md': '768px', //@media (min-width: 768px) { ... }
      'lg': '1024px',	//@media (min-width: 1024px) { ... }
      'xl': '1280px',	//@media (min-width: 1280px) { ... }
      '2xl': '1536px',	//@media (min-width: 1536px) { ... }
    },
    // The `fontFamily` property in the Tailwind CSS configuration file is used to define custom font families that can be used in your project. 
    fontFamily: {
      'sans': ['Quicksand', 'sans-serif'],
      'display': ['Varela Round', 'sans-serif'],
      'cursive': ['MuseoModerno', 'cursive']
    },
    extend: {},
  },
  plugins: [],
}

