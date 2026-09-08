package com.taskflow.controller;

import com.taskflow.model.Task;
import com.taskflow.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Get all tasks for a user
    @GetMapping("/{userId}")
    public List<Task> getTasks(@PathVariable Long userId) {
        return taskService.getTasks(userId);
    }

    // Get one task by ID
    @GetMapping("/single/{id}")
    public Task getTask(@PathVariable Long id) {
        return taskService.getTask(id);
    }

    // Create a task
    @PostMapping("/{userId}")
    public Task createTask(
            @RequestBody Task task,
            @PathVariable Long userId) {

        return taskService.createTask(task, userId);
    }

    // Update a task
    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable Long id,
            @RequestBody Task task) {

        return taskService.updateTask(id, task);
    }

    // Delete a task
    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {

        taskService.deleteTask(id);

        return "Task deleted successfully";
    }
}