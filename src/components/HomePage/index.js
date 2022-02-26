import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Dropdown } from 'react-bootstrap';
import PoemsList from '../PoemsList';
import './HomePage.css';

const HomePage = () => {
    const [poems, setPoems] = useState([]);
    const [showPoems, setShowPoems] = useState(false)
    const [title, setTitle] = useState(false);
    const [author, setAuthor] = useState(false)
    const fetchpoems = async() => {
        axios.get('https://poetrydb.org/random/20')
            .then(res => setPoems(res.data))
        setShowPoems(true)
    }

    const sortbyAuthor = () => {
        setPoems(
            poems.sort((a, b) => (a.author > b.author) ? 1 : ((b.author > a.author) ? -1 : 0))
        )
        setAuthor(true)
        setTitle(false)
    }

    const sortbyTitle = () => {
        setPoems(
            poems.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        )
        setAuthor(false)
        setTitle(true)
    }

    useEffect(() => {
        setPoems(poems)
    }, [poems, title, author])
    

    return (
        <div>
            <div className="header">
                <div className="layout">Poems Story</div>
                <div>
                    {
                        poems.length ? (
                            <Dropdown>
                                <Dropdown.Toggle>Choose to Sort</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => sortbyAuthor()}>Author</Dropdown.Item>
                                    <Dropdown.Item onClick={() => sortbyTitle()}>Title</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : ""
                    }
                </div>
                {
                    !poems.length ? (
                        <div className="fetchpoem-start">
                            <div className="spreaditems">
                                <Button
                                    className="login"
                                    onClick={fetchpoems}
                                    color="primary"
                                >
                                    Fetch Poems
                                </Button>
                            </div>
                        </div>
                    ) : ""
                }
            </div>
            <div className="listpoem">
                <PoemsList poems={poems} />
            </div>
        </div>
    )
}

export default HomePage