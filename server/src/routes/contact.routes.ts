import { Router } from 'express';
import {
  submitContact,
  getContacts,
  markAsRead,
  deleteContact,
} from '../controllers/contact.controller';

const router = Router();

router.route('/')
  .post(submitContact)
  .get(getContacts);

router.route('/:id')
  .delete(deleteContact);

router.route('/:id/read')
  .put(markAsRead);

export default router;
