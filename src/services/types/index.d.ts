export interface LoginTypes {
  username: string;
  password: string;
}

export interface RegisterTypes extends LoginTypes {
  email: string;
}

export interface ChecklistTypes {
  id: number;
  name: string;
  checklistCompletionStatus: boolean;
  items: ChecklistItemTypes[];
}

export interface ChecklistItemTypes {
  id: number;
  itemCompletionStatus: boolean;
  name: string;
}
