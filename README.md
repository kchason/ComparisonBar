# ComparisonBar - jQuery Plugin
A simple SVG based horizontal gauge to show performance against peers or benchmarks. 

Allows argument passing during initialization or with `data-*` elements. The graphic fills the parent element and scales as necessary.

![Standalone without Tile](/screenshots/WithMarkersAndZones.jpg)

![Plugin with Dashboard Tile](/screenshots/OnDashboardTile.jpg)

### Usage

##### Basic Usage
`$('.comparisonbar').comparisonbar();`

#### Parameter Initialization
`$('.comparisonbar').comparisonbar({ barHeight: 30, barFillColor: #cccccc, valueFillColor: #333333});`

#### Inline Arguments

The above screenshots are generated from the below initialization.

    <div class="comparisonbar" data-value="9.6" data-min-value="0" data-max-value="35" data-markers='[{"position": "top", "color": "rgb(211, 134, 10)", "textColor": "rgb(211, 134, 10)", "value": 8.6, "label": "Average"}, {"position": "bottom", "color": "#02562c", "textColor":"#02562c", "value": 5, "label": "Goal"}]' data-zones='[{"min":0, "max":5, "color":"#31d009", "weight":"3"},{"min":5, "max":10, "color":"#a2d6b0", "weight":"3"},{"min":10, "max":20, "color":"#e09199", "weight":"3"},{"min":20, "max":35, "color":"#ff0000", "weight":"3"}]'></div>

#### Resizing 
To have the SVG resize when the window changes, use the following segment.

    $( window ).resize(function() {
        $('.comparisonbar').empty();
        $('.comparisonbar').comparisonbar();
    });

##### Parameter List
* barHeight - The number of pixels for the horizontal bar gauge.
* barFillColor - The color code (RGB or Hex) for the background fill for the bar gauge.
* barBorderColor - The color code (RGB or Hex) for the bar gauge border.
* barBorderWeight - The whole number value in pixels of the border weight.
* valueFillColor - The color code (RGB or Hex) for the inner fill for the value.
* value - The integer value for the inner fill.
* minValue - The integer value for the left side of the gauge.
* maxValue - The integer value for the right side of the gauge.
* showMinMax - The boolean value whether or not to show the tick marks and labels for the min and max values.
* minMaxLineColor - The color code (RGB or Hex) for the min and max lines.
* minMaxTextColor - The color code (RGB or Hex) for the min and max labels.
* markers 
    * position - 'top' or 'bottom'
    * color - The color code (RGB or Hex) for the triangular marker.
    * textColor - The color code (RGB or Hex) for the marker label.
    * label - The text for the label.
    * value - The integer value at which to center the marker.
* zones
    * position - 'top' or 'bottom'
    * color - The color code (RGB or Hex) for the zone line.
    * min - The integer value at which the zone begins.
    * max - The integer value at which the zone ends.
    * weight - The whole number value in pixels for the zone line weight.
