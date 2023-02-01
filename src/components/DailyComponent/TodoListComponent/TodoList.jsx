import {
  Heading,
  VStack,
  Card,
  CardBody,
  useToast,
} from "@chakra-ui/react";
import { TaskList } from "./TaskList";
import { AddTask } from "./AddTask";
import { useState, useEffect } from "react";


export function TodoList() {
  const toast = useToast();
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(newTasks);
  }

  function deleteTaskAll() {
    setTasks([]);
  }

  function checkTask(id) {
    const newTasksCheck = tasks.map((task, index, array) => {
      if (task.id === id) {
        task.check = !task.check;
      }
      return task;
    });

    setTasks(newTasksCheck);
  }

  function updateTask(id, body, onClose) {
    const info = body.trim();

    if (!info) {
      toast({
        title: "Digite su tarea",
        position: "top",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });

      return;
    }

    const newTasksUpdate = tasks.map((task, index, array) => {
      if (task.id === id) {
        task.body = body;
        task.check = false;
      }
      return task;
    });

    setTasks(newTasksUpdate);

    onClose();
  }

  function addTask(task) {
    setTasks([...tasks, task]);
  }

  

  return (
    <Card display='flex'>
      <CardBody>
        <VStack p={4} minH="20vh" pb={2}>
          <Heading
            p="0"
            fontWeight="extrabold"
            size="xl"
            bgGradient="linear(to-r, primary.200, primary.500)"
            bgClip="text"
          >
            Lista de tareas
          </Heading>
          <AddTask addTask={addTask} />
          <TaskList
            tasks={tasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
            deleteTaskAll={deleteTaskAll}
            checkTask={checkTask}
          />
        </VStack>
      </CardBody>
    </Card>
  );
}
