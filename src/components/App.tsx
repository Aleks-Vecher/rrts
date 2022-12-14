import React from 'react'
import { connect } from 'react-redux'
import { Todo, fetchTodos, deleteTodo } from '../actions'
import { StoreState } from '../reducers'

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

interface AppState {
  fetching: boolean
}

class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.state = { fetching: false }
  }

  onButtonClick = (): void => {
    this.setState({ fetching: true })
    this.props.fetchTodos().then((): void => {
      this.setState({ fetching: false })
    })
  }

  onTodoClick = (id: number): void => {
    this.props.deleteTodo(id);
  };

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return <div onClick={() => this.onTodoClick(todo.id)} key={todo.id}>{todo.title}</div>
    })
  }


  render() {
    return <div>
      <button onClick={this.onButtonClick}>Fetch</button>
      {this.state.fetching ? 'LOADING' : null}
      {this.renderList()}
    </div>
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos: todos }
}

export const App = connect(
  mapStateToProps,
  { fetchTodos, deleteTodo }
)(_App)