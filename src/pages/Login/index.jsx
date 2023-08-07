import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isValid}
  } = useForm({
    defaultValues: {
      email: 'madiyar@mail.ru',
      password: '12345'
    },
    mode:'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if(!data.payload) {
      return alert('Failed to registration')
    }

    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  }

  if(isAuth) {
    return <Navigate to="/" />
  }


  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email ?.messsage)}
          helperText={errors.email ?.message}
          {...register('email', { required: 'Укажите почту'})}
          fullWidth
        />
        <TextField className={styles.field}
        label="Пароль" 
        fullWidth
        error={Boolean(errors.password ?.messsage)}
        helperText={errors.password ?.message}
        {...register('password', { required: 'Напишите пароль'})} />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
