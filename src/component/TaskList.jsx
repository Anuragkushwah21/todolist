import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import "../assets/a.css";
import { useState,useEffect } from 'react';
function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
  
    useEffect(() => {
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      setTasks(storedTasks);
    }, []);
  
    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
  
    const addTask = () => {
      if (newTask.trim()) {
        setTasks([...tasks, { text: newTask, completed: false }]);
        setNewTask('');
      }
    };
  
    const toggleTask = index => {
      const newTasks = tasks.map((task, i) => {
        if (i === index) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      setTasks(newTasks);
    };
  
    const deleteTask = index => {
      setTasks(tasks.filter((_, i) => i !== index));
    };
    return (
      <Container className="mt-5">
        <h1 className="text-center mb-4">TODO</h1>
        <Form className="mb-3">
          <Form.Control
            type="text"
            placeholder="Create a new todo..."
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
          />
          <Button className="mt-2" onClick={addTask}>Add Task</Button>
        </Form>
        <ListGroup>
          {tasks.map((task, index) => (
            <ListGroup.Item key={index} className={`d-flex justify-content-between ${task.completed ? 'completed' : ''}`}>
              <span onClick={() => toggleTask(index)}>{task.text}</span>
              <Button variant="danger" onClick={() => deleteTask(index)}>Delete</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    );
  }

export default TaskList
