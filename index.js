let users = [];

const categories = new Set();



const getData = async () => {

    const URL = 'https://filltext.com/?rows=10&fname={firstName}&lname={lastName}&category=[%22category1%22,%22category2%22,%22category3%22]&pretty=true';
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            users = data;
            getCategories();
            showUsers(users);
        });
}


getData();


const getCategories = () => {
    categories.add('All');
    users.forEach(user => {
        categories.add(user.category)
    });
    showCategoriesinUI();
}

const showCategoriesinUI = () => {
    document.querySelector('.categories').innerHTML = '';
    categories.forEach(category => {

        let divCategory = document.querySelector('.category').cloneNode(true);
        divCategory.classList.remove('hidden');

        divCategory.querySelector('.nameCateg').innerText = category;

        divCategory.onclick = () => {
            filterByCategory(category);
        }
        document.querySelector('.categories').appendChild(divCategory);
    });

}


const showUsers = (users) => {

    document.querySelector('.users').innerHTML = '';
    users.forEach(user => {
        let divUser = document.querySelector('.div-templet').cloneNode(true);

        divUser.classList.remove('hidden');
        divUser.querySelector('.text-avt').innerText = user.fname[0] + user.lname[0];
        divUser.querySelector('.full-name').innerText = user.fname + ' ' + user.lname;
        divUser.querySelector('.catg').innerText = user.category;
        document.querySelector('.users').appendChild(divUser);

    })
}



const filterByCategory = (category) => {

    let  filteredUsers;
    if (category !== 'All') {
        filteredUsers = users.filter(user => user.category === category);
    } else {
        filteredUsers = [...users];
    }
    showUsers(filteredUsers);
}