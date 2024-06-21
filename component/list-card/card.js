import React, { Component, useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addToFavorites } from "../../utils/funtions";

export default class ReviewCardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props?.list,
            favoritePage: props?.favoritePage,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.list !== nextProps.list
        ) {
            return {
                list: nextProps?.list,
                favoritePage: nextProps?.favoritePage,
            };
        }
        return null;
    }

    modifyFavorites = (elem) => {
        var newList = addToFavorites(elem, this.state.list, this.state.favoritePage);
        this.props?.setList(newList);
    }

    // addToFavorites(listItem) {

    //     var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    //     if (listItem.favourite === true) {
    //         favorites = favorites.filter((elem) => elem.id !== listItem.id);
    //     } else {
    //         favorites.push(listItem);
    //     }
    //     listItem.favourite = !listItem.favourite;
    //     if (favorites.length > 0) {
    //         // Add List Item To Favourites
    //         localStorage.setItem('favorites', JSON.stringify(favorites));
    //     } else {
    //         // Remove From Favourite List
    //         localStorage.removeItem('favorites');
    //     }
    //     var newList = this.state.list;
    //     var index = newList.findIndex((elem) => elem.id === listItem.id);
    //     if (index !== -1) {
    //         newList[index].favorite = !listItem.favourite;
    //     }
    //     this.setState({ list: newList });
    // }


    render() {
        return (
            <div data-component="card-component">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {
                        this.state.list.map((elem) => {
                            return (
                                <div className="card">
                                    <div className="d-flex flex wrap justify-content-center align-items-center h-100">
                                        <div>
                                            <div className="image" style={{ backgroundImage: `url(${elem?.thumbnailUrl})` }}>
                                            </div>
                                            <div>
                                                <div className="d-flex justify-content-center align-items-center py-2">
                                                    {elem?.id}
                                                </div>
                                                <div className="d-flex justify-content-center align-items-center py-2">
                                                    {elem?.title}
                                                </div>
                                                <div className="d-flex justify-content-center align-items-center py-2">
                                                    {/* {
                                                        elem?.favorite === true ?
                                                            <span onClick={this.addToFavorites.bind(this, elem)}>
                                                                <FavoriteIcon className="favouriteSelected point-text" />
                                                            </span>
                                                            :
                                                            <span onClick={this.addToFavorites.bind(this, elem)}>
                                                                <FavoriteBorderIcon className="favourite point-text" />
                                                            </span>
                                                    } */}
                                                    {
                                                        elem?.favorite === true ?
                                                            <span onClick={this.modifyFavorites.bind(this, elem)}>
                                                                <FavoriteIcon className="favouriteSelected point-text" />
                                                            </span>
                                                            :
                                                            <span onClick={this.modifyFavorites.bind(this, elem)}>
                                                                <FavoriteBorderIcon className="favourite point-text" />
                                                            </span>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}
