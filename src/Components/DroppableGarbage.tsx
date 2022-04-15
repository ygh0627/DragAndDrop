import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTrashArrowUp } from "@fortawesome/free-solid-svg-icons";
const Container = styled.div`
  width: 150px;
  height: 150px;
`;

const Content = styled.div<{
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}>`
  font-size: 60px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  padding: 10px;
  background-color: ${(props) =>
    props.isDraggingOver === true
      ? "rgba(223, 230, 233,0.3)"
      : props.draggingFromThisWith === true
      ? "rgba(225, 112, 85,0.5)"
      : "transparent"};
`;

function DroppableGarbage() {
  return (
    <Container>
      <Droppable droppableId="garbage">
        {(
          provided: DroppableProvided,
          {
            isDraggingOver,
            draggingOverWith,
            draggingFromThisWith,
            isUsingPlaceholder,
          }: DroppableStateSnapshot
        ) => (
          <Content
            isDraggingOver={isDraggingOver}
            draggingFromThisWith={Boolean(draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {isDraggingOver === false ? (
              <FontAwesomeIcon icon={faTrash} />
            ) : (
              <FontAwesomeIcon icon={faTrashArrowUp} />
            )}
            {provided.placeholder}
          </Content>
        )}
      </Droppable>
    </Container>
  );
}
export default DroppableGarbage;
