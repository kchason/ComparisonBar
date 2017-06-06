# ComparisonBar - jQuery Plugin
A simple SVG based horizontal gauge to show performance against peers or benchmarks. 

Allows argument passing during initialization or with `data-*` elements. The graphic fills the parent element and scales as necessary.

![Standalone without Tile](/screenshots/WithMarkersAndZones.jpg)

![Plugin with Dashboard Tile](/screenshots/OnDashboardTile.jpg)

### Usage

##### Basic Usage
`$('.comparisonbar').comparisonbar();`

#### Parameter Initialization
`$('.comparisonbar').comparisonbar({
  barHeight: 30,
  barFillColor: #cccccc,
  valueFillColor: #333333
});`

##### Parameter List
* barHeight - The number of pixels for the horizontal bar gauge.
* barFillColor - The color code (RGB or Hex) for the background fill for the bar gauge.
* barBorderColor - The color code (RBG or Hex) for the bar gauge border.
* barBorderWeight - The 
* valueFillColor - The 
