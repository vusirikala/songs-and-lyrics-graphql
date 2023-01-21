import React, {useState} from "react";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {Link, hashHistory} from 'react-router';

const SongCreate = (props) => {
    // const [title, setTitle] = useState("");
    let title = "";
    console.log(props)
    
    function onSubmit(event) {
        event.preventDefault();
        props.mutate({
            variables: {
                title: title
            }
        }).then(() => {
            hashHistory.push("/")
        })
    }

    return <div>
        <Link to="/">Back</Link>
        <h3>Create a new song</h3>
        <form onSubmit={onSubmit}>
            <label>Song Title:</label>
            <input onChange={event => {title=event.target.value}}/>
            <button type="submit" />
        </form>
    </div>
}

//$title is query parameter passed to the mutation. 
const mutation = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            id
            title
        }
    }
`

//The graphql(mutation) passes on a "mutate" prop to SongCreate component. 
export default graphql(mutation)(SongCreate);