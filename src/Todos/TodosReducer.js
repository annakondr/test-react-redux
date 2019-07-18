// ------------------------------------
// Constants
// ------------------------------------
export const TODOS_ADD = 'TODOS_ADD';
export const TODOS_REMOVE = 'TODOS_REMOVE';
export const TODOS_SELECT = 'TODOS_SELECT';
export const TODOS_SAVE = 'TODOS_SAVE';
export const TODOS_EDITING = 'TODOS_VALIDATION';
// ------------------------------------
// Actions
// ------------------------------------
export function add (todo = '') {
  return {
    type: TODOS_ADD,
    payload: todo
  }
}

export function remove (todo) {
  return {
    type: TODOS_REMOVE,
    payload: todo
  }
}

export function select (todo) {
  return {
    type: TODOS_SELECT,
    payload: todo
  }
}

export function save () {
  return {
    type: TODOS_SAVE,
  }
}

export function edit (todo) {
  return {
    type: TODOS_EDITING,
    payload: todo
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TODOS_ADD]: (state, action) => [...state, action.payload],
  [TODOS_REMOVE]: (state, action) => state.filter(t => t !== action.payload),
  [TODOS_SELECT]: (state, action) => state.map(t => action.payload === t ? action.payload + `edited` : t),
  [TODOS_SAVE]: (state, action) => state.map(t => t),
  [TODOS_EDITING]: (state, action) => state.map(t => t === action.payload ? action.payload +`editing` : t)

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = ['Buy milk', 'Do exercises', 'Cook dinner']

export default function todosReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
