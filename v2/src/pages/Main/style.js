import styled from 'styled-components';

export const NotesContainer = styled.div`
  position: absolute;
  min-width: 90%;
  min-height: 90%;
  color: white;
  display: ${({ hide }) => hide && 'none'};

  .react-grid-item {
    max-height: 80%;

    &:nth-child(1) {
      & .public-DraftEditorPlaceholder-inner {
        &::after {
          position: absolute;
          left: 50%;
          transform: translate(-50%, 0);
          top: 50%;
          content: ' New-Feature! You can show or hide notes through Settings ⚙';
          font-size: 12px;
          width: fit-content;
          background-color: transparent;
        }
      }
    }

    & .note-body {
      font-size: 18px;
    }

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

export const QuoteContainer = styled.div`
  width: 100%;
  display: ${({ hide }) => hide && 'none'};
`;
