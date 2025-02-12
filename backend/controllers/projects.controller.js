import mongoose from "mongoose"
import Project from "../models/Project.model.js"
export const createProject = async (req, res) => {

    const clientId = req.user.id;
    console.log('This is the client ID',clientId)

    try {
        const {name, description, skillsRequired} = req.body;

        const clientId = req.user.id;
        console.log('This is client id', clientId)
        const project = new Project({
            name,
            description,
            skillsRequired,
            client:clientId
        })

        await project.save().then(console.log('project created successfully'))

        res.status(201).json({success:true, message:'Project created successfully', project})
    } catch (error) {
        console.log('Error creating project', error)
    }
}

export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({success:true, message:"Projects fetched successfully",projects})
    } catch (error) {
        console.log('Error getting all projects', error)
    }
}

export const getProjectsById = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const projectById = await Project.findById(id)
        res.status(200).json({success:true, message:'Successfully got project by id', projectById});
    } catch (error) {
        console.log('Error gettingProjectById', error)
    }
}

export const deleteProject = async (req, res) => {
    const id = req.params.id
    try {
        const deletedProject = await Project.findByIdAndDelete(id);
        res.status(200).json({success:true, message:'Project deleted successfully', deletedProject})
    } catch (error) {
        console.log('Error deleting project', error)
    }
}

export const updateProject = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, description, skillsRequired} = req.body;

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            {name, description, skillsRequired},
            {new:true, runValidators:true}
        );
        if(!updatedProject) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true, message: 'Project updated successfully', updatedProject });
    } catch (error) {
        console.log('error updating project',error );
        res.status(500).json({ success: false, message: 'Error updating project', error });
    }
}
