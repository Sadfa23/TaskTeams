import express from 'express'
import { createProject,
    getAllProjects, 
    getProjectsById,
    deleteProject, 
    updateProject} from '../controllers/projects.controller.js';

const router = express.Router();

router.post('/create', createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectsById);
router.delete('/delete/:id', deleteProject);
router.put('/update/:id', updateProject);

export default router