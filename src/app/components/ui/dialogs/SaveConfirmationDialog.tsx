/**
 * @file SaveConfirmationDialog.tsx
 * @description  Save confirmation dialog component
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-07-13
 * @module UI
 *
 */

'use client';

import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface SaveConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SaveConfirmationDialog: React.FC<SaveConfirmationDialogProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Unsaved Changes"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You have unsaved changes. Do you want to save them before proceeding?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} autoFocus variant="contained">
          Save and Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveConfirmationDialog;