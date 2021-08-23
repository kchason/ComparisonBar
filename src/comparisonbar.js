(function ($) {
  $.fn.comparisonbar = function (options) {
    this.each(function () {
      // Get dimensions of frame
      const element = $(this)
      const elementWidth = element.width()
      const elementHeight = element.height()
      // Set default options
      const settings = $.extend(
        {
          barHeight: 10,
          barFillColor: 'rgb(242, 244, 247)',
          barBorderColor: 'rgb(215, 223, 234)',
          barBorderWeight: 1,
          valueFillColor: 'rgb(153, 153, 153)',
          value: 0,
          minValue: 0,
          maxValue: 100,
          showMinMax: true,
          minMaxLineColor: 'rgb(215, 223, 234)',
          minMaxTextColor: 'rgb(215, 223, 234)',
          markers: {},
          zones: {},
          topMarkerValue: null,
          topMarkerColor: 'purple',
          bottomMarkerValue: null,
          bottomMarkerColor: 'purple'
        }, options, element.data())

      // Define namespace
      const namespace = 'http://www.w3.org/2000/svg'
      const svg = document.createElementNS(namespace, 'svg')
      $(svg).attr({
        width: elementWidth + 'px',
        height: elementHeight + 'px',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink'
      })
      // Set grid system for building elements
      svg.setAttribute('viewBox', '0 0 ' + elementWidth + ' ' + elementHeight)

      // EMPTY BAR
      const bar = document.createElementNS(namespace, 'rect')
      $(bar).attr({
        x: Math.round(0.05 * elementWidth),
        y: Math.round((elementHeight - settings.barHeight) / 2),
        height: settings.barHeight,
        width: Math.round(0.9 * elementWidth)
      }).css({
        fill: settings.barFillColor,
        stroke: settings.barBorderColor,
        'stroke-width': settings.barBorderWeight
      })
      // Add bar to SVG
      $(svg).append(bar)

      // FILL BAR
      let barFillPercentage = ((settings.value - settings.minValue) / (settings.maxValue - settings.minValue))
      // Normalize percentage
      if (barFillPercentage > 1) {
        barFillPercentage = 1
      }
      if (barFillPercentage < 0) {
        barFillPercentage = 0
      }
      // Create object
      const barFill = document.createElementNS(namespace, 'rect')
      $(barFill).attr({
        x: Math.round(0.05 * elementWidth),
        y: Math.round((elementHeight - settings.barHeight) / 2),
        height: settings.barHeight,
        width: Math.round(0.9 * elementWidth * barFillPercentage)
      }).css({
        fill: settings.valueFillColor,
        stroke: settings.barBorderColor,
        'stroke-width': settings.barBorderWeight
      })
      // Add bar fill to SVG
      $(svg).append(barFill)

      // MIN & MAX VALUES
      if (settings.showMinMax) {
        // Create lines and values
        const minLine = document.createElementNS(namespace, 'line')
        const maxLine = document.createElementNS(namespace, 'line')

        $(minLine).attr({
          x1: Math.round(0.05 * elementWidth),
          y1: Math.round((elementHeight - settings.barHeight) / 2) + settings.barHeight,
          x2: Math.round(0.05 * elementWidth),
          y2: Math.round((elementHeight - settings.barHeight) / 2) + settings.barHeight + 5
        }).css({
          stroke: settings.minMaxLineColor,
          'stroke-width': settings.barBorderWeight
        })

        $(maxLine).attr({
          x1: Math.round(0.95 * elementWidth),
          y1: Math.round((elementHeight - settings.barHeight) / 2) + settings.barHeight,
          x2: Math.round(0.95 * elementWidth),
          y2: Math.round((elementHeight - settings.barHeight) / 2) + settings.barHeight + 5
        }).css({
          stroke: settings.minMaxLineColor,
          'stroke-width': settings.barBorderWeight
        })

        // Add text
        const minLabel = document.createElementNS(namespace, 'text')
        const maxLabel = document.createElementNS(namespace, 'text')

        $(minLabel).attr({
          x: Math.round(0.05 * elementWidth),
          y: Math.round((elementHeight - settings.barHeight) / 2) + settings.barHeight + 17
        }).css({
          fill: settings.minMaxTextColor
        })
        minLabel.textContent = settings.minValue

        $(maxLabel).attr({
          x: Math.round(0.95 * elementWidth) - (settings.maxValue.toString().length * 5),
          y: Math.round((elementHeight - settings.barHeight) / 2) + settings.barHeight + 17
        }).css({
          fill: settings.minMaxTextColor
        })
        maxLabel.textContent = settings.maxValue

        // Add to SVG
        $(svg).append(minLine)
        $(svg).append(maxLine)
        $(svg).append(minLabel)
        $(svg).append(maxLabel)
      }

      // ZONES
      $.each(settings.zones, function (key, value) {
        // Merge with defaults
        const zoneSettings = $.extend(
          {
            position: 'top',
            color: 'rgb(215, 223, 234)',
            min: 0,
            max: 0,
            weight: 3
          }, value)
        // Calculate height and initialize the variable
        let zoneY
        if (zoneSettings.position === 'top') {
          zoneY = Math.round((elementHeight - settings.barHeight) / 2)
        } else {
          zoneY = Math.round((elementHeight - settings.barHeight) / 2) + settings.barHeight
        }

        // Calculate start and stop
        let startX = ((zoneSettings.min - settings.minValue) / (settings.maxValue - settings.minValue))
        let endX = ((zoneSettings.max - settings.minValue) / (settings.maxValue - settings.minValue))
        // Ensure they're in the range
        if (startX < 0) { startX = 0 }
        if (startX > 1) { startX = 1 }
        if (endX < 0) { endX = 0 }
        if (endX > 1) { endX = 1 }
        // Create line
        const zoneLine = document.createElementNS(namespace, 'line')

        $(zoneLine).attr({
          x1: Math.round(startX * 0.90 * elementWidth) + Math.round(0.05 * elementWidth),
          y1: zoneY,
          x2: Math.round(endX * 0.90 * elementWidth) + Math.round(0.05 * elementWidth),
          y2: zoneY
        }).css({
          stroke: zoneSettings.color,
          'stroke-width': zoneSettings.weight
        })

        // Add line to SVG
        $(svg).append(zoneLine)
      })

      // MARKERS
      $.each(settings.markers, function (key, value) {
        // Merge with defaults
        const markerSettings = $.extend(
          {
            position: 'top',
            color: 'rgb(215, 223, 234)',
            textColor: 'rgb(215, 223, 234)',
            label: '',
            value: 0
          }, value)

        if (markerSettings.value != null) {
          // Create markers
          // Identify center line
          let markerPercentage = ((markerSettings.value - settings.minValue) / (settings.maxValue - settings.minValue))
          // Ensure marker percentage is within 0 - 100
          if (markerPercentage < 0) { markerPercentage = 0 }
          if (markerPercentage > 1) { markerPercentage = 1 }
          // Build label and marker objects
          const labelX = Math.round((markerPercentage * 0.9 * elementWidth) + (0.05 * elementWidth) - (markerSettings.label.length * 3))
          // Ensure label doesn't go off screen
          if (labelX < 0) { markerPercentage = 0 }
          if (labelX + markerSettings.label.length * 4 > elementWidth) { markerPercentage = elementWidth - (markerSettings.label.length * 4) }

          const marker = document.createElementNS(namespace, 'polygon')

          let labelY
          let points
          if (markerSettings.position === 'top') {
            points = ''.concat(
              (Math.round(markerPercentage * 0.9 * elementWidth) - 10 + (0.05 * elementWidth)), ',', (Math.round((elementHeight - settings.barHeight) / 2) - 10),
              ' ', (Math.round(markerPercentage * 0.9 * elementWidth) + (0.05 * elementWidth)), ',', (Math.round((elementHeight - settings.barHeight) / 2) + 5),
              ' ', (Math.round(markerPercentage * 0.9 * elementWidth) + 10 + (0.05 * elementWidth)), ',', (Math.round((elementHeight - settings.barHeight) / 2) - 10)
            )

            labelY = (Math.round((elementHeight - settings.barHeight) / 2) - 15)
          } else {
            points = ''.concat(
              (Math.round(markerPercentage * 0.9 * elementWidth) - 10 + (0.05 * elementWidth)), ',', (Math.round((elementHeight - settings.barHeight) / 2) + settings.barHeight + 10),
              ' ', (Math.round(markerPercentage * 0.9 * elementWidth) + (0.05 * elementWidth)), ',', (Math.round((elementHeight - settings.barHeight) / 2) + settings.barHeight - 5),
              ' ', (Math.round(markerPercentage * 0.9 * elementWidth) + 10 + (0.05 * elementWidth)), ',', (Math.round((elementHeight - settings.barHeight) / 2) + settings.barHeight + 10)
            )

            labelY = (Math.round((elementHeight - settings.barHeight) / 2) + settings.barHeight + 25)
          }

          $(marker).attr({
            points: points
          }).css({
            fill: markerSettings.color
          })

          // Add title to marker
          const markerTitle = document.createElementNS(namespace, 'title')
          markerTitle.textContent = markerSettings.value

          $(marker).append(markerTitle)

          // Add marker to SVG
          $(svg).append(marker)

          // Display label if passed
          if (markerSettings.label.length > 0) {
            const label = document.createElementNS(namespace, 'text')

            $(label).attr({
              x: labelX,
              y: labelY
            }).css({
              fill: markerSettings.textColor
            })
            label.textContent = markerSettings.label

            // Add label
            $(svg).append(label)
          }
        }
      })

      // Add fully built SVG to element
      element.append(svg)
    })

    return this
  }
}(jQuery))
