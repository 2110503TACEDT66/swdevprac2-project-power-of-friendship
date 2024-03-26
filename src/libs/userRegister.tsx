export default function userRegister(data: Object) {
    fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert("Congratulations!!")
        if (result.success === true) {
            window.location.href = '/';
        }   
    })
}