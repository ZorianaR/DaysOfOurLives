import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createPost ,updatePost } from '../../actions/posts';


//
const Form = ({ currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({title: '', message: '', tags:'', selectedFile:''
    })
    const post = useSelector((state) => currentId? state.posts.find((p)=>p._id===currentId): null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(currentId === 0)
        {
            dispatch(createPost({ ...postData, name: user?.result?.name}));  
            clear()
            
        } else{
            dispatch(updatePost(currentId,{ ...postData, name: user?.result?.name}))
            clear()        
        }
        
    }
    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    };

    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
                Будь ласка, авторизуйтеся, щоб створити свій власний щоденник спогадів або вподобати спогади інших.
            </Typography>
            </Paper>
        )
    }

    
    return(
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h5">{currentId ?'Редагуй':'Додай'} момент...</Typography>


                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Момент" 
                    fullWidth value={postData.title} 
                    onChange={(e) => setPostData({...postData, title: e.target.value})}/>

                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="Повідомлення" 
                    fullWidth value={postData.message} 
                    onChange={(e) => setPostData({...postData, message: e.target.value})}/>

                <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="Теги" 
                    fullWidth value={postData.tags} 
                    onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}/>

                <div className={classes.fileInput}>
                <FileBase 
                    type="file" 
                    multiple={false} 
                    onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button 
                    className={classes.buttonSubmit} 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    type="submit" 
                    fullWidth>Додати
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    onClick={clear} 
                    fullWidth>Очистити комірки
                </Button>
            </form>

        </Paper>
    );
}

export default Form;