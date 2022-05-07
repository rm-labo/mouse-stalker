import { MsOptions } from '../types'

export const getTemplate = (opt: MsOptions) => {
  return `
    <div class="${opt.mouseElementClassName}">
      <div class="${opt.pointerElementClassName}"></div>
      <div class="${opt.iconTargetElementClassName}"></div>
    </div>
    <style>
      :host {}
      [${opt.targetSelectorsDataName}]:hover {
        cursor: none;
      }
      .${opt.mouseElementClassName} {
        --st-transition-timing-function: cubic-bezier(.2,.8,.4,.9);

        pointer-events: none;
        position: fixed;
        will-change: transform;
        z-index: ${opt.zIndex};
        top: 0;
        left: 0;
        transform: translate(0,0);
        transition: transform 0.3s;
        transition-timing-function: var(--st-transition-timing-function);
        mix-blend-mode: difference;
        filter: invert(100%);
      }
      .${opt.pointerElementClassName} {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9999;
        border-radius: 50%;
        background-color: ${opt.pointerColor};
        width: ${opt.pointerSize}px;
        height: ${opt.pointerSize}px;
        margin-top: ${-1 * opt.pointerSize * 0.5}px;
        margin-left: ${-1 * opt.pointerSize * 0.5}px;
        transform: rotate(0deg) scale(1, 1);
        transition: transform 0s;
        transition: background 0.6s;
        transition-timing-function: var(--st-transition-timing-function);
      }
      .${opt.mouseElementClassName}::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: ${opt.pointerSize * opt.hoveringExpansionRatio}px;
        height: ${opt.pointerSize * opt.hoveringExpansionRatio}px;
        margin-top: ${-1 * opt.pointerSize * opt.hoveringExpansionRatio * 0.5}px;
        margin-left: ${-1 * opt.pointerSize * opt.hoveringExpansionRatio * 0.5}px;
        border-radius: 50%;
        border-width: ${opt.hoveringBorderWidth}px;
        border-style: solid;
        border-color: ${opt.pointerColor};
        transition: transform 0.9s;
        transition-timing-function: var(--st-transition-timing-function);
        transform: scale(0);
        transform-origin: center center;
      }
      .${opt.iconTargetElementClassName} {
        color: ${opt.pageBaseColor};
        font-size: ${opt.pointerSize * opt.hoveringExpansionRatio * 0.5}px;
        position: absolute;
        top: 0;
        left: 0;
        width: ${opt.pointerSize}px;
        height: ${opt.pointerSize}px;
        margin-top: ${-1 * (opt.pointerSize * 0.5)}px;
        margin-left: ${-1 * (opt.pointerSize * 0.5)}px;
        line-height: 1;
        transition: transform 0.9s;
        transition-timing-function: var(--st-transition-timing-function);
        transform: scale(0.8);
        animation-duration: 0.6s;
        opacity: 0;
        transform: translate(0, 0);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .${opt.iconTargetElementClassName} svg {
        position: absolute;
      }

      .${opt.mouseElementClassName}.has-icon {
        mix-blend-mode: normal;
        filter: invert(0);
      }
      .${opt.mouseElementClassName}.has-icon::before {
        background-color: ${opt.pointerColor};
      }

      @media (hover: hover) {
        .is-hover .${opt.pointerElementClassName}{
          transition: background 0.3s;
          background-color: transparent;
        }
        .${opt.mouseElementClassName}.is-hover::before {
          transition: transform 0.3s;
          transform: scale(1);
        }
        .${opt.mouseElementClassName}.is-hover .${opt.iconTargetElementClassName} {
          transform: scale(1);
          opacity: 1;
          animation: show 0.3s var(--st-transition-timing-function);
        }
        .${opt.mouseElementClassName}[${opt.hoveringIconAnimationName}-target="toTop"].is-hover .${
    opt.iconTargetElementClassName
  } {
          animation: toTop 0.3s var(--st-transition-timing-function);
        }
        .${opt.mouseElementClassName}[${opt.hoveringIconAnimationName}-target="toBottom"].is-hover .${
    opt.iconTargetElementClassName
  } {
          animation: toBottom 0.3s var(--st-transition-timing-function);
        }
        .${opt.mouseElementClassName}[${opt.hoveringIconAnimationName}-target="toRight"].is-hover .${
    opt.iconTargetElementClassName
  } {
          animation: toRight 0.3s var(--st-transition-timing-function);
        }
        .${opt.mouseElementClassName}[${opt.hoveringIconAnimationName}-target="toLeft"].is-hover .${
    opt.iconTargetElementClassName
  } {
          animation: toLeft 0.3s var(--st-transition-timing-function);
        }
      }
      
      @keyframes show {
        0% {
          opacity: 0;
          transform: scale(2);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
      @keyframes toBottom {
        0% {
          opacity: 0;
          transform: translate(0, -100%);
        }
        100% {
          opacity: 1;
          transform: translate(0, 0);
        }
      }
      @keyframes toTop {
        0% {
          opacity: 0;
          transform: translate(0, 100%);
        }
        100% {
          opacity: 1;
          transform: translate(0, 0);
        }
      }
      @keyframes toRight {
        0% {
          opacity: 0;
          transform: translate(-100%, 0);
        }
        100% {
          opacity: 1;
          transform: translate(0, 0);
        }
      }
      @keyframes toLeft {
        0% {
          opacity: 0;
          transform: translate(100%, 0);
        }
        100% {
          opacity: 1;
          transform: translate(0, 0);
        }
      }
    </style>
  `
}
