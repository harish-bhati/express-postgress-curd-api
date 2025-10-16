import {
    createUser as createUserService,
    getAllUsers as getAllUsersService,
    getUserById as getUserByIdService,
    updateUser as updateUserService,
    deleteUser as deleteUserService
} from './../models/userModel.js';

// standarized response function
const handleResponse = (res, status, data = null, message = null) => {
    res.status(status).json({ status, data, message });
}

const createUser = async (req, res, next) => {
    const {name, email, age} = req.body;  
    try {
        const newUser = await createUserService(name, email, age);
        return handleResponse(res, 201, newUser, "User created successfully");
    } catch (error) {
        next(error);
    }   
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        return handleResponse(res, 200, users, "Users fetched successfully");
    } catch (error) {
        next(error);
    }   
};

const getUserById = async (req, res, next) => {
    const {id} = req.params;    
    try {
        const user = await getUserByIdService(id);
        if (!user) {
            return handleResponse(res, 404, null, "User not found");
        }   
        return handleResponse(res, 200, user, "User fetched successfully");
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    const {id} = req.params; 
    const {name, email, age} = req.body;
    try {
        const updatedUser = await updateUserService(id, {name, email, age});
        if (!updatedUser) {
            return handleResponse(res, 404, null, "User not found");
        }   
        return handleResponse(res, 200, updatedUser, "User updated successfully");
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    const {id} = req.params;
    try {
        const deleted = await deleteUserService(id);
        if (!deleted) {
            return handleResponse(res, 404, null, "User not found");
        }
        return handleResponse(res, 204, null, "User deleted successfully");
    } catch (error) {
        next(error);
    }   
};

export { createUser, getAllUsers, getUserById, updateUser, deleteUser };