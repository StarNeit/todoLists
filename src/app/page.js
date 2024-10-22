"use client";
import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { fetchCountries } from '../utils/api';
import {sortedArray} from "@/utils/core";

export default function HomePage() {
    const [tasks, setTasks] = useState([]);
    const [countries, setCountries] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
    const [task, setTask] = useState({
        user: '',
        country: '',
        description: '',
    });

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);

    fetchCountries()
        .then((res) => {
            const sortCountries = sortedArray(res);
            // console.log({res, sortCountries})
          setCountries(sortCountries);
        }).catch(console.error);
  }, []);

    const handleAddTask = (newTask) => {
        let updatedTasks;
        if (isEditing && currentTaskIndex !== null) {
            updatedTasks = tasks.map((t, index) =>
                index === currentTaskIndex ? newTask : t
            );
        } else {
            updatedTasks = [...tasks, newTask];
        }

        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        resetForm();
    };

    const handleEditTask = (index) => {
        setTask(tasks[index]);
        setIsEditing(true);
        setCurrentTaskIndex(index);
        console.log({index, task})
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        resetForm();
    };

    const resetForm = () => {
        setTask({ user: '', country: '', description: '' });
        setIsEditing(false);
        setCurrentTaskIndex(null);
    };


    return (
      <div>
        <TaskForm
            task={task}
            onSubmit={handleAddTask}
            countries={countries}
            isEditing={isEditing}
            resetForm={resetForm}
        />
        <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
      </div>
  );
}
