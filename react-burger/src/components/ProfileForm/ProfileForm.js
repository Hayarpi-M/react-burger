import { useState, useEffect } from 'react';
import styles from './ProfileForm.module.css';
import { FiEdit2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser, updateUser } from '../../services/actions/auth';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [originalData, setOriginalData] = useState({});
  const [editable, setEditable] = useState({
    name: false,
    email: false,
    password: false
  });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, password: '' });
      setOriginalData({ name: user.name, email: user.email, password: '' });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleEdit = (field) => {
    setEditable(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleCancel = () => {
    setFormData(originalData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData.name, formData.email, formData.password));
  };

  const isFormChanged =
    formData.name !== originalData.name ||
    formData.email !== originalData.email ||
    formData.password !== '';

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <div className={styles.inputWrapper}>
          <Input
            type="text"
            placeholder="Имя"
            name="name"
            value={formData.name}
            onChange={handleChange}
            icon="EditIcon"
            disabled={!editable.name}
            onIconClick={() => toggleEdit('name')}
          />
        </div>
      </div>
      <div className={styles.inputGroup}>
        <div className={styles.inputWrapper}>
          <Input
            type="email"
            placeholder="Логин"
            name="email"
            value={formData.email}
            onChange={handleChange}
            icon="EditIcon"
            disabled={!editable.email}
            onIconClick={() => toggleEdit('email')}
          />
        </div>
      </div>
      <div className={styles.inputGroup}>
        <div className={styles.inputWrapper}>
          <PasswordInput
            name="password"
            value={formData.password}
            onChange={handleChange}
            icon="EditIcon"
            disabled={!editable.password}
            onIconClick={() => toggleEdit('password')}
          />
        </div>
      </div>
      {isFormChanged && (
        <div className={styles.buttonGroup}>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
          <Button htmlType="button" type="secondary" size="medium" onClick={handleCancel}>
            Отмена
          </Button>
        </div>
      )}
    </form>
  );
};

ProfileForm.propTypes = {};

export default ProfileForm;