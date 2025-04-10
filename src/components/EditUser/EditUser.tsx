import React, { useState } from 'react';
import { User } from '../../types';
import { updateUser } from '../../services/usersService';
import styles from './EditUser.module.css';

interface EditUserProps {
    user: User;
    onUpdate: (updatedUser: User) => void;
    onCancel: () => void;
}

const EditUser: React.FC<EditUserProps> = ({ user, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState<User>(user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'age' || name === 'phone' ? Number(value) : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData._id) {
            console.error('User ID is missing. Cannot update user.');
            return;
        }
        try {
            const updatedUser = await updateUser(formData);
            onUpdate(updatedUser); // Notifica al componente padre con el usuario actualizado
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className={styles.editUserContainer}>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit} className={styles.editUserForm}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled // El nombre no se puede editar
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="number"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditUser;