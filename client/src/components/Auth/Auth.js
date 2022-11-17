import React,{useState} from 'react';
import { Avatar, Button,Paper,Grid,Typography,Container, TextField } from '@material-ui/core';
import useStyles from './styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword((prevShowPassword) =>!prevShowPassword );
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const handleSubmit = (e) => {
      e.preventDefault();

      console.log(formData);
    };
    const handleChange = (e) => {
      setFormData({... formData, [e.target.name]:e.target.value});
    };
    const switchMode = () => {
      setIsSignup((prevIsSignup)=>!prevIsSignup);
      handleShowPassword(false);
    };
  return (
    <Container component="main" maxWidth="xs">
        <Paper  className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon/>
        </Avatar>
        <Typography  variant="h5">{isSignup ? 'Реєстрація' : 'Увійти'}</Typography>
        <form  className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        { isSignup && (
            <>
            <Input name="firstName" label="Ім'я" handleChange={handleChange} autoFocus half/>
            <Input name="lastName" label="Прізвище" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Електронна адреса" handleChange={handleChange} type="email" />
            <Input name="password" label="Пароль" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Повторіть пароль" handleChange={handleChange} type="password" /> }

        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Реєстрація' : 'Увійти' }
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Вже маєте акаунт? Увійти' : "Не маєте акаунту? Реєстрація" }
              </Button>
            </Grid>
          </Grid>
        </form>
        </Paper>
    </Container>
  );
};

export default Auth;