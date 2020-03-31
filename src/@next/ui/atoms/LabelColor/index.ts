import styled from 'styled-components';

const backgroundColorObj = {
  green: '#669999',
};

type Props = {
  widthText?: number;
  backgroundColor?: keyof typeof backgroundColorObj;
  colorText?: string;
};

const LabelColor = styled.div<Props>`
  text-align: center;
  font-family: 'Circe-Bold';
  border-radius: 6px;
  margin-bottom: 10px;

  width: ${({ widthText }) => widthText ?? 180}px;
  color: ${({ colorText }) => colorText ?? '#fff'};
  background-color: ${({ backgroundColor }) => backgroundColorObj[backgroundColor] ?? 'initial'};
`;

export default LabelColor;