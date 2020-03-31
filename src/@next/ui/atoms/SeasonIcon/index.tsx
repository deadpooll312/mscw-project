import styled from 'styled-components';
import { Season } from 'app/store/modules/@types';

const SEASON_ICONS: Record<Season, any> = {
  all: require('static/seasons-switcher/sun.png'),
  winter: require('static/seasons-switcher/snow.png'),
  mixed: require('static/seasons-switcher/mixed.png'),
};

const SeasonIcon = styled.div<{ season: Season }>`
  content: ${({ season }) => `url(${SEASON_ICONS[season]})`};
  width: 18px;
  margin: 6px;
`;

export default SeasonIcon;
