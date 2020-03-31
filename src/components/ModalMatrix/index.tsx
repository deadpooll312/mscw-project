import * as React from 'react';
import { Tabs } from 'antd';
import { TabPane } from 'pkg/antd';
import { 
  MatrixContent, 
  MatrixTitle, 
  ColorArrowWrap, 
  ColorLine, 
  ColorArrow, 
  Row, 
  FiveHours, 
  FirstDay, 
  SecondDay, 
  ThirdDay,
  Top,
  Middle,
  Bottom,
  Footer,
  FirstTop,
  SecondTop,
  Discription,
  Criteria,
  LeftItem,
  RightItem,
  Dot,
  DiscriptionSecond,
  ColorArrowWrapSecond,
  ColorArrowSecond,
  SnowIcon,
  FiveHoursSecondOne,
  FiveHoursSecondTwo,
  TopSecond,
  ThirdDaySecond,
  EmptyContainer,
  DiscriptionSecondTwo,
  MatrixTitleSecond,
  DescriptionRow, 
  GreenIcon, 
  DescriptionRight, 
  RedIcon, 
  SnowTitle, 
  Table, 
  ColorTr, 
  BoldTd, 
  CenterTd, 
  TdMixedMatrix,
  BlockWithPadding,
  TableMixed,
  ColorSpan,
  TableTh,
  TableContainer,
  FromSixToTenFooter
} from 'components/ModalMatrix/styled';
import FlexContainer from '@next/ui/atoms/FlexContainer';

type Props = {
  isSummerMonitor: boolean;
  isMixedMonitor: boolean;
  isWinterMonitor: boolean;
};

const UntilSix = () => (
  <React.Fragment>
    <h2>
      Стандарт зимней уборки городских территорий <ColorSpan colorText="grey">1/2</ColorSpan>
    </h2>
    <FlexContainer justifyContent="space-between">
      <SnowTitle>При выпадении снега от 2 до 6 см</SnowTitle>
      <DescriptionRow>
        <RedIcon />
        <p>- Элемент может быть не убран</p>
        <DescriptionRight>
          <GreenIcon />
          <p>- Элемент учитывается в оценке</p>
        </DescriptionRight>
      </DescriptionRow>
    </FlexContainer>
    <TableContainer maxHeight="300px">
      <Table>
        <thead>
          <tr>
            <TableTh></TableTh>
            <TableTh>Элемент</TableTh>
            <TableTh>День 1</TableTh>
            <TableTh>День 2</TableTh>
            <TableTh>День 3</TableTh>
            <TableTh>День 4</TableTh>
            <TableTh>День 5</TableTh>
          </tr>
        </thead>

        <tbody>
          <ColorTr>
            <BoldTd>Неубранный двор</BoldTd>
            <td>Входные группы</td>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </ColorTr>

          <ColorTr>
            <td></td>
            <td>Тротуары</td>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </ColorTr>

          <ColorTr>
            <td></td>
            <td>Проезд на ДТ</td>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </ColorTr>

          <ColorTr>
            <td></td>
            <td>Площадка детская</td>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </ColorTr>

          <ColorTr>
            <td></td>
            <td>Внутридворовая дорожно - тропиночная сеть</td>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </ColorTr>

          <ColorTr>
            <td></td>
            <td>Площадка спортивная</td>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </ColorTr>

          <ColorTr>
            <td></td>
            <td>Парковки</td>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </ColorTr>

          <ColorTr>
            <td></td>
            <td>Площадки отдыха</td>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </ColorTr>

          <tr>
            <BoldTd>Неубранная дорога</BoldTd>
            <td>Проезжая часть</td>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </tr>

          <tr>
            <td></td>
            <td>Тротуары</td>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </tr>

          <tr>
            <td></td>
            <td>Пешеходные переходы (в т.ч. подходы)</td>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </tr>

          <tr>
            <td></td>
            <td>Остановки и места подъезда и отъезда НГПТ</td>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </tr>

          <tr>
            <td></td>
            <td>Парковки</td>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </tr>

          <ColorTr>
            <BoldTd colSpan={2}>Формирование валов и снежных куч на ОДХ</BoldTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </ColorTr>

          <tr>
            <BoldTd>Вывоз снега с ОДХ</BoldTd>
            <td>1, 2, 4, 6, 7а, 7б категорий</td>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </tr>

          <tr>
            <td></td>
            <td>3 категории</td>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </tr>

          <tr>
            <td></td>
            <td>5 категории</td>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </tr>

          <ColorTr>
            <BoldTd colSpan={2}>Уборка ТПУ</BoldTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </ColorTr>

          <tr>
            <BoldTd colSpan={2}>Вывоз снега с ТПУ</BoldTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </tr>
        </tbody>
      </Table>
    </TableContainer>
  </React.Fragment>
);
const FromSixToTen = () => (
  <React.Fragment>
    <h2>
      Стандарт зимней уборки городских территорий <ColorSpan colorText="grey">2/2</ColorSpan>
    </h2>
    <FlexContainer justifyContent="space-between">
      <SnowTitle>При выпадении снега от 6 до 10 см<ColorSpan colorText="white">*</ColorSpan></SnowTitle>
      <DescriptionRow>
        <RedIcon />
        <p>- Элемент может быть не убран</p>
        <DescriptionRight>
          <GreenIcon />
          <p>- Элемент учитывается в оценке</p>
        </DescriptionRight>
      </DescriptionRow>
    </FlexContainer>
    <TableContainer maxHeight="280px">
      <Table>
        <thead>
          <tr>
            <TableTh></TableTh>
            <TableTh>Элемент</TableTh>
            <TableTh>В период снегопада</TableTh>
            <TableTh>День 1</TableTh>
            <TableTh>День 2</TableTh>
            <TableTh>День 3</TableTh>
            <TableTh>День 4</TableTh>
            <TableTh>День 5</TableTh>
            <TableTh>День 6</TableTh>
            <TableTh>День 7</TableTh>
            <TableTh>День 8</TableTh>
            <TableTh>День 9</TableTh>
            <TableTh>День 10</TableTh>
          </tr>
        </thead>

        <tbody>
          <ColorTr>
            <BoldTd>Неубранный двор</BoldTd>
            <td>Входные группы</td>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </ColorTr>

          <ColorTr>
            <td></td>
            <td>Тротуары</td>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </ColorTr>

          <ColorTr>
            <td></td>
            <td>Проезд на ДТ</td>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </ColorTr>

          <ColorTr>
            <td></td>
            <td>Площадка детская</td>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </ColorTr>

          <ColorTr>
            <td></td>
            <td>Внутридворовая дорожно - тропиночная сеть</td>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </ColorTr>

          <ColorTr>
            <td></td>
            <td>Площадка спортивная</td>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </ColorTr>

          <ColorTr>
            <td></td>
            <td>Парковки</td>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </ColorTr>

          <ColorTr>
            <td></td>
            <td>Площадки отдыха</td>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </ColorTr>

          <tr>
            <BoldTd>Неубранная дорога</BoldTd>
            <td>Проезжая часть</td>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </tr>

          <tr>
            <td></td>
            <td>Тротуары</td>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </tr>

          <tr>
            <td></td>
            <td>Пешеходные переходы (в т.ч. подходы)</td>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </tr>

          <tr>
            <td></td>
            <td>Остановки и места подъезда и отъезда НГПТ</td>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </tr>

          <tr>
            <td></td>
            <td>Парковки</td>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </tr>

          <ColorTr>
            <BoldTd colSpan={2}>Формирование валов и снежных куч на ОДХ</BoldTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </ColorTr>

          <tr>
            <BoldTd>Вывоз снега с ОДХ</BoldTd>
            <td>1, 2, 4, 6, 7а, 7б категорий</td>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </tr>

          <tr>
            <td></td>
            <td>3 категории</td>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </tr>

          <tr>
            <td></td>
            <td>5 категории</td>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><RedIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </tr>

          <ColorTr>
            <BoldTd colSpan={2}>Уборка ТПУ</BoldTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </ColorTr>

          <tr>
            <BoldTd colSpan={2}>Вывоз снега с ТПУ</BoldTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
            <CenterTd><GreenIcon /></CenterTd>
          </tr>
        </tbody>
      </Table>
    </TableContainer>

    <FromSixToTenFooter justifyContent="flex-end">
      <p>
        <span>*</span>дополнительно выпавшие 5 см увеличивают на один день сроки окончательного вывоза снега
      </p>
    </FromSixToTenFooter>
  </React.Fragment>
);

const NoSnow = () => (
  <React.Fragment>
    <MatrixTitle>
      После завершения снегопада наступает длительный <br/> период с отсутствием осадков
    </MatrixTitle>
    <Discription>
      Начало учета заявок и обращений жителей, начало проведения контроля ЦАФАП,
      начало учета результатов городского контроля
    </Discription>
    <ColorArrowWrap>
      <ColorLine />
      <ColorArrow />
    </ColorArrowWrap>
    <Row>
      <FiveHours>
        <Top> <p>Завершение <br/> снегопада</p></Top>
        <Middle></Middle>
        <Bottom></Bottom>
        <Footer>5 часов</Footer>
      </FiveHours>

      <FirstDay>
        <FirstTop></FirstTop>
        <Middle></Middle>
        <Bottom></Bottom>
        <Footer>1 день</Footer>
      </FirstDay>

      <SecondDay>
        <SecondTop></SecondTop>
        <Middle></Middle>
        <Bottom></Bottom>
        <Footer>2 день</Footer>
      </SecondDay>

      <ThirdDay>
        <SecondTop></SecondTop>
        <Middle></Middle>
        <Bottom></Bottom>
        <Footer>3 день</Footer>
      </ThirdDay>
    </Row>
    
    <Criteria>
      <LeftItem>
        <Dot><span>&bull;</span></Dot>
          Критерий снегопада - 5 см выпавшего снега,
          время завершения - по округам/районам
          (Яндекс, Московское метеобюро)
      </LeftItem>
      <RightItem>
        <Dot><span>&bull;</span></Dot>
          Если снегопад завершился до 16:00, текущий день
          считается Днем №1. Если после 16:00 - Днем №1
          считаются следующие сутки. Второй контрольный
          срез - вечером следующих суток
      </RightItem>
    </Criteria>
  </React.Fragment>
);

const WithRepeatedSnow = () => (
  <React.Fragment>
    <MatrixTitleSecond>
      Период повторяющихся снегопадов
    </MatrixTitleSecond>
    <DiscriptionSecond>
      Начало учета заявок и обращений жителей, начало проведения контроля ЦАФАП,
      начало учета результатов городского контроля
    </DiscriptionSecond>
    <DiscriptionSecondTwo>
      Начало учета заявок и обращений жителей, начало проведения контроля ЦАФАП,
      начало учета результатов городского контроля
    </DiscriptionSecondTwo>
    <ColorArrowWrapSecond>
      <ColorLine />
      <ColorArrowSecond />
    </ColorArrowWrapSecond>
    <Row>
      <FiveHoursSecondOne>
        <EmptyContainer />
        <SnowIcon />
        <TopSecond> <p>Завершение <br/> снегопада</p></TopSecond>
        <Middle></Middle>
        <Bottom></Bottom>
        <Footer>5 часов</Footer>
      </FiveHoursSecondOne>

      <FiveHoursSecondTwo>
        <SnowIcon />
        <TopSecond> <p>Завершение <br/> снегопада</p></TopSecond>
        <Middle></Middle>
        <Bottom></Bottom>
        <Footer>5 часов</Footer>
      </FiveHoursSecondTwo>

      <ThirdDaySecond>
        <SecondTop></SecondTop>
        <Middle></Middle>
        <Bottom></Bottom>
        <Footer>1 день</Footer>
      </ThirdDaySecond>

      <ThirdDaySecond>
        <SecondTop></SecondTop>
        <Middle></Middle>
        <Bottom></Bottom>
        <Footer>2 день</Footer>
      </ThirdDaySecond>
    </Row>
  </React.Fragment>
);

type TableMixedArr = {
  name: string;
  mkd: number;
  dt: number;
  odh: number;
  tpu: number;
}[];

const arrMixed: TableMixedArr = [
  {
    name: 'Запах гари в квартире/подъезде',
    mkd: 0.5,
    dt: null,
    odh: null,
    tpu: null
  },
  {
    name: 'Отсутствие ХВС в доме',
    mkd: 12,
    dt: null,
    odh: null,
    tpu: null
  },
  {
    name: 'Засор канализации',
    mkd: 12,
    dt: null,
    odh: null,
    tpu: null
  },
  {
    name: 'Отсутствие отопления в доме',
    mkd: 16,
    dt: null,
    odh: null,
    tpu: null
  },

  {
    name: 'Отсутствие ГВС в доме',
    mkd: 24,
    dt: null,
    odh: null,
    tpu: null
  },
  {
    name: 'Засор мусоропровода',
    mkd: 48,
    dt: null,
    odh: null,
    tpu: null
  },
  {
    name: 'Повреждение козырька подъезда',
    mkd: 720,
    dt: null,
    odh: null,
    tpu: null
  },
  {
    name: 'Аварийное повреждение газопровода',
    mkd: null,
    dt: 2,
    odh: null,
    tpu: null
  },
  {
    name: 'Аварийно свисающие/оборванные/искрящиеся провода',
    mkd: null,
    dt: 4,
    odh: null,
    tpu: null
  },
  {
    name: 'Аварийный прорыв трубы',
    mkd: null,
    dt: 6,
    odh: null,
    tpu: null
  },
  {
    name: 'Наличие упавших деревьев',
    mkd: null,
    dt: 12,
    odh: null,
    tpu: null
  },
  {
    name: 'Аварийное разрушение асфальтобетонного покрытия (углубления, выбоины более 3 см с резко очерченными краями)',
    mkd: null,
    dt: 24,
    odh: 24,
    tpu: 72
  },
  {
    name: 'Навал мусора на бункерной площадке',
    mkd: null,
    dt: 24,
    odh: null,
    tpu: null
  },
  {
    name: 'Навал мусора на контейнерной площадке',
    mkd: null,
    dt: 24,
    odh: null,
    tpu: null
  },
  {
    name: 'Падение установки наружного освещения/опоры двойного назначения/опоры контактной сети',
    mkd: null,
    dt: 24,
    odh: 24,
    tpu: 24
  },
  {
    name: 'Подтопление территории',
    mkd: null,
    dt: 24,
    odh: 24,
    tpu: 24
  },
  {
    name: 'Складирование скола асфальта',
    mkd: null,
    dt: null,
    odh: 24,
    tpu: null
  },
  {
    name: 'Наклон установки наружного освещения / опоры двойного назначения / опоры контактной сети (угол наклона составляет от 30 градусов и выше)',
    mkd: null,
    dt: 48,
    odh: 48,
    tpu: 48
  },
  {
    name: 'Провал асфальтобетонного покрытия (1 м2 и глубиной более 0,5 м)',
    mkd: null,
    dt: 48,
    odh: 48,
    tpu: 48
  },
  {
    name: 'Полное/частичное незакрытие люка / дождеприемной решетки',
    mkd: null,
    dt: null,
    odh: 48,
    tpu: null
  },
  {
    name: 'Наличие аварийных деревьев',
    mkd: null,
    dt: 720,
    odh: 720,
    tpu: 720
  },
];

type TableMetaArr<F> = {
  key: keyof F | 'index';
  width?: number;
  value?: React.ComponentType<{ rowData: F; index: number }>;
  textAlign?: 'center';
  yellowBgIfHasValue?: boolean;
}[];

const tableMetaMixed: TableMetaArr<TableMixedArr[0]> = [
  {
    key: 'index',
    value: (props) => <TdMixedMatrix width="100" textAlign="center">{props.index + 1}</TdMixedMatrix>
  },
  {
    key: 'name',
    width: 400,
    value: (props) => <TdMixedMatrix width="400"><ColorSpan colorText="#94344b">{props.rowData.name}</ColorSpan></TdMixedMatrix>
  },
  {
    key: 'mkd',
    textAlign: 'center',
    yellowBgIfHasValue: true,
  },
  {
    key: 'dt',
    textAlign: 'center',
    yellowBgIfHasValue: true,
  },
  {
    key: 'odh',
    textAlign: 'center',
    yellowBgIfHasValue: true,
  },
  {
    key: 'tpu',
    textAlign: 'center',
    yellowBgIfHasValue: true,
  },
];

const MixedMonitoring = () => (
  <React.Fragment>
    <BlockWithPadding paddingValue="0 50px">
      <MatrixTitleSecond>Всесезонный мониторинг</MatrixTitleSecond>
      <MatrixTitle hasMargin>Матрица учета <ColorSpan colorText="#94344b">критичных</ColorSpan> нарушений</MatrixTitle>
    </BlockWithPadding>
    <TableContainer maxHeight="300px" >
      <TableMixed>
        <thead>
          <tr>
            <th rowSpan={2} >№</th>
            <th rowSpan={2} >Наименование нарушений<ColorSpan colorText="#94344b">*</ColorSpan></th>
            <th colSpan={4} >Срок устранения нарушений (час) <ColorSpan colorText="#94344b">*</ColorSpan></th>
          </tr>
          <tr>
            <th>МКД</th>
            <th>ДТ</th>
            <th>ОДХ</th>
            <th>ТПУ</th>
          </tr>
        </thead>

        <tbody>
          {
            arrMixed.map((rowData, rowIndex) => (
              <tr key={rowData.name}>
                {
                  tableMetaMixed.map(
                    (metaColumn, index) => {
                      if (metaColumn.value) {
                        return (
                          <metaColumn.value key={index + 1} rowData={rowData} index={rowIndex} />
                        );
                      }

                      return (
                        <TdMixedMatrix
                          key={index + 1} 
                          textAlign={metaColumn.textAlign}
                          width={metaColumn.width ?? 100}
                          children={rowData[metaColumn.key]}
                          yellowBgIfHasValue={metaColumn.yellowBgIfHasValue ? rowData[metaColumn.key] ?? false : false}
                        />
                      );
                    }
                  )
                }
              </tr>
            ))
          }
        </tbody>
      </TableMixed>
    </TableContainer>

    <BlockWithPadding paddingValue="8px 50px 0 50px">
      <MatrixTitle><ColorSpan colorText="#94344b">*</ColorSpan>Срок устранения нарушения отсчитывается с момента его выявления</MatrixTitle>
    </BlockWithPadding>
  </React.Fragment>
);

const arrTab = [
  {
    title: 'Матрица нарушений по всесезону',
    checkToShow: (props: Props) => props.isSummerMonitor || props.isMixedMonitor,
    Component: MixedMonitoring,
  },
  {
    title: 'От 2 до 6 см',
    checkToShow: (props: Props) => props.isWinterMonitor || props.isMixedMonitor,
    Component: UntilSix,
  },
  {
    title: 'От 6 до 10 см',
    checkToShow: (props: Props) => props.isWinterMonitor || props.isMixedMonitor,
    Component: FromSixToTen,
  },
  {
    title: 'Отсутствие осадков после снегопада',
    checkToShow: (props: Props) => props.isWinterMonitor || props.isMixedMonitor,
    Component: NoSnow,
  },
  {
    title: 'Период повторяющихся снегопадов',
    checkToShow: (props: Props) => props.isWinterMonitor || props.isMixedMonitor,
    Component: WithRepeatedSnow,
  },
];

const Matrix: React.FC<Props> = React.memo(
  (props) => {
    return (
      <MatrixContent>
        <Tabs defaultActiveKey="1" animated={false}>
          {
            arrTab.reduce((newArr, rowData) => {
              if (rowData.checkToShow(props)) {
                newArr.push(
                  <TabPane tab={rowData.title} key={(newArr.length + 1).toString()}>
                    <rowData.Component /> 
                  </TabPane>
                );
              }

              return newArr;
            }, [])
          }

        </Tabs>
      </MatrixContent>
    );
  },
);

export default Matrix;