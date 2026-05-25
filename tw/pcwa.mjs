const pcwa = {
  animation: {
    'pcwa-fade-in-from-top':
      'pcwa-fade-in-from-top var(--tw-animation-duration, var(--tw-duration, 0.8s)) var(--tw-ease, ease) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, forwards)',
    'pcwa-fade-in-from-bottom':
      'pcwa-fade-in-from-bottom var(--tw-animation-duration, var(--tw-duration, 0.8s)) var(--tw-ease, ease) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, forwards)',
    'pcwa-fade-out-from-top':
      'pcwa-fade-out-from-top var(--tw-animation-duration, var(--tw-duration, 0.8s)) var(--tw-ease, ease) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, forwards)',
    'pcwa-fade-out-from-bottom':
      'pcwa-fade-out-from-bottom var(--tw-animation-duration, var(--tw-duration, 0.8s)) var(--tw-ease, ease) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, forwards)',
    'pcwa-text-focus-in-opaque':
      'pcwa-text-focus-in-opaque var(--tw-animation-duration, var(--tw-duration, 0.8s)) var(--tw-ease, cubic-bezier(0.550, 0.085, 0.680, 0.530)) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, both)'
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
    },
    'pcwa-fade-out-from-top': {
      '0%': {
        opacity: '1',
        maskImage: 'linear-gradient(to top, black 0%, black 100%)'
      },
      '100%': {
        opacity: '0',
        maskImage: 'linear-gradient(to top, transparent 0%, black 100%)'
      }
    },
    'pcwa-fade-out-from-bottom': {
      '0%': {
        opacity: '1',
        maskImage: 'linear-gradient(to bottom, black 0%, black 100%)'
      },
      '100%': {
        opacity: '0',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)'
      }
    },
    'pcwa-text-focus-in-opaque': {
      '0%': {filter: 'blur(12px)'},
      '100%': {filter: 'blur(0px)'}
    }
  }
}

export default pcwa
