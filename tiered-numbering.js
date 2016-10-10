module.exports = (function () {
  // Private properties
  var length = {}
  var delim = {}

  return function Outline (str, type) {
    // Math utility functions
    function math (inObj, opperand) {
      if (typeof inObj === 'string') {
        inObj = Outline(inObj)
      }

      padArray()
      var inCache = array.slice()
      var out = inObj.array.slice()

      switch (opperand) {
        case '+':
          for (var i = 0; i < out.length; i++) {
            out[i] += inCache[i]
          }
          break
        case '-':
          for (var i = 0; i < out.length; i++) {
            out[i] = inCache[i] - out[i]
          }
          break
        case '*':
          for (var i = 0; i < out.length; i++) {
            out[i] = out[i] * inCache[i]
          }
          break
        case 'div':
          for (var i = 0; i < out.length; i++) {
            out[i] = out[i] / inCache[i]
          }
          break
        default:
          return

      }
      return Outline(out, type)
    }

    // Function to pad shorter arrays
    function padArray () {
      if (array.length < length[type]) {
        array = array.concat(new Array(length[type] - array.length).fill(0))
      }
    }

    if (!type) {
      type = 'default'
    }
    var array
    if (typeof str === 'string') {
      if (!delim[type]) {
        delim[type] = str.match(/[^0-9]+/) ? str.match(/[^0-9]+/)[0] : '.'
      }
      array = str.match(/\d+/g)
    } else if (Array.isArray(str)) {
      array = str
    }

    for (var i = 0; i < array.length; i++) {
      array[i] = Number(array[i])
    }

    var shortArray = array

    if (!length[type]) {
      length[type] = 0
    }
    if (array.length > length[type]) {
      length[type] = array.length
    }

    var obj = {
      type: type,

      // accessor functions for
      get depth () {
        return length[type]
      },
      set depth (num) {
        if (num > length[type]) {
          length[type] = num
        }
      },

      // accessor functions for delimiters
      get delim () {
        return delim[type]
      },
      set delim (str) {
        delim[type] = str
      },

      shortArray: shortArray,
      get array () {
        padArray()
        return array
      },

      // string output
      get string () {
        return shortArray.join(delim[type])
      },

      add: function (inObj) {
        return math(inObj, '+')
      },
      subtract: function (inObj) {
        return math(inObj, '-')
      },
      multiply: function (inObj) {
        return math(inObj, '*')
      },
      divide: function (inObj) {
        return math(inObj, 'div')
      },
      increment: function (lvlNum) {
        if (lvlNum === undefined) {
          lvlNum = shortArray.length - 1
        }
        array[lvlNum]++
        return this
      },
      decrement: function (lvlNum) {
        if (lvlNum === undefined) {
          lvlNum = shortArray.length - 1
        }
        array[lvlNum]--
        return this
      },
      subincrement: function () {
        var lvlNum = shortArray.length
        if (lvlNum > array.length) {
          this.depth++
        }
        array[lvlNum] = 1
        return this
      },
      compare: function (inObj) {
        if (typeof inObj === 'string') {
          inObj = Outline(inObj)
        }
        aArray = this.array
        bArray = inObj.array
        for (var i = 0; i < aArray.length; i++) {
          if (aArray[i] === bArray[i]) { continue }
          else return aArray[i] - bArray[i]
        }
        return 0
      }

    }
    return obj
  } })()
