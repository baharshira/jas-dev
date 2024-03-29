
export const login = async (email, password) => {
    console.log('email and password:',email, password)
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/users/login',
            data: {
                email: email,
                password: password
            }
        })
        console.log(res)
        if (res.data.status === 'success') {
            alert('Logged in successfully!');
            const token = res.data.token
            console.log('this is the token',token)
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    }
    catch(error) {
        alert(error.response.data.message);
    }
}


document.querySelector('.form--login').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email,password)

})

// export const logout = async () => {
//     try {
//         const res = await axios({
//             method: 'GET',
//             url: 'http://localhost:3001/api/v1/users/logout'
//         });
//
//         if (res.data.status === 'success') {
//             location.reload(true)
//         }
//     }
//     catch (error) {
//       alert('showing logging out - try again')
//     }
// }
//
// document.querySelector('.nav__el--logout').addEventListener('click', logout)