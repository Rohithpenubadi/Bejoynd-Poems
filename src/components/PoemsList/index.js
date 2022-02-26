import React, { useEffect, useState } from 'react'
import {  Card, Alert } from 'react-bootstrap';
import './PoemsList.css';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { IconContext } from "react-icons";


const PoemsList = (poems) => {
    const [showFooter, setshowFooter] = useState(false)
    const [showFavourites, setShowFavourites] = useState(false)
    let favouriteList = [];
    const [Favourites, setFavourites] = useState(favouriteList);
    const [favouriteListPoems, setFavouriteListPoems] = useState(null)
    const FavouritePoems = (poem, e) => {
        e.stopPropagation();
        if (!Array.from(Favourites).includes(poem.title)) {
            setFavourites([...Favourites, poem.title]
            )
        }
        else if (Array.from(Favourites).includes(poem.title)) {
            setFavourites(
                Favourites.filter(item => item !== poem.title)
            )
        }
        setShowFavourites(true)
    }
    const navigation = (poems) => {
        setshowFooter(!showFooter)
    }

    useEffect(() => {

        setFavouriteListPoems(Favourites)
        console.log(Favourites)

    }, [Favourites, favouriteListPoems, showFavourites])

    return (
        <div className="poemslist">
            <div style={{ width: '60vw' }}>
                {
                    poems ? (
                        poems.poems.map((poem) => {
                            return (
                                <>
                                    <Card style={{ marginLeft: "5%", marginTop: "3%" }} >
                                        <Card.Title>
                                            <div style={{ display: 'flex', justifyContent: "space-between", margin: "1%" }}>
                                                <div >
                                                    <span className="header-key">Author - </span> <span className="header-value">{poem.author}</span>
                                                </div>
                                                <div onClick={(e) => FavouritePoems(poem, e)}>
                                                    <IconContext.Provider value={{ size: "1.5em", className: "global-class-name" }}>
                                                        <div>
                                                            {favouriteListPoems?.includes(poem.title) ? <MdFavorite /> : <MdFavoriteBorder />}
                                                        </div>
                                                    </IconContext.Provider>
                                                </div>
                                            </div>
                                        </Card.Title>
                                        <Card.Title style={{ margin: "1%" }}>
                                            <span className="header-key">Title - </span> <span className="header-value">{poem.title}</span>
                                        </Card.Title>
                                        {
                                            showFooter ? (
                                                <>
                                                    <Card.Title style={{margin: "1%", fontWeight: "bold" }}>Poem</Card.Title>
                                                    <Card.Body> {poem.lines}</Card.Body>
                                                </>
                                            ) : ""
                                        }
                                        <div
                                            onClick={() => navigation()}
                                            className="poemdetail"
                                        >
                                            {
                                                !showFooter ? "ViewMore" : "ViewLess"
                                            }

                                        </div>
                                    </Card>
                                </>
                            )
                        })
                    ) : ""
                }
            </div>
            <div className="favourites">
                {
                    poems.poems.length &&
                    (<Card>
                        <Card.Title style={{ padding: 10, fontSize: 26, fontWeight: 'bold' }}>Favourite Poems</Card.Title>
                        {favouriteListPoems.length > 0 ?
                            favouriteListPoems.map((item, index) =>
                                <Alert key={index}>
                                    {item}
                                </Alert>
                            ) : <div className="no-favourites">
                                Add Favourite Poems to List
                            </div>
                        }
                    </Card>)
                }
            </div>
        </div>
    )
}

export default PoemsList