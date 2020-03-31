import * as React from 'react';
import uniqueId from 'lodash-es/uniqueId';
import {
  create,
} from '@amcharts/amcharts4/core';
import {
  XYChart,
  CategoryAxis,
  ValueAxis,
  ColumnSeries,
  LabelBullet,
} from '@amcharts/amcharts4/charts';

const data = [
  {
    name: 'ЦАО',
    total: 66,
    checkedObject: 9008,
    totalObject: 11011,
    percent: '0.73',
    objects: [
      {
        name: 'объекты с критичными зимними нарушениями',
        type: 'online_critical_winter',
        value: 1,
        percent: '1.52'
      },
      {
        name: 'объекты с некритичными зимними нарушениями',
        type: 'online_not_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с критичными всесезонными нарушениями',
        type: 'online_critical_all',
        value: 65,
        percent: '98.48'
      },
      {
        name: 'объекты с некритичными всесезонными нарушениями',
        type: 'online_not_critical_all',
        value: 0,
        percent: '0.00'
      }
    ],
    coefficients: [
      {
        name: 'Проверено',
        type: 'checked_object',
        value: 9008,
        percent: '81.81'
      },
      {
        name: 'Ведомством',
        type: 'government',
        value: 4576,
        percent: '41.56'
      },
      {
        name: 'Жителями',
        type: 'citizen',
        value: 4341,
        percent: '39.42'
      },
      {
        name: 'Ведомством и жителями',
        type: 'government_citizen',
        value: 88,
        percent: '0.80'
      }
    ]
  },
  {
    name: 'ЗелАО',
    total: 2,
    checkedObject: 564,
    totalObject: 1525,
    percent: '0.35',
    objects: [
      {
        name: 'объекты с критичными зимними нарушениями',
        type: 'online_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с некритичными зимними нарушениями',
        type: 'online_not_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с критичными всесезонными нарушениями',
        type: 'online_critical_all',
        value: 2,
        percent: '100.00'
      },
      {
        name: 'объекты с некритичными всесезонными нарушениями',
        type: 'online_not_critical_all',
        value: 0,
        percent: '0.00'
      }
    ],
    coefficients: [
      {
        name: 'Проверено',
        type: 'checked_object',
        value: 564,
        percent: '36.98'
      },
      {
        name: 'Ведомством',
        type: 'government',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'Жителями',
        type: 'citizen',
        value: 548,
        percent: '35.93'
      },
      {
        name: 'Ведомством и жителями',
        type: 'government_citizen',
        value: 0,
        percent: '0.00'
      }
    ]
  },
  {
    name: 'ЮВАО',
    total: 10,
    checkedObject: 3748,
    totalObject: 9357,
    percent: '0.27',
    objects: [
      {
        name: 'объекты с критичными зимними нарушениями',
        type: 'online_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с некритичными зимними нарушениями',
        type: 'online_not_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с критичными всесезонными нарушениями',
        type: 'online_critical_all',
        value: 10,
        percent: '100.00'
      },
      {
        name: 'объекты с некритичными всесезонными нарушениями',
        type: 'online_not_critical_all',
        value: 0,
        percent: '0.00'
      }
    ],
    coefficients: [
      {
        name: 'Проверено',
        type: 'checked_object',
        value: 3748,
        percent: '40.06'
      },
      {
        name: 'Ведомством',
        type: 'government',
        value: 63,
        percent: '0.67'
      },
      {
        name: 'Жителями',
        type: 'citizen',
        value: 3655,
        percent: '39.06'
      },
      {
        name: 'Ведомством и жителями',
        type: 'government_citizen',
        value: 9,
        percent: '0.10'
      }
    ]
  },
  {
    name: 'ЮЗАО',
    total: 8,
    checkedObject: 3384,
    totalObject: 8734,
    percent: '0.24',
    objects: [
      {
        name: 'объекты с критичными зимними нарушениями',
        type: 'online_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с некритичными зимними нарушениями',
        type: 'online_not_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с критичными всесезонными нарушениями',
        type: 'online_critical_all',
        value: 8,
        percent: '100.00'
      },
      {
        name: 'объекты с некритичными всесезонными нарушениями',
        type: 'online_not_critical_all',
        value: 0,
        percent: '0.00'
      }
    ],
    coefficients: [
      {
        name: 'Проверено',
        type: 'checked_object',
        value: 3384,
        percent: '38.75'
      },
      {
        name: 'Ведомством',
        type: 'government',
        value: 223,
        percent: '2.55'
      },
      {
        name: 'Жителями',
        type: 'citizen',
        value: 3119,
        percent: '35.71'
      },
      {
        name: 'Ведомством и жителями',
        type: 'government_citizen',
        value: 0,
        percent: '0.00'
      }
    ]
  },
  {
    name: 'САО',
    total: 8,
    checkedObject: 3801,
    totalObject: 9105,
    percent: '0.21',
    objects: [
      {
        name: 'объекты с критичными зимними нарушениями',
        type: 'online_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с некритичными зимними нарушениями',
        type: 'online_not_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с критичными всесезонными нарушениями',
        type: 'online_critical_all',
        value: 8,
        percent: '100.00'
      },
      {
        name: 'объекты с некритичными всесезонными нарушениями',
        type: 'online_not_critical_all',
        value: 0,
        percent: '0.00'
      }
    ],
    coefficients: [
      {
        name: 'Проверено',
        type: 'checked_object',
        value: 3801,
        percent: '41.75'
      },
      {
        name: 'Ведомством',
        type: 'government',
        value: 71,
        percent: '0.78'
      },
      {
        name: 'Жителями',
        type: 'citizen',
        value: 3705,
        percent: '40.69'
      },
      {
        name: 'Ведомством и жителями',
        type: 'government_citizen',
        value: 0,
        percent: '0.00'
      }
    ]
  },
  {
    name: 'ЗАО',
    total: 6,
    checkedObject: 3540,
    totalObject: 9837,
    percent: '0.17',
    objects: [
      {
        name: 'объекты с критичными зимними нарушениями',
        type: 'online_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с некритичными зимними нарушениями',
        type: 'online_not_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с критичными всесезонными нарушениями',
        type: 'online_critical_all',
        value: 6,
        percent: '100.00'
      },
      {
        name: 'объекты с некритичными всесезонными нарушениями',
        type: 'online_not_critical_all',
        value: 0,
        percent: '0.00'
      }
    ],
    coefficients: [
      {
        name: 'Проверено',
        type: 'checked_object',
        value: 3540,
        percent: '35.99'
      },
      {
        name: 'Ведомством',
        type: 'government',
        value: 134,
        percent: '1.36'
      },
      {
        name: 'Жителями',
        type: 'citizen',
        value: 3383,
        percent: '34.39'
      },
      {
        name: 'Ведомством и жителями',
        type: 'government_citizen',
        value: 0,
        percent: '0.00'
      }
    ]
  },
  {
    name: 'СЗАО',
    total: 4,
    checkedObject: 2501,
    totalObject: 5965,
    percent: '0.16',
    objects: [
      {
        name: 'объекты с критичными зимними нарушениями',
        type: 'online_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с некритичными зимними нарушениями',
        type: 'online_not_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с критичными всесезонными нарушениями',
        type: 'online_critical_all',
        value: 4,
        percent: '100.00'
      },
      {
        name: 'объекты с некритичными всесезонными нарушениями',
        type: 'online_not_critical_all',
        value: 0,
        percent: '0.00'
      }
    ],
    coefficients: [
      {
        name: 'Проверено',
        type: 'checked_object',
        value: 2501,
        percent: '41.93'
      },
      {
        name: 'Ведомством',
        type: 'government',
        value: 38,
        percent: '0.64'
      },
      {
        name: 'Жителями',
        type: 'citizen',
        value: 2435,
        percent: '40.82'
      },
      {
        name: 'Ведомством и жителями',
        type: 'government_citizen',
        value: 0,
        percent: '0.00'
      }
    ]
  },
  {
    name: 'ВАО',
    total: 6,
    checkedObject: 4665,
    totalObject: 11790,
    percent: '0.13',
    objects: [
      {
        name: 'объекты с критичными зимними нарушениями',
        type: 'online_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с некритичными зимними нарушениями',
        type: 'online_not_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с критичными всесезонными нарушениями',
        type: 'online_critical_all',
        value: 6,
        percent: '100.00'
      },
      {
        name: 'объекты с некритичными всесезонными нарушениями',
        type: 'online_not_critical_all',
        value: 0,
        percent: '0.00'
      }
    ],
    coefficients: [
      {
        name: 'Проверено',
        type: 'checked_object',
        value: 4665,
        percent: '39.57'
      },
      {
        name: 'Ведомством',
        type: 'government',
        value: 87,
        percent: '0.74'
      },
      {
        name: 'Жителями',
        type: 'citizen',
        value: 4539,
        percent: '38.50'
      },
      {
        name: 'Ведомством и жителями',
        type: 'government_citizen',
        value: 5,
        percent: '0.04'
      }
    ]
  },
  {
    name: 'ЮАО',
    total: 4,
    checkedObject: 3290,
    totalObject: 9315,
    percent: '0.12',
    objects: [
      {
        name: 'объекты с критичными зимними нарушениями',
        type: 'online_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с некритичными зимними нарушениями',
        type: 'online_not_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с критичными всесезонными нарушениями',
        type: 'online_critical_all',
        value: 4,
        percent: '100.00'
      },
      {
        name: 'объекты с некритичными всесезонными нарушениями',
        type: 'online_not_critical_all',
        value: 0,
        percent: '0.00'
      }
    ],
    coefficients: [
      {
        name: 'Проверено',
        type: 'checked_object',
        value: 3290,
        percent: '35.32'
      },
      {
        name: 'Ведомством',
        type: 'government',
        value: 64,
        percent: '0.69'
      },
      {
        name: 'Жителями',
        type: 'citizen',
        value: 3214,
        percent: '34.50'
      },
      {
        name: 'Ведомством и жителями',
        type: 'government_citizen',
        value: 0,
        percent: '0.00'
      }
    ]
  },
  {
    name: 'СВАО',
    total: 4,
    checkedObject: 3577,
    totalObject: 9729,
    percent: '0.11',
    objects: [
      {
        name: 'объекты с критичными зимними нарушениями',
        type: 'online_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с некритичными зимними нарушениями',
        type: 'online_not_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с критичными всесезонными нарушениями',
        type: 'online_critical_all',
        value: 4,
        percent: '100.00'
      },
      {
        name: 'объекты с некритичными всесезонными нарушениями',
        type: 'online_not_critical_all',
        value: 0,
        percent: '0.00'
      }
    ],
    coefficients: [
      {
        name: 'Проверено',
        type: 'checked_object',
        value: 3577,
        percent: '36.77'
      },
      {
        name: 'Ведомством',
        type: 'government',
        value: 171,
        percent: '1.76'
      },
      {
        name: 'Жителями',
        type: 'citizen',
        value: 3379,
        percent: '34.73'
      },
      {
        name: 'Ведомством и жителями',
        type: 'government_citizen',
        value: 0,
        percent: '0.00'
      }
    ]
  },
  {
    name: 'НАО',
    total: 0,
    checkedObject: 1481,
    totalObject: 5979,
    percent: '0.00',
    objects: [
      {
        name: 'объекты с критичными зимними нарушениями',
        type: 'online_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с некритичными зимними нарушениями',
        type: 'online_not_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с критичными всесезонными нарушениями',
        type: 'online_critical_all',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с некритичными всесезонными нарушениями',
        type: 'online_not_critical_all',
        value: 0,
        percent: '0.00'
      }
    ],
    coefficients: [
      {
        name: 'Проверено',
        type: 'checked_object',
        value: 1481,
        percent: '24.77'
      },
      {
        name: 'Ведомством',
        type: 'government',
        value: 33,
        percent: '0.55'
      },
      {
        name: 'Жителями',
        type: 'citizen',
        value: 1448,
        percent: '24.22'
      },
      {
        name: 'Ведомством и жителями',
        type: 'government_citizen',
        value: 0,
        percent: '0.00'
      }
    ]
  },
  {
    name: 'ТАО',
    total: 0,
    checkedObject: 849,
    totalObject: 7478,
    percent: '0.00',
    objects: [
      {
        name: 'объекты с критичными зимними нарушениями',
        type: 'online_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с некритичными зимними нарушениями',
        type: 'online_not_critical_winter',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с критичными всесезонными нарушениями',
        type: 'online_critical_all',
        value: 0,
        percent: '0.00'
      },
      {
        name: 'объекты с некритичными всесезонными нарушениями',
        type: 'online_not_critical_all',
        value: 0,
        percent: '0.00'
      }
    ],
    coefficients: [
      {
        name: 'Проверено',
        type: 'checked_object',
        value: 849,
        percent: '11.35'
      },
      {
        name: 'Ведомством',
        type: 'government',
        value: 35,
        percent: '0.47'
      },
      {
        name: 'Жителями',
        type: 'citizen',
        value: 814,
        percent: '10.89'
      },
      {
        name: 'Ведомством и жителями',
        type: 'government_citizen',
        value: 0,
        percent: '0.00'
      }
    ]
  }
];

type Props = {};

const HorizontalChart: React.FC<Props> = (props) => {
  const [id] = React.useState(() => uniqueId('chart_container-'));

  const chartDivRef = React.useRef(null);
  React.useEffect(() => {
    let chart = create(id, XYChart);

    // Add data
    chart.data = data;

    var categoryAxis = chart.yAxes.push(new CategoryAxis());
    categoryAxis.dataFields.category = 'name';
    // categoryAxis.renderer.grid.template.opacity = 0;
    // categoryAxis.renderer.labels.template.disabled = true;

    var valueAxis = chart.xAxes.push(new ValueAxis());
    valueAxis.min = 10;
    // valueAxis.renderer.grid.template.opacity = 0;
    categoryAxis.renderer.minGridDistance = 1;
    valueAxis.renderer.line.strokeOpacity = 0.5;
    valueAxis.renderer.line.disabled = true;
    // valueAxis.renderer.labels.template.disabled = false;

    var series = chart.series.push(new ColumnSeries());

    series.dataFields.valueX = 'total';
    series.dataFields.categoryY = 'name';
    series.columns.template.tooltipText = 'Series: {name}\nCategory: {categoryX}\nValue: {valueY}';

    var labelBullet = series.bullets.push(new LabelBullet());
    labelBullet.label.text = '{valueX}';
    labelBullet.marginLeft = 200;

    //удаление лого с ссылкорй на либу
    const logo = chartDivRef.current.querySelector('g[aria-labelledby]');
    logo.parentNode.removeChild(logo);

    return () => {
      chart.dispose();
      chartDivRef.current = null;
    };
  }, []);
  return <div ref={chartDivRef} id={id} style={{height: '300px', width: '300px',  float:'left'}}/>;
};

export default HorizontalChart
;
