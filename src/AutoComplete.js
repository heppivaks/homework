import React from 'react';
import './style.css';
import axios from 'axios'
import { FaSearch } from 'react-icons/fa';

export default class AutoComplete extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            suggestions: [], 
            text: '',
        };
    }

    onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];
        let size = 0;
        if(value.length > 2) {
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=6d7b42c07e88782bfbebb47aa9624dc0&language=en-US&query=${value}&limit=8`)
            .then(({ data }) => {
                   for(var i=0; i< data.results.length; i++){
                       suggestions.push(data.results[i].title);
                   }
            })
        }

        this.setState(() => ({ suggestions, text: value }));
    }

    suggestionSelected (value) {
        this.setState(() => ({
            text: value, 
            suggestions: [],
        }))
    }

    renderSuggestions = () => {
        const { suggestions } = this.state;    
        console.log(suggestions);    
        if (suggestions.length === 0) {
            return null;
        }
        return (
         <ul>
             {this.state.suggestions.map(sugg => (
                 <li>{sugg}</li>
             ))}
         </ul>
        );
    }

    render () {
        const { text } = this.state;
        return (
            <div className="search">
                <input placeholder="Enter movie name" value={text} onChange={this.onTextChanged} type="text" />
                <div className="icon">
                <i><FaSearch></FaSearch></i>
                </div>
                {this.renderSuggestions()}
            </div>
        )
    }
}