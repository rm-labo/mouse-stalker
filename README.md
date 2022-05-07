# mouse-stalker

![badge](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)
![badge](https://img.shields.io/badge/node-v16.14.2-green.svg?style=flat-square)

| Statements                  | Branches                | Functions                 | Lines             |
| --------------------------- | ----------------------- | ------------------------- | ----------------- |
| ![Statements](https://img.shields.io/badge/statements-6.89%25-red.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-13.33%25-red.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-3.33%25-red.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-6.66%25-red.svg?style=flat) |


## Demo

demo page is [here](http://rm-labo.github.io/mouse-stalker/)

## Install

```bash
$ npm i @rm-labo/mouse-stalker
```

## Usage

```js
import MouseStalker from '@rm-labo/mouse-stalker'

const opt = {
  // ... options ...
}

MouseStalker.init(opt)
```

### Default options

```js
{
  mouseElementClassName: 'mouse-stalker-root',
  pointerElementClassName: 'mouse-stalker-pointer',
  iconTargetElementClassName: 'mouse-stalker-icon-target',
  pageBaseColor: '#ffffff',
  pointerColor: 'rgba(0,0,0,1)',
  pointerSize: 24,
  zIndex: '9999',
  hoveringExpansionRatio: 2,
  hoveringBorderWidth: 1,
  scoped: false,
  targetSelectorsDataName: 'data-st-target',
  hoveringIconName: 'data-st-icon-name',
  hoveringIconAnimationName: 'data-st-icon-animation-name',
}
```

### hover effects

データ属性を使い、ターゲットにエフェクトを指定することができます。

| Name of data attribute      |                                                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| data-st-target              | If the mouse cursor hovers over an element with this attribute, the MouseStalker is increased by the ratio of hoveringExpansionRatio. |
| data-st-icon-name           | By specifying the name of the [iconify.design](https://icon-sets.iconify.design/), the mouse cursor can display the icon.             |
| data-st-icon-animation-name | Specifies how the icon is to be displayed.                                                                                            |


```html
<!-- hover effects example -->
<button data-st-target>Default</button>
<button data-st-target data-st-icon-name="bxs:cat">Cat</button>
<button data-st-target data-st-icon-name="akar-icons:heart">Heart</button>
<button data-st-target data-st-icon-name="ri:zoom-in-line">Zoom In</button>
<button data-st-target data-st-icon-name="fa-solid:arrow-left" data-st-icon-animation-name="toLeft">Left Arrow</button>
<button data-st-target data-st-icon-name="fa-solid:arrow-up" data-st-icon-animation-name="toTop">Up Arrow</button>
<button data-st-target data-st-icon-name="fa-solid:arrow-down" data-st-icon-animation-name="toBottom">Down Arrow</button>
<button data-st-target data-st-icon-name="fa-solid:arrow-right" data-st-icon-animation-name="toRight">Right Arrow</button>
```

## Methods

| Method                   |                            |
| ------------------------ | -------------------------- |
| MouseStalker.init(opt)   | Show MouseStalker            |
| MouseStalker.destroy()   | Remove MouseStalker            |
| MouseStalker.update(opt) | Update MouseStalker with opt |



## Options

| Option                     | Type      | Default                                  |
| -------------------------- | --------- | ---------------------------------------- |
| mouseElementClassName      | `string`  | `mouse-stalker-root`                     |
| pointerElementClassName    | `string`  | `mouse-stalker-pointer`                  |
| iconTargetElementClassName | `string`  | `mouse-stalker-icon-target`              |
| pageBaseColor              | `string`  | `#ffffff`                                |
| pointerColor               | `string`  | `rgba(0,0,0,1)`                          |
| pointerSize                | `number`  | `24`                                     |
| zIndex                     | `string`  | `9999`                                   |
| hoveringExpansionRatio     | `number`  | `2`                                      |
| hoveringBorderWidth        | `number`  | `1`                                      |
| scoped                     | `boolean` | `false`                                  |
| targetSelectorsDataName    | `string`  | `data-st-target`              |
| hoveringIconName           | `string`  | `data-st-icon-name`           |
| hoveringIconAnimationName  | `string`  | `data-st-icon-animation-name` (This attribute accepts are `toTop`, `toBottom`, `toRight`, and `toLeft`) |

## Notes on background color

The `mix-blend-mode` is used to draw the mouse pointer.
Therefore, `background-color` must be specified in the `body` tag.

```css
body {
  background-color: white; /* must be specified */
}
```

Note that `Option.pageBaseColor` is output for this background color.


## Licence

Licensed under MIT license.
You are free to use for your personal or commercial projects.
However, this program is based on iconify.design and has been extended.
Please refer to iconify.design for the license of each icon used internally.

## Release notes

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Launch      |