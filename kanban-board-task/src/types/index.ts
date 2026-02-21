export type ColumnType = 'todo' | 'inProgress' | 'done';

export interface Task {
  id: string;
  title: string;
  column: ColumnType;
}

export interface Column {
  id: ColumnType;
  title: string;
}