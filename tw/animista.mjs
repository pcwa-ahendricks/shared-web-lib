const animista = {
  animation: {
    'mista-fade-in':
      'mista-fade-in var(--tw-animation-duration, var(--tw-duration, 1.2s)) var(--tw-ease, cubic-bezier(0.390, 0.575, 0.565, 1.000)) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, both)', // https://animista.net/play/entrances/fade-in
    'mista-fade-out':
      'mista-fade-out var(--tw-animation-duration, var(--tw-duration, 1s)) var(--tw-ease, ease-out) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, both)', // https://animista.net/play/exits/fade-out
    'mista-scale-in-center':
      'mista-scale-in-center var(--tw-animation-duration, var(--tw-duration, 0.5s)) var(--tw-ease, cubic-bezier(0.250, 0.460, 0.450, 0.940)) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, both)', // https://animista.net/play/entrances/scale-in/scale-in-center
    'mista-slide-in-left':
      'mista-slide-in-left var(--tw-animation-duration, var(--tw-duration, 0.5s)) var(--tw-ease, cubic-bezier(0.250, 0.460, 0.450, 0.940)) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, both)', // https://animista.net/play/entrances/slide-in/slide-in-left
    'mista-text-focus-in':
      'mista-text-focus-in var(--tw-animation-duration, var(--tw-duration, 1s)) var(--tw-ease, cubic-bezier(0.550, 0.085, 0.680, 0.530)) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, both)', // https://animista.net/play/text/focus-in
    'mista-shake-bl':
      'mista-shake-bl var(--tw-animation-duration, var(--tw-duration, 0.8s)) var(--tw-ease, cubic-bezier(0.455, 0.030, 0.515, 0.955)) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, both)', // https://animista.net/play/attention/shake/shake-bl
    'mista-shake-bottom':
      'mista-shake-bottom var(--tw-animation-duration, var(--tw-duration, 0.8s)) var(--tw-ease, cubic-bezier(0.455, 0.030, 0.515, 0.955)) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, both)', // https://animista.net/play/attention/shake/shake-bottom
    'mista-rotate-90-cw':
      'mista-rotate-90-cw var(--tw-animation-duration, var(--tw-duration, 0.4s)) var(--tw-ease, cubic-bezier(0.250, 0.460, 0.450, 0.940)) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, both)', // https://animista.net/play/basic/rotate-90/rotate-90-cw
    'mista-rotate-90-ccw':
      'mista-rotate-90-ccw var(--tw-animation-duration, var(--tw-duration, 0.4s)) var(--tw-ease, cubic-bezier(0.250, 0.460, 0.450, 0.940)) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, both)', // https://animista.net/play/basic/rotate-90/rotate-90-ccw
    'mista-rotate-180-cw':
      'mista-rotate-180-cw var(--tw-animation-duration, var(--tw-duration, 0.4s)) var(--tw-ease, cubic-bezier(0.250, 0.460, 0.450, 0.940)) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, both)', // Custom 180 CW degree rotation
    'mista-rotate-180-ccw':
      'mista-rotate-180-ccw var(--tw-animation-duration, var(--tw-duration, 0.4s)) var(--tw-ease, cubic-bezier(0.250, 0.460, 0.450, 0.940)) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, both)', // Custom 180 CCW degree rotation
    'mista-slide-in-fwd-left':
      'mista-slide-in-fwd-left var(--tw-animation-duration, var(--tw-duration, 0.4s)) var(--tw-ease, cubic-bezier(0.250, 0.460, 0.450, 0.940)) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, both)', // https://animista.net/play/entrances/slide-in-fwd/slide-in-fwd-left
    'mista-slide-in-fwd-right':
      'mista-slide-in-fwd-right var(--tw-animation-duration, var(--tw-duration, 0.4s)) var(--tw-ease, cubic-bezier(0.250, 0.460, 0.450, 0.940)) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, both)', // https://animista.net/play/entrances/slide-in-fwd/slide-in-fwd-right
    'mista-slide-in-elliptic-left-fwd':
      'mista-slide-in-elliptic-left-fwd var(--tw-animation-duration, var(--tw-duration, 0.7s)) var(--tw-ease, cubic-bezier(0.250, 0.460, 0.450, 0.940)) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, both)', // https://animista.net/play/entrances/slide-in-elliptic/slide-in-elliptic-left-fwd
    'mista-wobble-ver-left':
      'mista-wobble-ver-left var(--tw-animation-duration, var(--tw-duration, 0.8s)) var(--tw-ease, cubic-bezier(0.455, 0.030, 0.515, 0.955)) var(--tw-animation-delay, 0s) var(--tw-animation-fill-mode, both)' // https://animista.net/play/attention/wobble/wobble-ver-left
  },
  keyframes: {
    // https://animista.net/play/entrances/fade-in
    'mista-fade-in': {
      '0%': {opacity: '0'},
      to: {opacity: '1'}
    },
    // https://animista.net/play/exits/fade-out
    'mista-fade-out': {
      '0%': {opacity: '1'},
      to: {opacity: '0'}
    },
    // https://animista.net/play/entrances/scale-in/scale-in-center
    'mista-scale-in-center': {
      '0%': {
        transform: 'scale(0)',
        opacity: '1'
      },
      '100%': {
        transform: 'scale(1)',
        opacity: '1'
      }
    },
    // https://animista.net/play/entrances/slide-in/slide-in-left
    'mista-slide-in-left': {
      '0%': {
        transform: 'translateX(-1000px)',
        opacity: '0'
      },
      '100%': {
        transform: 'translateX(0)',
        opacity: '1'
      }
    },
    // https://animista.net/play/text/focus-in
    'mista-text-focus-in': {
      '0%': {
        filter: 'blur(12px)',
        opacity: '0'
      },
      '100%': {
        filter: 'blur(0px)',
        opacity: '1'
      }
    },
    // https://animista.net/play/attention/shake/shake-bl
    'mista-shake-bl': {
      '0%, 100%': {
        transform: 'rotate(0deg)',
        transformOrigin: '0 100%'
      },
      '10%': {
        transform: 'rotate(2deg)'
      },
      '20%, 40%, 60%': {
        transform: 'rotate(-4deg)'
      },
      '30%, 50%, 70%': {
        transform: 'rotate(4deg)'
      },
      '80%': {
        transform: 'rotate(-2deg)'
      },
      '90%': {
        transform: 'rotate(2deg)'
      }
    },
    // https://animista.net/play/attention/shake/shake-bottom
    'mista-shake-bottom': {
      '0%, 100%': {
        transform: 'rotate(0deg)',
        transformOrigin: '50% 100%'
      },
      '10%': {
        transform: 'rotate(2deg)'
      },
      '20%, 40%, 60%': {
        transform: 'rotate(-4deg)'
      },
      '30%, 50%, 70%': {
        transform: 'rotate(4deg)'
      },
      '80%': {
        transform: 'rotate(-2deg)'
      },
      '90%': {
        transform: 'rotate(2deg)'
      }
    },
    // https://animista.net/play/basic/rotate-90/rotate-90-cw
    'mista-rotate-90-cw': {
      '0%': {
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(90deg)'
      }
    },
    // https://animista.net/play/basic/rotate-90/rotate-90-ccw
    'mista-rotate-90-ccw': {
      '0%': {
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(-90deg)'
      }
    },
    // Custom 180 CW degree rotation
    'mista-rotate-180-cw': {
      '0%': {
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(180deg)'
      }
    },
    // Custom 180 CCW degree rotation
    'mista-rotate-180-ccw': {
      '0%': {
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(-180deg)'
      }
    },
    // https://animista.net/play/entrances/slide-in-fwd/slide-in-fwd-left
    'mista-slide-in-fwd-left': {
      '0%': {
        transform: 'translateZ(-1400px) translateX(-1000px)',
        opacity: '0'
      },
      '100%': {
        transform: 'translateZ(0) translateX(0)',
        opacity: '1'
      }
    },
    // https://animista.net/play/entrances/slide-in-fwd/slide-in-fwd-right
    'mista-slide-in-fwd-right': {
      '0%': {
        transform: 'translateZ(-1400px) translateX(1000px)',
        opacity: '0'
      },
      '100%': {
        transform: 'translateZ(0) translateX(0)',
        opacity: '1'
      }
    },
    // https://animista.net/play/entrances/slide-in-elliptic/slide-in-elliptic-left-fwd
    'mista-slide-in-elliptic-left-fwd': {
      '0%': {
        transform: 'translateX(-800px) rotateY(30deg) scale(0)',
        transformOrigin: '-100% 50%',
        opacity: '0'
      },
      '100%': {
        transform: 'translateX(0) rotateY(0) scale(1)',
        transformOrigin: '1800px 50%',
        opacity: '1'
      }
    },
    // https://animista.net/play/attention/wobble/wobble-ver-left
    'mista-wobble-ver-left': {
      '0%, 100%': {
        transform: 'translateY(0) rotate(0)',
        transformOrigin: '50% 50%'
      },
      '15%': {transform: 'translateY(-30px) rotate(-6deg)'},
      '30%': {transform: 'translateY(15px) rotate(6deg)'},
      '45%': {transform: 'translateY(-15px) rotate(-3.6deg)'},
      '60%': {transform: 'translateY(9px) rotate(2.4deg)'},
      '75%': {transform: 'translateY(-6px) rotate(-1.2deg)'}
    }
  }
}

export default animista
