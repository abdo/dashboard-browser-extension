import styled from 'styled-components';

export const NotesContainer = styled.div`
  position: absolute;
  min-width: 90%;
  min-height: 90%;
  color: white;

  // disable add button
  .react-grid-item .add {
    display: ${({ disableAdd }) => disableAdd && 'none'};
  }

  .react-grid-item div {
    color: white;

    &::before {
      background-color: white;
    }
    &::after {
      background-color: white;
    }
  }
`;
