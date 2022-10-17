import { FormEvent, useState } from "react";
import { CheckCircle, ClipboardText, PlusCircle, Trash } from "phosphor-react";

import styles from './App.module.css';
import { Header } from "./components/Header";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState('');

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: Math.random(),
      title: task,
      isComplete: false
    }

    setTasks(oldState => [...oldState, newTask]);
    setTask('');
  }
  
  function handleToggleTaskComplete(id: number) {
    const checkedTasks = tasks.map(task =>  task.id === id ? {
      ...task,
      isComplete: !task.isComplete,
    } : task);

    setTasks(checkedTasks);
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter(task => task.id !== id);

    setTasks(filteredTasks);
  }

  const completedTasks = tasks.filter(task => task.isComplete).length;

  return (
    <>
      <Header />

      <main className={styles.main}>
        <div className={styles.tasks}>

          <form className={styles.addTask} onSubmit={handleCreateNewTask}>
            <input 
              type="text" 
              placeholder="Adicione uma nova tarefa" 
              value={task}
              onChange={event => setTask(event.target.value)}
            />
            <button type="submit" className={styles.buttonCreateTask}>Criar <PlusCircle /></button>
          </form>

          <div className={styles.tasksContainer}>
            <div className={styles.infoTasks}>
              <span className={styles.titleTasks}>Tarefas criadas <span>{tasks.length}</span></span>
              <span className={styles.completeTasks}>Concluídas <span>{completedTasks} de {tasks.length}</span></span>
            </div>

            {tasks.length > 0 ? (
              <ul className={styles.listTasks}>
                {tasks.map(task => (
                  <li key={task.id}>
                    <div>
                    <button
                      className={styles.checkContainer}
                      onClick={() => handleToggleTaskComplete(task.id)}
                    >
                      {task.isComplete ? <CheckCircle weight="fill" /> : <div />}
                    </button>
                      <p className={task.isComplete ? styles.taskComplete : ''}>{task.title}</p>
                      <button type="button" onClick={() => handleRemoveTask(task.id)}>
                        <Trash width={24} height={24} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={styles.empty}>
              <ClipboardText size={50} />
              <div>
                <p>Você ainda não tem tarefas cadastradas</p>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
            </div>
            )}

          </div>
        </div>
      </main>
    </>
  )
}

export default App
