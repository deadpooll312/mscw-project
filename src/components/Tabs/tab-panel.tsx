import * as React from 'react';
import styled from 'styled-components';

type Props = {
  id: string;
};

const TabPanel: React.FC<Props> = React.memo(
  (props) => {
    return (
      <Container id={props.id}>
        {props.children}
      </Container>
    );
  },
);

export default TabPanel;

const Container = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  /* padding: 0 16px; */
  overflow: hidden;
  position: relative;
  min-height: 27vh;
`;
