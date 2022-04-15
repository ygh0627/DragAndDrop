import { atom } from "recoil";

//개별 투두에 대한 인터페이스
export interface ITodo {
  id: number;
  text: string;
}
//투두들의 집합으로 이루어진 인터페이스.
interface IToDoState {
  [key: string]: ITodo[];
}
const localStorageTodo = localStorage.getItem("TODOS") || "null";
export const parsedLocalStorageTodo = JSON.parse(localStorageTodo);

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: parsedLocalStorageTodo
    ? parsedLocalStorageTodo
    : { "To Do": [], Doing: [], Done: [] },
});
