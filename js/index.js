const users = document.querySelector('.users');
const userData = document.querySelector('.userData');

const usersList =
    localStorage.getItem('users') === null
    || localStorage.getItem('users') === undefined
    || JSON.parse(localStorage.getItem('users')).length === 0
        ? data
        : JSON.parse(localStorage.getItem('users'));

const removeErrorMessages = () => {
    document.querySelector(`.errorMessageName`).textContent = ''
    document.querySelector(`.errorMessageAge`).textContent = ''
    document.querySelector(`.errorMessageEmail`).textContent = ''
    document.querySelector(`.errorMessagePassword`).textContent = ''
    document.querySelector(`.errorMessagePhone`).textContent = ''
    document.querySelector(`.errorMessageCard`).textContent = ''
};

const renderUsers = () => {

    for (let i = 0; i < usersList.length; i++) {
        const user = document.createElement('div');
        const viewButton = document.createElement('button');
        const editButton = document.createElement('button');
        const removeButton = document.createElement('button');
        const saveButton = document.querySelector('.saveButton');
        const newUserButton = document.querySelector('.newUser');

        user.innerHTML = usersList[i].name;
        editButton.innerHTML = 'Edit';
        viewButton.innerHTML = 'View';
        removeButton.innerHTML = 'Delete';

        users.appendChild(user);
        users.appendChild(editButton);
        users.appendChild(viewButton);
        users.appendChild(removeButton);

        const showUserData = () => {
            const dataElement = document.createElement('div');
            dataElement.innerHTML =
                `<div>
                    <div>Name: ${usersList[i].name}</div>
                    <div>Age: ${usersList[i].age}</div>
                    <div>Email: ${usersList[i].email}</div>
                    <div>Password: ${usersList[i].password}</div>
                    <div>Phone: ${usersList[i].phone}</div>
                    <div>Card: ${usersList[i].card}</div>
                </div>`
            userData.innerHTML = ''
            userData.appendChild(dataElement);
        };

        const editUserData = (status) => {
            const editBlock = document.querySelector('.editBlock')
            switch (status) {
                case 'edit':
                    removeErrorMessages()
                    document.getElementById('name').value = usersList[i].name;
                    document.getElementById('age').value = usersList[i].age;
                    document.getElementById('email').value = usersList[i].email;
                    document.getElementById('password').value = usersList[i].password;
                    document.getElementById('phone').value = usersList[i].phone;
                    document.getElementById('card').value = usersList[i].card;
                    break;
                case 'create':
                    removeErrorMessages()
                    document.getElementById('name').value = '';
                    document.getElementById('age').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('password').value = '';
                    document.getElementById('phone').value = '';
                    document.getElementById('card').value = '';
                    break;
            }

            editBlock.style.display = 'block';
            saveButton.addEventListener('click', () => {
                event.preventDefault();
                const findBiggestId = () => {
                    const ids = usersList.map(object => {
                        return object.id;
                    });
                    const maxId = Math.max(...ids);
                    return maxId + 1
                };
                const nextId = findBiggestId();

                const formValue = document.querySelector('form[name="editUserForm"]').elements

                const editedObject = {
                    name: formValue.name.value,
                    age: formValue.age.value,
                    email: formValue.email.value,
                    password: formValue.password.value,
                    phone: formValue.phone.value,
                    card: formValue.card.value,
                    id: status === 'edit' ? usersList[i].id : nextId
                }
                const validValuesObject = validateInputValues(editedObject)

                if (
                    validValuesObject.name
                    && validValuesObject.age
                    && validValuesObject.email
                    && validValuesObject.password
                    && validValuesObject.phone
                    && validValuesObject.card
                ) {
                    switch (status) {
                        case 'edit':
                            const index = usersList.findIndex((el) => el.id === usersList[i].id)
                            usersList[index] = editedObject
                            const usersListString = JSON.stringify(usersList)
                            localStorage.setItem('users', usersListString)
                            break
                        case 'create':
                            const updatedArray = [...usersList, editedObject]
                            const newArray = JSON.stringify(updatedArray)
                            localStorage.setItem('users', newArray)
                    }
                    editBlock.style.display = 'none';
                    location.reload();
                } else {
                    !validValuesObject.name
                        ? document.querySelector(`.errorMessageName`).textContent = 'The name must be at least 3 characters and not more than 20'
                        : document.querySelector(`.errorMessageName`).textContent = ''
                    !validValuesObject.age
                        ? document.querySelector(`.errorMessageAge`).textContent = 'Numbers only'
                        : document.querySelector(`.errorMessageAge`).textContent = ''
                    !validValuesObject.email
                        ? document.querySelector(`.errorMessageEmail`).textContent = 'example@example.com'
                        : document.querySelector(`.errorMessageEmail`).textContent = ''
                    !validValuesObject.password
                        ? document.querySelector(`.errorMessagePassword`).textContent = 'Should be not less then 8 characters'
                        : document.querySelector(`.errorMessagePassword`).textContent = ''
                    !validValuesObject.phone
                        ? document.querySelector(`.errorMessagePhone`).textContent = 'Numbers only'
                        : document.querySelector(`.errorMessagePhone`).textContent = ''
                    !validValuesObject.card
                        ? document.querySelector(`.errorMessageCard`).textContent = 'Should be not less then 16 numbers'
                        : document.querySelector(`.errorMessageCard`).textContent = ''
                }
            })
        };

        const removeUser = () => {
            users.appendChild(user);
            users.appendChild(editButton);
            users.appendChild(viewButton);
            users.appendChild(removeButton);

            const filteredUserList = usersList.filter(el => el.id !== usersList[i].id)
            const filteredUserListString = JSON.stringify(filteredUserList)
            localStorage.setItem('users', filteredUserListString)
            location.reload();
        };

        const callModal = () => {
            const modal = document.querySelector('.shadow')
            modal.style.display = 'flex';

            document.querySelector('.removeItem').addEventListener('click', removeUser)
            document.querySelector('.skipRemoveItem').addEventListener('click', () => {
                modal.style.display = 'none';
            })
            modal.addEventListener('click', () => {

                modal.style.display = 'none';
            })
            document.querySelector('.modal').addEventListener('click', () => {
                event.stopPropagation();
            })
        };

        viewButton.addEventListener('click', showUserData)
        editButton.addEventListener('click', () => {
            editUserData('edit')
        })
        removeButton.addEventListener('click', callModal)
        newUserButton.addEventListener('click', () => {
            editUserData('create')
        })
    }
}

renderUsers();