import { useState, useEffect } from 'react';
import styles from './ProfileForm.module.css';
import { FiEdit2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
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
    dispatch(getUser());
  }, [dispatch]);

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
      {['name', 'email', 'password'].map((field) => (
        <div className={styles.inputGroup} key={field}>
          <div className={styles.inputWrapper}>
            <label className={`${styles.floatingLabel} ${editable[field] ? styles.active : ''}`}>
              {field === 'name' ? 'Имя' : field === 'email' ? 'Логин' : 'Пароль'}
            </label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              readOnly={!editable[field]}
              onFocus={() => toggleEdit(field)}
              onBlur={() => toggleEdit(field)}
              className={styles.input}
            />
            <button type="button" onClick={() => toggleEdit(field)} className={styles.iconButton}>
              <FiEdit2 />
            </button>
          </div>
        </div>
      ))}
      {isFormChanged && (
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.button}>Сохранить</button>
          <button type="button" onClick={handleCancel} className={styles.buttonSecondary}>Отмена</button>
        </div>
      )}
    </form>
  );
};

ProfileForm.propTypes = {};

export default ProfileForm;