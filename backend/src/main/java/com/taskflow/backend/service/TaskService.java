package com.taskflow.service;

import com.taskflow.model.Task;
import com.taskflow.model.User;
import com.taskflow.repository.TaskRepository;
import com.taskflow.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository,
                       UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    // Get all tasks for a user
    public List<Task> getTasks(Long userId) {
        return taskRepository.findByUserId(userId);
    }

    // Get one task by ID
    public Task getTask(Long id) {

        return taskRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Task not found"));
    }

    // Create a task
    public Task createTask(Task task, Long userId) {

        User user = userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        task.setUser(user);
        task.setStatus("PENDING");

        return taskRepository.save(task);
    }

    // Update a task
    public Task updateTask(Long id, Task updatedTask) {

        Task task = taskRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Task not found"));

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setPriority(updatedTask.getPriority());
        task.setStatus(updatedTask.getStatus());

        return taskRepository.save(task);
    }

    // Delete a task
    public void deleteTask(Long id) {

        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task not found");
        }

        taskRepository.deleteById(id);
    }
}