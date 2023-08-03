import React, { useEffect, useState } from 'react';

const Sign = () => {
    const [users, setUsers] = useState([]);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');

    useEffect(() => {
        const fetchUserData = () => {
            fetch("http://localhost:3000/courses")
                .then(response => response.json())
                .then(data => {
                    setUsers(data);
                });
        }

        fetchUserData();
    }, []);

    const createName = (e) => {
        setNewUserName(e.target.value);
    }

    const createEmail = (e) => {
        setNewUserEmail(e.target.value);
    }

    const createPass = (e) => {
        setNewUserPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newUserName || !newUserEmail || !newUserPassword) {
            alert('Vui Lòng Nhập Đủ Forms')
            return;
        }

        const newUser = {
            username: newUserName,
            email: newUserEmail,
            password: newUserPassword,
        };
        
        fetch("http://localhost:3000/courses", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
            .then(response => response.json())
            .then(data => {
                setUsers([...users, data]);
                setNewUserName('');
                setNewUserEmail('');
                setNewUserPassword('');
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    }

    const handleDelete = (userId) => {
        fetch(`http://localhost:3000/courses/${userId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                // Filter out the deleted user from the state.
                const updatedUsers = users.filter(user => user.id !== userId);
                setUsers(updatedUsers);
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }

    return (
        <div className='form__user'>
            <h1>Danh sách user: </h1>
            {/* handleAddUser */}
            <div className='render__user'>
                <ul className='ul__user'>
                    {
                        users.map((item) => {
                            return (

                                <li key={item.id} style={{listStyle: "none"}}>
                                    <h6>{item.username}</h6>
                                    <h6>{item.email}</h6>
                                    <button onClick={() => handleDelete(item.id)}>Delete User</button>
                                </li>

                            )
                        })
                    }
                </ul>
            </div>

            <div className="create__user">
                <form onSubmit={handleSubmit}>
                    <label>UserName: </label>
                    <input type="text" value={newUserName} onChange={createName} />
                    <label>Email: </label>
                    <input type="email" value={newUserEmail} onChange={createEmail} />
                    <label>PassWord: </label>
                    <input type="password" value={newUserPassword} onChange={createPass} />
                    <button>Thêm User</button>
                </form>
            </div>
        </div>
    );
}

export default Sign;
