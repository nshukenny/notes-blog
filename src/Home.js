import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import 'bootstrap-icons/font/bootstrap-icons.css'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, deleteNote } from './NoteReducer';
import { Link } from 'react-router-dom';
import { Button, Collapse } from 'react-bootstrap';
import {useRef} from 'react';

function Home() {
  const notes = useSelector((state) => state.notes);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [nextId, setNextId] = useState(notes.length > 0 ? notes[notes.length - 1].id + 1 : 1);
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const filteredNotes = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.body.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedNotes = [...filteredNotes].sort((a, b) => {
      if (sortField === 'id') {
        return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
      } else if (sortField === 'title') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });

    setFilteredNotes(sortedNotes);
  }, [notes, searchQuery, sortField, sortOrder]);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
     
      return;
    }

    dispatch(addNote({ id: nextId, title, body }));
    setTitle(''); 
    setBody(''); 
    firstRef.current.value = '';
    lastRef.current.value = '';
    setNextId(nextId + 1);
  };

  const handleDelete = (id) => {
    dispatch(deleteNote({ id }));
    if (id === nextId - 1) {
      setNextId(nextId - 1);
    }
  };

  const handleSearch = () => {
    const filteredNotes = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.body.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredNotes(filteredNotes);
  };

  const handleSort = () => {
    const sortedNotes = [...filteredNotes].sort((a, b) => {
      if (sortField === 'id') {
        return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
      } else if (sortField === 'title') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });

    setFilteredNotes(sortedNotes);
  };
  return (
    <div className="App">
      <header>
      <Navbar className="navv" expand="lg">
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
   
      <Form className="mx-auto" onSubmit={handleSubmit}>   
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <i className="bi bi-fonts"></i>
      <input ref={firstRef} className="control2" type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <i class="bi bi-file-text-fill"></i>
      <input ref={lastRef} className="control1" type="text" placeholder="Note" onChange={e => setBody(e.target.value)}/> 
      </Form.Group>
       <button type="submit" className="btn btn-primary">ADD NOTE</button>  
    </Form>
      </section>

      <section>
      <Form className=" ok d-flex">
      <Form.Select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="sear"
          >
            <option value="id">Sort by ID</option>
            <option value="title">Sort by Title</option>
          </Form.Select>
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="opt"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Form.Select>
          <Button variant="outline-success" onClick={handleSort} className="sor">
            Sort
          </Button>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-success" onClick={handleSearch} className="bt"><i class="bi bi-search"></i></Button>
            
          </Form>
      <Table  bordered hover >
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Body</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredNotes.map((note, index) => (
        <tr key={index}>
        <td>{note.id}</td>
        <td>{note.title}</td>
        <td className="fixed-width-row">{note.body}</td>
        <td>
        <Link to={`/edit/${note.id}`}  className="btn btn-secondary">EDIT</Link>
        <button  className="btn btn-secondary2 ms-2" onClick={()=>handleDelete(note.id)}>DELETE</button>   
        </td>
        </tr>
        ))}
      </tbody>
    </Table>
      </section>
    </div>
  );
   }

export default Home;