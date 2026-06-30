export const CONFIRM_MODAL_TEXTS = {
  delete: {
    title: 'Delete an event?',
    message: 'This action cannot be canceled. Are you sure you want to delete this event?',
    cancelButton: 'Cancel',
    confirmButton: 'Confirm',
  },
  save: {
    title: 'Save changes?',
    message: 'Are you sure you want to save these changes?',
    cancelButton: 'Cancel',
    confirmButton: 'Save',
  },
  logout: {
    title: 'Logout?',
    message: 'Are you sure you want to log out?',
    cancelButton: 'Cancel',
    confirmButton: 'Logout',
  },
} as const;

export type ConfirmModalType = keyof typeof CONFIRM_MODAL_TEXTS;
