import {useEffect, useState} from 'react';

const TaskForm = ({ onSubmit, countries, task, isEditing, resetForm }) => {
    const [formState, setFormState] = useState({
        user: '',
        country: '',
        description: '',
    });

    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (task) {
            setFormState(task);
        }
    }, [task]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formState.user || !formState.country || !formState.description) {
            setAlert('All fields are required');
            return;
        }

        if (formState.description.length > 120) {
            setAlert('Description cannot exceed 120 characters');
            return;
        }

        onSubmit(formState);
        setAlert(null);
        setFormState({
            user: '',
            country: '',
            description: '',
        });
    };

    return (
        <div className="flex justify-center items-center py-10 ">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg shadow-blue-500/50 w-1/2 space-y-4 py-[50px]"
            >
                {alert && <div className="bg-red-100 text-red-700 p-2 rounded">{alert}</div>}
                <input
                    type="text"
                    name="user"
                    value={formState.user}
                    onChange={handleChange}
                    placeholder="User assigned"
                    className="w-full p-2 border dark:bg-gray-600 dark:text-white text-black  border-gray-300 dark:border-none rounded"
                    required
                />
                <select
                    name="country"
                    value={formState.country}
                    onChange={handleChange}
                    className="w-full p-2 border dark:bg-gray-600 dark:text-white text-black border-gray-300 dark:border-none rounded"
                    required
                >
                    <option value="" className={"dark:text-white-500"}>Select country</option>
                    {countries.map((country) => (
                        <option key={country.code} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </select>
                <textarea
                    name="description"
                    value={formState.description}
                    onChange={handleChange}
                    maxLength={120}
                    placeholder="Description"
                    className="w-full p-2 border dark:bg-gray-600 dark:text-white text-black border-gray-300 dark:border-none rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                    {isEditing ? 'Update Task' : 'Add Task'}
                </button>


                {
                    isEditing &&
                        <p
                            className={"cursor-pointer self-center text-center dark:text-gray-200 text-black text-[12px] my-6 underline"}
                            onClick={resetForm}
                        >
                            Clear
                        </p>
                }
            </form>
        </div>
    );
};

export default TaskForm;
