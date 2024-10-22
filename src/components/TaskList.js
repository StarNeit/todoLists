import { FaEdit, FaTrash } from 'react-icons/fa'; // Import edit icon


const TaskList = ({ tasks, onEdit, onDelete }) => {
    if (tasks.length === 0) {
        return <p className="text-center text-gray-500">No tasks yet</p>;
    }

    return (
        <ul className="space-y-2">

            <p className={"text-black dark:text-gray-100 font-bold"}>
                Lists
            </p>

            {tasks.map((task, index) => (
                <li key={index}
                    className="relative p-4 rounded bg-white dark:bg-gray-800 dark:text-white text-black border-gray-400 dark:border-none border-[1px]">
                    <p><strong>User:</strong> {task.user}</p>
                    <p><strong>Country:</strong> {task.country}</p>
                    <p><strong>Description:</strong> {task.description}</p>

                    {/* Delete Button */}
                    <button
                        onClick={() => onDelete(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                        <FaTrash/>
                    </button>


                    {/* Edit Button */}
                    <button
                        onClick={() => onEdit(index)}
                        className="absolute bottom-2 right-2 text-blue-500 hover:text-blue-700"
                    >
                        <FaEdit/>
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
