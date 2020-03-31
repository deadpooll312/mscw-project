import * as React from 'react';
import { PieChartComponent } from 'components/PieChart';

type PropsReportPieChartComponent = {
  colors: any[];
  item: {
    name: string;
    objects: {
      value: number;
    }[];
  };
};
const ReportPieChartComponent: React.FC<PropsReportPieChartComponent> = React.memo(
  (props) => {
    const data = React.useMemo(
      () => {
        return props.item.objects.map((item) => ({ name: `${item.value}%`, value: Math.abs(item.value) }));
      },
      [props.item.objects],
    );

    return (
      <PieChartComponent
        colors={props.colors}
        name={props.item.name}
        data={data}
      />
    );
  },
);

export default ReportPieChartComponent;
