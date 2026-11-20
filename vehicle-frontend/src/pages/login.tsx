import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axiosClient from '../api/axiosClient' // Sesuaikan path dengan lokasi file axiosClient kamu

const Login = () => {
    const [username, setUsername] = useState("")
    const [passWord, setPassWord] = useState("")

    const navigate = useNavigate()
    const location = useLocation()

    const { login } = useAuth()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await axiosClient.post('/api/auth/login', {
                username: username,
                password: passWord
            })

            const token = response.data.token
            login(token)

            const destination = location.state?.from?.pathname || '/home'
            navigate(destination, { replace: true })
        } catch (error) {
            alert('Login gagal. periksa kembali username dan password anda.!')
        }
    }

    return (
        <main className="login-container">
            <section className="login-card">
                <h1>Login</h1>

                <p className="login-description">
                    Silakan masuk untuk melanjutkan.
                </p>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>

                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Masukkan username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={passWord}
                            onChange={e => setPassWord(e.target.value)}
                            placeholder="Masukkan password"
                            required
                        />
                    </div>

                    <button type="submit">
                        Masuk
                    </button>
                </form>
            </section>
        </main>
    )
}

export default Login