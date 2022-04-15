import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import {toDoState } from "./atoms";
import Board from "./Components/Board";
import { useEffect } from "react";
import DroppableGarbage from "./Components/DroppableGarbage";

const Wrapper = styled.div`
  display: flex;
  max-width: 780px;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

const TrashArea = styled.div`
  position: absolute;
  bottom: 40px;
`;
function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement.
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      if (destination.droppableId === "garbage") {
        setToDos((todos) => {
          const copiedSource = [...todos[source.droppableId]];
          copiedSource.splice(source.index, 1);
          const result = { ...todos, [source.droppableId]: copiedSource };
          return result;
        });
      } else {
        // cross board movement
        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          const taskObj = sourceBoard[source.index];
          console.log(taskObj);
          const destinationBoard = [...allBoards[destination.droppableId]];
          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination?.index, 0, taskObj);
          return {
            ...allBoards,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          };
        });
      }
    }
  };
  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(toDos));
  }, [toDos]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
        <TrashArea>
          <DroppableGarbage />
        </TrashArea>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
