// https://animate.style

const animateCss = {
  animation: {
    'css-tada': 'css-tada var(--tw-animation-duration, var(--tw-duration, 1s)) var(--tw-ease, ease) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, none)'
  },
  keyframes: {
    'css-tada': {
      from: {
        transform: 'scale3d(1, 1, 1)'
      },
      '10%, 20%': {
        transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)'
      },
      '30%, 50%, 70%, 90%': {
        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)'
      },
      '40%, 60%, 80%': {
        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)'
      },
      to: {
        transform: 'scale3d(1, 1, 1)'
      }
    }
  }
}

export default animateCss
