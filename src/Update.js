import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from './NoteReducer';
import { Button, Collapse } from 'react-bootstrap';

function Update(){
    const {id} = useParams();
    const notes = useSelector((state) => state.notes);
    const existingNote= notes.filter(f => f.id==id);
    const {title,body}=existingNote[0];
    const [utitle, setTitle] = useState(title)
    const [ubody, setBody] = useState(body)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    
    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateNote({
            id:id,
            title:utitle, 
            body:ubody
        }
        ))
        navigate('/')
    }

    return(
        <div className="App">
      <header>
      <Navbar className="navv">
      <Container>
      <div className="bd">
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="collapse-content"
        aria-expanded={open}
        className="bu"
      >
       <i className="bi bi-justify"></i>
      </Button>
      <Collapse in={open}>
        <div id="collapse-content">
          <a href="#about" className="lin">About</a>
        </div>
      </Collapse>
    </div>
    <Navbar.Brand href="/" className="order">Note Keeper</Navbar.Brand>
    <Navbar.Toggle />
        <Navbar.Collapse className="bc justify-content-end">
          <Navbar.Text >
            <a href="#about" className="lin">About</a>
            <a href="#readme" className="lin"> Read Me</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </header>
        <section>
        <Form className="mx-auto" onSubmit={handleUpdate}  >   
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <i className="bi bi-fonts"></i>
        <input className="control2" type="text" placeholder="Title" value={utitle} onChange={e => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <i class="bi bi-file-text-fill"></i>
        <input className="control1" type="text" placeholder="Note" value={ubody} onChange={e => setBody(e.target.value)} /> 
        </Form.Group>
         <button type="submit" className="btn btn-primary">UPDATE</button>  
      </Form>
        </section>
      </div>
    )
}

export default Update;