import React, { useState, type ChangeEvent, type FormEvent, useEffect } from 'react';
import { Form, Alert, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { updateUserProfileAsync } from '../slices/userSlice';
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ROUTE_LABELS } from "../routes";

const ProfilePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { username, error } = useSelector((state: RootState) => state.user);

    // Initial state with current username (email)
    const [formData, setFormData] = useState({ email: username, password: '' });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        setFormData(prev => ({ ...prev, email: username }));
    }, [username]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSuccessMessage(null);
        if (formData.email && formData.password) {
            const result = await dispatch(updateUserProfileAsync(formData));
            if (updateUserProfileAsync.fulfilled.match(result)) {
                setSuccessMessage("Профиль успешно обновлен");
                setFormData(prev => ({ ...prev, password: '' })); // clear password field
            }
        }
    };

    return (
        <Container style={{ maxWidth: '600px', marginTop: '50px' }}>
            <Breadcrumbs crumbs={[{ label: ROUTE_LABELS.PROFILE }]} />
            <h2 style={{ marginBottom: '20px' }}>Личный кабинет</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" style={{ marginBottom: '15px' }}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Введите новый email"
                    />
                </Form.Group>
                <Form.Group controlId="password" style={{ marginBottom: '20px' }}>
                    <Form.Label>Новый пароль</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Введите новый пароль"
                    />
                    <Form.Text className="text-muted">
                        Оставьте пустым, если не хотите менять пароль.
                    </Form.Text>
                </Form.Group>
                <button className="action-button" type="submit">
                    Сохранить изменения
                </button>
            </Form>
        </Container>
    );
};

export default ProfilePage;
