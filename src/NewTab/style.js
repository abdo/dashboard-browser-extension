import styled from "styled-components";

export const NotesContainer = styled.div`
  position: absolute;
  min-width: 90%;
  min-height: 90%;
  color: white;
  display: ${({ hide }) => hide && "none"};

  .react-grid-item {
    max-height: 80%;

    & .note-body {
      font-size: 18px;
      height: 75%;

      & .DraftEditor-root {
        height: 100%;

        & .DraftEditor-editorContainer {
          height: 100%;

          & .public-DraftEditor-content {
            height: 100%;
          }
        }
      }
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
      display: ${({ disableAdd }) => disableAdd && "none"};
    }

    & .note-footer {
      bottom: 0;
    }
  }
`;

export const QuoteContainer = styled.div`
  width: 100%;
  display: ${({ hide }) => hide && "none"};
`;
