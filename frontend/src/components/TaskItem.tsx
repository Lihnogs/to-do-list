import React from "react";
import { Task } from "../api/tasksApi";
import { IconButton, Checkbox, ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  task: Task;
  onToggle: (t: Task) => void;
  onEdit: (t: Task) => void;
  onDelete: (t: Task) => void;
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  return (
    <ListItem className="bg-white rounded shadow-sm mb-2">
      <Checkbox checked={task.completed} onChange={() => onToggle(task)} />
      <ListItemText
        primary={task.title}
        secondary={task.description}
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit" onClick={() => onEdit(task)}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(task)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}