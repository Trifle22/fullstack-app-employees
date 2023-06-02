import express from 'express';
const router = express.Router();
import { auth } from '@/middleware/auth';
import { addEmployee, editEmployee, getAll, getByID, removeEmployee } from '@/controllers/employees';

/* GET employees listing. */
// api/employees
router.get('/', auth, getAll)
// api/employees/:id
router.get('/:id', auth, getByID)
//api/employees/add
router.post('/add', auth, addEmployee)
//api/employees/remove/:id
router.post('/remove/:id', auth, removeEmployee)
//api/employees//edit/:id
router.put('/edit/:id', auth, editEmployee)

export default router;