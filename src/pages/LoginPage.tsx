import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { loginUserAsync } from '../slices/userSlice';
import { useNavigate } from "react-router-dom";
import { ROUTES } from '../routes';

const LoginPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const error = useSelector((state: RootState) => state.user.error);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formData.email && formData.password) {
            const result = await dispatch(loginUserAsync(formData));
            if (loginUserAsync.fulfilled.match(result)) {
                navigate(ROUTES.AUTHORS);
            }
        }
    };

    return (
        <Container style={{ maxWidth: '400px', marginTop: '150px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Рады снова Вас видеть!</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" style={{ marginBottom: '15px' }}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Введите email"
                    />
                </Form.Group>
                <Form.Group controlId="password" style={{ marginBottom: '20px' }}>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Введите пароль"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" style={{ width: '100%' }}>
                    Войти
                </Button>
            </Form>
        </Container>
    );
};

export default LoginPage;
