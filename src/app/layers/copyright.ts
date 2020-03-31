import Control from 'ol/control/Control';

const copyrightText = document.createElement('span');
copyrightText.innerHTML = '© Данные предоставлены 2ГИС';

const element = document.createElement('div');
element.style.position = 'absolute';
element.style.bottom = '0';
element.style.right = '40px';

element.appendChild(copyrightText);
const copyrightControl = new Control({
  element,
});

export function getCopyrightControl() {
  return copyrightControl;
}
