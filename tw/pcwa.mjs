const pcwa = {
  animation: {
    'pcwa-fade-in-from-top':
      'pcwa-fade-in-from-top var(--tw-animation-duration, var(--tw-duration, 1s)) var(--tw-ease, ease) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, forwards)',
    'pcwa-fade-in-from-bottom':
      'pcwa-fade-in-from-bottom var(--tw-animation-duration, var(--tw-duration, 1s)) var(--tw-ease, ease) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, forwards)'
  },
  keyframes: {
    'pcwa-fade-in-from-top': {
      '0%': {
        opacity: '0',
        maskImage: 'linear-gradient(to top, transparent 0%, black 100%)'
      },
      '100%': {
        opacity: '1',
        maskImage: 'linear-gradient(to top, black 0%, black 100%)'
      }
    },
    'pcwa-fade-in-from-bottom': {
      '0%': {
        opacity: '0',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)'
      },
      '100%': {
        opacity: '1',
        maskImage: 'linear-gradient(to bottom, black 0%, black 100%)'
      }
    }
  }
}

export default pcwa
