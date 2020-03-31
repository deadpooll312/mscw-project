import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getIncidentsAction } from 'app/store/modules/semantics/actions';
import { selectSecondaryFilters, selectInitialFilters, selectPrimaryFiltersWithoutTheme, selectSecondaryFiltersWithSearch } from 'app/store/modules/sidebar/selectors';

type Props = {};

const LoadIncidentsTrigger: React.FC<Props> = React.memo(
  (props) => {
    const primaryFiltersOwn = useSelector(selectPrimaryFiltersWithoutTheme);
    const secondaryFiltersOwn = useSelector(selectSecondaryFilters);
    const secondaryFiltersWithSearch = useSelector(selectSecondaryFiltersWithSearch);
    const initialFilters = useSelector(selectInitialFilters);

    const dispatch = useDispatch();

    React.useEffect(() => {
      if (Object.keys(initialFilters).length) {
        dispatch(getIncidentsAction(primaryFiltersOwn, secondaryFiltersWithSearch));
      }
    }, [primaryFiltersOwn, secondaryFiltersOwn, initialFilters]);

    return null;
  },
);

export default LoadIncidentsTrigger;
