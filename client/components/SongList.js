import React from "react";
//Helper to allow us to write graphql queries inside a component file
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const SongList = (props) => {
    console.log("props: ", props)
    if (props.data.loading) {
        return <div>Loading...</div>
    }
    return <div>
        <ul className="collection">
            {props.data.songs.map((song) => {
                                            return (<li key={song.id} className="collection-item">{song.title}</li>)
                                        }                        
            )}
        </ul>
    </div>
}


//We are using ES6 templates here. This is a valid javascript code. 
const query = gql`
    {
        songs {
            id
            title
        }
    }
`;

//graphql(query) returns a function. SongList component is given as input to this funciton. 
//When this component is executed on the screen, this function is executed. 
//Timeline:   component rendered --> query issued --> query complete --> rerender component
//So the component is rendered 2 times. 
//graphql(query) passes on "data" property to SongList component. 
export default graphql(query)(SongList);