export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    screens: {
      sm: '640px', // phones
      md: '768px', // tablets
      lg: '1024px', // desktops
      xl: '1280px', // Extra large
    },
    extend: {
      colors: {
        main: '#7241FB',
        red: '#FF3844',
        black: '#222222',
        white: '#FFFFFF',
        gray: '#999999',
        line: '#F8F8F9',
        naverGreen: '#03C75A',
        kakaoYellow: '#FFE500',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
