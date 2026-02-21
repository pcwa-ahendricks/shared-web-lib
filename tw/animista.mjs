const animista = {
  animation: {
    'mista-fade-in':
      'mista-fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both', // https://animista.net/play/entrances/fade-in
    'mista-fade-out': 'mista-fade-out 1s ease-out both', // https://animista.net/play/exits/fade-out
    'mista-scale-in-center':
      'mista-scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both', // https://animista.net/play/entrances/scale-in/scale-in-center
    'mista-slide-in-left':
      'mista-slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both', // https://animista.net/play/entrances/slide-in/slide-in-left
    'mista-text-focus-in':
      'mista-text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both', // https://animista.net/play/text/focus-in
    'mista-shake-bl':
      'mista-shake-bl 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both', // https://animista.net/play/attention/shake/shake-bl
    'mista-rotate-90-cw':
      'mista-rotate-90-cw 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both', // https://animista.net/play/basic/rotate-90/rotate-90-cw
    'mista-rotate-90-ccw':
      'mista-rotate-90-ccw 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both', // https://animista.net/play/basic/rotate-90/rotate-90-ccw
    'mista-rotate-180-cw':
      'mista-rotate-180-cw 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both', // Custom 180 CW degree rotation
    'mista-rotate-180-ccw':
      'mista-rotate-180-ccw 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both' // Custom 180 CCW degree rotation
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
    }
  }
}

export default animista
