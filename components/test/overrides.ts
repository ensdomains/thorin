export {}

// Format string with arguments
function sprintf(message: string, args: unknown[]) {
  let i = 0
  return message.replace(/%((%)|s|d)/g, function (m) {
    // m is the matched format, e.g. %s, %d
    let val: string | number = ''
    if (m[2]) {
      val = m[2]
    }
    else {
      val = args[i] as string
      // A switch statement so that the formatter can be extended. Default is %s
      switch (m) {
        case '%d':
          val = parseFloat(val)
          if (Number.isNaN(val)) {
            val = 0
          }
          break
      }
      i++
    }
    return val as string
  })
}

// Force console.error to throw an error
const error = console.error
console.error = function (message, ...args) {
  // eslint-disable-next-line prefer-rest-params
  error.apply(console, Array.from(arguments)) // keep default behaviour
  throw message instanceof Error ? message : new Error(sprintf(message, args))
}
