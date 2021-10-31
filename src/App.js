import './index.css';
import { Text } from './components/Text/Text';
import { AddToDoInput } from './components/AddToDoInput/AddToDoInput';
import { ToDoList } from './components/ToDoList/ToDoList';
import { TodosProvider } from './providers/TodosProvider';

const App = () => (
  <div className="application">
    <Text size="30px">Todos</Text>
    <TodosProvider>
      <>
        <AddToDoInput />
        <ToDoList />
      </>
    </TodosProvider>
  </div>
);

export default App;
