import React from 'react'
import PropTypes from 'prop-types'
import {validate} from './TodosReducer';

export const Todos = ({ todos, remove, add, select, save, edit }) => {
  let valid=''
  let input;
  return (
  <div style={{ margin: '0 auto', maxWidth: '400px' }} >
    <h2>Todos:</h2>
    <ul className='list-group list-group-flush'>
    {todos.length !== 0 ?
      todos.map((t, idx) => {
        if (!t.includes('edited')) {
          return (
            <li key={t}
                className='list-group-item d-flex justify-content-between align-items-center'
                >
              {++idx}. <p onClick={(e) => select(e.target.innerText)}>{t}</p>
              <button className='close' onClick={()=> remove(t)}>
                <span >&times;</span>
              </button>
            </li>
          )
        }
         return (
            <li key={t}
                className='list-group-item d-flex justify-content-between align-items-center'>
              {++idx}. <input defaultValue={t.replace('edited','')} onChange={(e) => edit(e.target.value)}/>
              <button className='close' onClick={()=> save()}>
                <span>save</span>
              </button>

            </li>
        )
      }
        ) :
      alert('Congrats! You did it!')
    }
    </ul>

    <br />
    <div className='input-group'>
      <input type='text' className={`form-control ${valid}`}
             placeholder='Write something' onChange={(e) => input = e.target.value}/>
      <div className='input-group-append'>
        <button className='btn btn-outline-secondary' type="submit"
                onClick={() => todos.some(i => i === input.trim()) ? valid='is-invalid' : (add(input), valid='is-valid')}>
          Add
        </button>
      </div>
      <span className="invalid-feedback" >
        You must enter a different name of todo.
      </span>
    </div>

  </div>
)}
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
}

export default Todos
