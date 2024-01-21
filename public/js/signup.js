export const signup = async (name, email, password, passwordConfirm) => {
    console.log('details:', name, email, password, passwordConfirm)
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/users/signup',
            data: {
                name: name,
                email: email,
                password: password,
                passwordConfirm: passwordConfirm
            }
        })
        console.log(res)
        if (res.data.status === 'success') {
            alert('Signed up successfully!');
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


document.querySelector('.signup-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    signup(name, email,password, passwordConfirm)

})