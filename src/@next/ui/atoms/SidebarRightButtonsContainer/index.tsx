import styled from 'styled-components';

const SidebarRightButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  pointer-events: initial;

  .ant-btn + .ant-btn {
    margin-top: -2px;
  }
  .ant-btn {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }

  .ant-btn:first-child {
    border-top: none;
  }

  .ant-btn:first-child {
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }

  .ant-btn:last-child {
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border-bottom: none;
  }
`;

export default SidebarRightButtonsContainer;
