import styled from "styled-components";

export const QuoteContainer = styled.div`
  width: 100%;
  display: ${({ hide }) => hide && "none"};
`;
