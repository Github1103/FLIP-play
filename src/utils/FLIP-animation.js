import { nextTick } from 'vue'

export function FLIPAnimation(doms, change, options) {
  options = getOptions(options)

  // First
  const firstStatuses = getElementStatuses(doms)

  change()

  nextTick(() => {
    // Last
    const lastStatuses = getElementStatuses(doms)

    doms.forEach((dom, domIndex) => {
      // invert
      const keyframes = getInvertKeyframes(firstStatuses[domIndex], lastStatuses[domIndex])

      // play
      play(dom, keyframes, options.transition)
    })
  })
}

function getOptions(options) {
  const defaultOptions = {
    transition: {
      duration: 200,
      easing: 'cubic-bezier(0, 0, 0.32, 1)',
    },
  }
  return Object.assign(defaultOptions, options)
}

function play(dom, keyframes, transition) {
  dom.animate(keyframes, transition)
}

function getInvertKeyframes(firstStatus, lastStatus) {
  const invert = {
    top: firstStatus.top - lastStatus.top,
    left: firstStatus.left - lastStatus.left,
  }

  const keyframes = [
    {
      transform: `translate(${invert.left}px, ${invert.top}px)`,
      opacity: firstStatus.opacity,
    },
    {
      transform: 'none',
      opacity: lastStatus.opacity,
    },
  ]

  return keyframes
}

function getElementStatuses(doms) {
  return doms.map((dom) => {
    const { opacity } = window.getComputedStyle(dom)
    const { top, left } = dom.getBoundingClientRect()
    return { top, left, opacity: opacity || 1 }
  })
}
