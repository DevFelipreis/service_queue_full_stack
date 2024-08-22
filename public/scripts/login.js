document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const serverMessageLogin = document.getElementById('serverMessageLogin');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('user').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            serverMessageLogin.textContent = 'Por favor, preencha todos os campos.';
            serverMessageLogin.style.color = 'red';
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('token', result.token);

                serverMessageLogin.textContent = 'Login realizado com sucesso!';
                serverMessageLogin.style.color = 'yellow';
                window.location.href = 'google.com';
            } else {
                serverMessageLogin.textContent = result.message || 'Erro ao fazer login. Tente novamente.';
                serverMessageLogin.style.color = 'white';
            }
        } catch (error) {
            serverMessageLogin.textContent = 'Erro ao se comunicar com o servidor. Tente novamente mais tarde.';
            serverMessageLogin.style.color = 'red';
        }
    });
});
