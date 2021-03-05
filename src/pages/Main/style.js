import styled from 'styled-components';

export const NotesContainer = styled.div`
  position: absolute;
  min-width: 90%;
  min-height: 90%;
  color: white;

  .react-grid-item {
    div {
      color: white;

      &::before {
        background-color: white;
      }
      &::after {
        background-color: white;
      }
    }

    aside {
      overflow: auto;
    }

    // disable add button
    & .add {
      display: ${({ disableAdd }) => disableAdd && 'none'};
    }

    & .note-footer {
      bottom: 0;
    }
  }
`;
