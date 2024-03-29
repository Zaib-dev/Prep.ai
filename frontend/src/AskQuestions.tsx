import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';





const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


const AskQuestions = () => {
    const [open, setOpen] = useState(false)
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [sendQuestion, setSendQuestion] = useState("")
    const [chat, setChat] = useState<{question: String; answer: String }[]>([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    const handleQuestionRequest = async () => {
        try {
          setSendQuestion(question);
          const response = await axios.post('http://127.0.0.1:8000/askquestions', {
            // Your POST data goes here
            question
          });

          console.log(response);
          setAnswer(response.data);

          setChat(prevChat => [
            ...prevChat,
            {
              question: question,
              answer: response.data
            }
          ]);
        } catch (error) {
          console.error('Error making POST request:', error);
        }
      };

  return (
    <div>
        <Button variant="outlined" style={{margin: "12px"}} onClick={handleClickOpen}>Ask Questions</Button>
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                    <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Prep.a!
                    </Typography>
                </Toolbar>
            </AppBar>
            <div style={{display: 'flex', justifyContent: "center"}}>
              <Card variant="outlined" style={{width: "800px",  height: "370px", margin: '10px', overflow: 'auto'}} >
                {chat.map((chatEntry, index) => (
                  <div key={index} style={{ margin: "20px" }}>
                    <Typography variant='h6'><b>You: </b>{chatEntry.question}</Typography>
                    {sendQuestion && (
                      <Typography variant='h6'><b>Prep.a!: </b>{chatEntry.answer}</Typography>
                    )}
                  </div>
                ))}
              </Card>
            </div>
            
            <TextField
                id="standard-name"
                placeholder='Ask Questions...'
                style={{marginTop: 'auto', padding: '20px', backgroundColor: "#f0f0f0" }}
                value={question} 
                onChange={(e)=>setQuestion(e.target.value)}
                InputProps={{endAdornment: <Button variant="contained"  endIcon={<SendIcon />} style={{width:"6px" }} onClick={handleQuestionRequest} />}}
            />
        </Dialog>
    </div>
  )
}

export default AskQuestions