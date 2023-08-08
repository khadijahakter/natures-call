/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        boxShadow: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
        // 'tile': "url('https://img.freepik.com/free-photo/white-tiles-wall_74190-5379.jpg?w=826&t=st=1691271597~exp=1691272197~hmac=4f0454599971996886a9050f8c9239325fbaa155e2c60ba59f44fe06e6759475')",
      },
    },
  },
  plugins: [],
}

