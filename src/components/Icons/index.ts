import type { HomeIconOpts } from './types';

const replaceHash = (str: string) => str.replace(/#/g, '%23');

// https://github.com/openlayers/openlayers/issues/9597
const PinIconDefs = {
  line: '',
  cross: `<defs>
  <path d="M13 30C4.333 23.246 0 17.513 0 12.8 0 5.73 5.82 0 13 0s13 5.73 13 12.8c0 4.713-4.333 10.446-13 17.2zm0-13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" id="a"/>
  </defs>`,
};

const PinIconMask = {
  line: (fill='#6FB216') => `<path d="M15 30C6.333 23.246 2 17.513 2 12.8 2 5.73 7.82 0 15 0s13 5.73 13 12.8c0 4.713-4.333 10.446-13 17.2z" fill="${fill}"/>
    <path d="M19.62 1.392l.706.707-18.42 18.395-.706-.707L19.62 1.392zm-4-2l.706.707L-.273 16.54l-.707-.707L15.62-.608zm8.64 3.295l.707.707-21.83 21.947-.706-.707L24.26 2.687zm3 3l.707.707-21.83 21.947-.706-.707L27.26 5.687zm1.36 4.705l.706.707-18.42 18.395-.706-.707 18.42-18.395zm1.76 4.131l.708.708-15.732 15.838-.707-.707L30.38 14.523z" opacity=".5" fill="#2A2A2C"/>`,
  cross: (fill='6FB216') => `<path d="M15 30C6.333 23.246 2 17.513 2 12.8 2 5.73 7.82 0 15 0s13 5.73 13 12.8c0 4.713-4.333 10.446-13 17.2z" fill="${fill}"/>
  <g opacity=".5" transform="translate(2)">
    <mask id="b" fill="#fff">
      <use xlink:href="#a"/>
    </mask>
    <path d="M5.523 12.828l2.123 2.122-.695.695-2.123-2.123-2.126 2.127L2 14.948l2.127-2.127L2 10.695 2.696 10l2.126 2.126L6.948 10l.701.702-2.126 2.126zm0 8l2.123 2.122-.695.695-2.123-2.123-2.126 2.127L2 22.948l2.127-2.127L2 18.695 2.696 18l2.126 2.126L6.948 18l.701.702-2.126 2.126zm0-16L7.646 6.95l-.695.695-2.123-2.123L2.702 7.65 2 6.948 4.127 4.82 2 2.695 2.696 2l2.126 2.126L6.948 2l.701.702-2.126 2.126zm8 8l2.123 2.122-.695.695-2.123-2.123-2.126 2.127-.702-.701 2.127-2.127L10 10.695l.695-.695 2.126 2.126L14.948 10l.701.702-2.126 2.126zm0 8l2.123 2.122-.695.695-2.123-2.123-2.126 2.127-.702-.701 2.127-2.127L10 18.695l.695-.695 2.126 2.126L14.948 18l.701.702-2.126 2.126zm0-16l2.123 2.122-.695.695-2.123-2.123-2.126 2.127L10 6.948l2.127-2.127L10 2.695 10.696 2l2.126 2.126L14.948 2l.701.702-2.126 2.126zm8 8l2.123 2.122-.695.695-2.123-2.123-2.126 2.127-.702-.701 2.127-2.127L18 10.695l.695-.695 2.126 2.126L22.948 10l.701.702-2.126 2.126zm0 8l2.123 2.122-.695.695-2.123-2.123-2.126 2.127-.702-.701 2.127-2.127L18 18.695l.695-.695 2.126 2.126L22.948 18l.701.702-2.126 2.126zm0-16l2.123 2.122-.695.695-2.123-2.123-2.126 2.127L18 6.948l2.127-2.127L18 2.695 18.696 2l2.126 2.126L22.948 2l.701.702-2.126 2.126z" fill="#2A2A2C" mask="url(#b)"/>
  </g>`,
};

const HomeIconMask = {
  line: (fill='#6FB216') => `<circle fill="${fill}" cx="15" cy="15" r="15"/>
  <g opacity=".5" transform="translate(0 -.523)">
    <mask id="b" fill="#fff">
      <use xlink:href="#a"/>
    </mask>
    <path d="M8 1.545h1L8.88 29.63h-1L8 1.545zm-4.276 2.25h1l-.11 23.363h-1l.11-23.364zm8.441-3.78h1l.082 30.954h-1L12.165.014zm4.243 0h1l.082 30.954h-1L16.408.014zm4.225 1.26h1l.066 28.636h-1l-.066-28.635zm4.23 2.78h1l.115 22.875h-1l-.116-22.874z" fill="#2A2A2C" mask="url(#b)" transform="rotate(45 14.796 15.491)"/>
  </g>`,
  cross: (fill='#6FB216') => `<circle fill="${fill}" cx="15" cy="15" r="15"/>
  <g opacity=".5" transform="translate(0 -.523)">
    <mask id="b" fill="#fff">
      <use xlink:href="#a"/>
    </mask>
    <path d="M7.523 15.551l2.123 2.123-.695.694-2.123-2.122-2.126 2.127L4 17.67l2.127-2.127L4 13.42l.695-.695 2.126 2.126 2.126-2.127.701.702-2.126 2.126zm0 8l2.123 2.123-.695.694-2.123-2.122-2.126 2.127L4 25.67l2.127-2.127L4 21.42l.695-.695 2.126 2.126 2.126-2.127.701.702-2.126 2.126zm0-16l2.123 2.123-.695.694-2.123-2.122-2.126 2.127L4 9.67l2.127-2.127L4 5.42l.695-.695L6.822 6.85l2.126-2.127.701.702-2.126 2.126zm8 8l2.123 2.123-.695.694-2.123-2.122-2.126 2.127L12 17.67l2.127-2.127L12 13.42l.695-.695 2.126 2.126 2.126-2.127.701.702-2.126 2.126zm0 8l2.123 2.123-.695.694-2.123-2.122-2.126 2.127L12 25.67l2.127-2.127L12 21.42l.695-.695 2.126 2.126 2.126-2.127.701.702-2.126 2.126zm0-16l2.123 2.123-.695.694-2.123-2.122-2.126 2.127L12 9.67l2.127-2.127L12 5.42l.695-.695 2.126 2.126 2.126-2.127.701.702-2.126 2.126zm8 8l2.123 2.123-.695.694-2.123-2.122-2.126 2.127L20 17.67l2.127-2.127L20 13.42l.695-.695 2.126 2.126 2.126-2.127.701.702-2.126 2.126zm0 8l2.123 2.123-.695.694-2.123-2.122-2.126 2.127L20 25.67l2.127-2.127L20 21.42l.695-.695 2.126 2.126 2.126-2.127.701.702-2.126 2.126zm0-16l2.123 2.123-.695.694-2.123-2.122-2.126 2.127L20 9.67l2.127-2.127L20 5.42l.695-.695 2.126 2.126 2.126-2.127.701.702-2.126 2.126z" fill="#2A2A2C" mask="url(#b)"/>
  </g>`,
};

const HomeIconDefs = {
  line: `<defs>
    <circle id="a" cx="15" cy="15.523" r="15"/>
  </defs>`,
  cross: ` <defs>
  <circle id="a" cx="15" cy="15.523" r="15"/>
</defs>`,
};

export const getPinIconSvg = (fill: string, modify?: 'line' | 'cross', stroke={color: 'white', width: 2}) => (
  `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px">${
    modify ? PinIconDefs[modify] : ''
  }<g fill="none" fill-rule="evenodd">${
    modify ? replaceHash(PinIconMask[modify](fill)) : ''
  }<path ${!modify ? `fill="${fill}"` : ''} stroke="${stroke.color}" stroke-width="${stroke.width}" d="M15 28.728c8.03-6.367 12-11.722 12-15.928C27 6.287 21.63 1 15 1S3 6.287 3 12.8c0 4.206 3.97 9.561 12 15.928z"/>`
  +'<path fill="white" d="M15 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />'
  +'</g>'
+'</svg>'
);

export const getHomeIconSvg = (fill: string, opts: HomeIconOpts = {}, stroke={color: 'white', width: 2}) => {
  const { modify, isActive } = opts;
  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px">${
    // если есть модификатор, то устанавливаем defs для него
    modify ? HomeIconDefs[modify] : ''
  }<g fill="none" stroke="none" fill-rule="evenodd">${
    // если есть модификатор, то устанавливаем маску для него
    modify ? replaceHash(HomeIconMask[modify](fill)) : ''
  }<circle id="Oval" stroke="${stroke.color}" stroke-width="${isActive ? 1 : stroke.width}" ${!modify ? `fill="${fill}"` : ''} fill-rule="evenodd" cx="15" cy="15" r="14"></circle>`
      +'<polygon id="house" fill="white" fill-rule="nonzero" points="11 14.0081283 15.0285984 10 19.0021826 14.0081283 19.0021826 19 16.0103386 19 16.0103386 16.0293528 13.9903718 16.0293528 13.9903718 19 11 19"></polygon>'
    +'</g>'
  +'</svg>';
};

export const getClusterIcon = (size: number) => {
  return replaceHash(`<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25">
    <g fill="none" fill-rule="evenodd">
      <circle stroke="#fff" stroke-width="2" fill="#2b55e6" cx="12" cy="12" r="10"/>
    </g>
    <text x="9" y="17" class="small">
      <tspan font-size="13px" fill="#fff">
        ${size}
      </tspan>
    </text>
  </svg>`);
};

function getCameraMod(selected: boolean, hovered: boolean, isFakeCoordinates: boolean) {
  const fill = isFakeCoordinates ? '#acacac' : '#57b5ff';
  if (selected) {
    return `<circle stroke="#5b5bff" stroke-width="30" fill="${fill}" cx="200" cy="200" r="180"/>`;
  }
  if (hovered)  {
    return `<circle stroke="#3a4268" stroke-width="25" fill="${fill}" cx="200" cy="200" r="180"/>`;
  }
  return `<circle stroke="#fff" stroke-width="20" fill="${fill}" cx="200" cy="200" r="180"/>`;
}

export const getCameraIcon = (selected?: boolean, hovered?: boolean, isFakeCoordinates?: boolean) => {
  return replaceHash(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 401 401" width="30" height="30">
      <g fill="none" fill-rule="evenodd">
        ${getCameraMod(selected, hovered, isFakeCoordinates)}
      </g>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 401 401" width="230" height="230" x="90" y="70">
        <path fill="#fff" d="M395.928 187.794l-272.1-135.687c-5.358-2.669-11.866-.494-14.538 4.864L51.24 173.379a10.84 10.84 0 0 0 4.864 14.538l81.242 40.511-7.208 14.455c-2.671 5.358-.494 11.866 4.864 14.538l2.561 1.278-13.998 24.929H41.027C33.351 268.782 17.867 258.626 0 258.626v92.338c17.454 0 32.642-9.688 40.49-23.978h95.766a21.678 21.678 0 0 0 18.903-11.063l21.255-37.85 3.695 1.842c5.357 2.671 11.867.493 14.539-4.863l7.208-14.455 60.7 30.271a10.834 10.834 0 0 0 10.911-.723l16.753-11.332 29.912 14.916a10.82 10.82 0 0 0 8.276.578 10.832 10.832 0 0 0 6.262-5.441l30.624-61.413 31.757-20.903a10.839 10.839 0 0 0-1.123-18.756z"/>
      </svg>
  </svg>
  `);
};

export const getParkViolationIcon = () => {
  return replaceHash(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30" height="30">
      <g fill-rule="nonzero">
        <circle stroke="#fff" stroke-width="45" fill="#f53d3d" cx="270" cy="270" r="230"/>
      </g>
      <svg fill="#FFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="360" height="360" x="80" y="60">
          <path d="M503.5 435.2a8.5 8.5 0 100-17h-8.6v-25.7h8.6a8.5 8.5 0 100-17h-8.6a8.5 8.5 0 10-17 0H341.3a8.5 8.5 0 00-17 0h-8.6a8.5 8.5 0 100 17h8.6v25.6h-8.6a8.5 8.5 0 100 17.1h8.6v8.5h-8.6a8.5 8.5 0 100 17.1h8.6v25.6H170.7V413a79.1 79.1 0 01-17.1-20.5 79.1 79.1 0 01-17 20.5v73.4H8.5a8.5 8.5 0 100 17h494.9a8.5 8.5 0 100-17h-8.6v-25.6h8.6a8.5 8.5 0 100-17h-8.6v-8.6h8.6zm-25.6 51.2H341.3v-25.6H478v25.6zm0-42.7H341.3v-8.5H478v8.5zm0-25.6H341.3v-25.6H478v25.6zM42.7 111h46.7l-.1-3a65.8 65.8 0 0146.6-63.4 42.6 42.6 0 00-84.7 6.6c0 4.7-3.8 8.5-8.5 8.5a25.6 25.6 0 100 51.2zM367 187.7h102.3a25.6 25.6 0 100-51.2 8.6 8.6 0 01-8.5-8.5 42.7 42.7 0 00-85.3 0c0 4.7-3.9 8.5-8.6 8.5a25.6 25.6 0 100 51.2z"/>
          <path d="M86.6 409.6c23.3 0 45-11.9 57.5-31.5l-56.3-56.3a8.6 8.6 0 0112.1-12.1l45.2 45.2V268l-40.2-40a8.6 8.6 0 1112-12.2l28.2 28.2v-39.2a8.5 8.5 0 0117 0V244l28.1-28.2a8.6 8.6 0 1112.1 12.1L162.1 268V355l45.2-45.2a8.6 8.6 0 0112 12.1l-56.2 56.3a68.5 68.5 0 0057.5 31.5c39-.7 70.1-32.8 69.5-71.8V335a72 72 0 00-48.3-65.8 8.7 8.7 0 01-3.4-14.2 60.6 60.6 0 0018.3-43.2v-.5a59.9 59.9 0 00-58.5-60.4 8.7 8.7 0 01-7.7-4.7 8.5 8.5 0 01.6-9 48.9 48.9 0 009.8-29.4 48.2 48.2 0 00-47.3-48.8 48.2 48.2 0 00-47.1 52.3c.6 9.4 4 18.5 9.6 26 2 2.6 2.2 6 .7 9-1.6 3-5 4.9-8.5 4.6a59.9 59.9 0 00-57.8 60.4v.5c0 16.2 6.7 31.8 18.3 43.2 2.1 2 3 5 2.3 8-.7 2.9-2.8 5.2-5.6 6.2a72 72 0 00-48.3 65.8l-.1 2.7a70.8 70.8 0 0069.5 71.8z"/>
      </svg>
  </svg>
  `);
};

export const getPinPolygonIcon = (size: number, fill='#A12A4A', stroke={color: '#262C33', width: 2}) => {
  return replaceHash(`
    <svg width="60" height="78" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <path d="M30 0c16.57 0 30 13.41 30 29.96a29.98 29.98 0 01-22.74 29.07L30 77.9l-7.26-18.86A29.98 29.98 0 010 29.96 29.98 29.98 0 0130 0zm-.53 11.58c-9.88 0-17.9 8.25-17.9 18.42 0 10.17 8.02 18.42 17.9 18.42 9.89 0 17.9-8.25 17.9-18.42 0-10.17-8.01-18.42-17.9-18.42z" fill="` + stroke.color + `"/>
        <path d="M30 8a22 22 0 110 44 22 22 0 010-44zm-.5 5a16.5 16.5 0 100 33 16.5 16.5 0 000-33z" fill="` + fill +`"/>
        <circle fill-opacity=".7" fill="#FFF" cx="29.5" cy="29.5" r="16.5"/>
        <text font-family="Oswald-Bold, Oswald" font-size="22" font-weight="bold" fill="#333">
          <tspan x="22.66" y="35.75">` + size +`</tspan>
        </text>
      </g>
    </svg>
  `);
};

export const getScoPinIcon = (fill: string, opts: HomeIconOpts = {}, stroke={color: 'white', width: 2}) => {
  return replaceHash(`
    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <path d="M15 0c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15C0 6.716 6.716 0 15 0zm0 3.41C8.599 3.41 3.41 8.598 3.41 15S8.598 26.59 15 26.59 26.59 21.402 26.59 15 21.402 3.41 15 3.41z" fill="${stroke.color}"  stroke="${stroke.color}" stroke-width="${stroke.width}"/>
        <circle fill="${fill}" cx="15" cy="15" r="13"/>
        <path fill="#FFF" d="M15 9l6 3H9zM9 12h12v1H9zM9.5 13.5h3v1h-3zM13.5 13.5h3v1h-3zM17.5 13.5h3v1h-3zM9 19h12v2H9z"/>
        <path fill="#FFF" d="M10 13.5h2v5h-2zM14 13.5h2v5h-2zM18 13.5h2v5h-2z"/>
      </g>
    </svg>
  `);
};

export const getTrashPinIcon = (fill: string, opts: HomeIconOpts = {}, stroke={color: 'white', width: 2}) => {
  return replaceHash(`
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15.155" r="13" fill="${fill}" stroke="${stroke.color}" stroke-width="${stroke.width}"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6667 9L17.3333 9.66667H19.6667V11H10.3333V9.66667H12.6667L13.3333 9H16.6667ZM11 19.6667C11 20.4 11.6 21 12.3333 21H17.6667C18.4 21 19 20.4 19 19.6667V11.9792H11V19.6667ZM12.3333 13.25H17.6667V19.6667H12.3333V13.25Z" fill="white"/>
    </svg>
  `);
};
