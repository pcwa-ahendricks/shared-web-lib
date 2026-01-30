const animista = {
  animation: {
    'mista-fade-in':
      'mista-fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both', // https://animista.net/play/entrances/fade-in
    'mista-fade-out': 'mista-fade-out 1s ease-out both', // https://animista.net/play/exits/fade-out
    'mista-scale-in-center':
      'mista-scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both', // https://animista.net/play/entrances/scale-in/scale-in-center
    'mista-slide-in-left':
      'mista-slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both' // https://animista.net/play/entrances/slide-in/slide-in-left
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
    }
  }
}

export default animista
