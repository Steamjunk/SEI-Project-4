import React from 'react';


const SearchForm = (props) => {
    return (
        <form onSubmit={(e) => {e.preventDefault();}}>
            <h2>Find Cards</h2>
            <input
                type='text'
                name='name'
                placeholder='Card Name'
                onChange={props.handleInputChange}
            />
            <select
                name='set'
                onChange={props.handleInputChange}
                defaultValue='Set'
            >
                <option disabled hidden>Set</option>
                <option>Any</option>                
                {/* get set names */}
            </select>
            <div>
                <h3>Color Identity</h3>
                <input 
                    type="checkbox"
                    id="white"
                    name="white"
                    value="True"
                    onChange={props.handleInputChange}
                />
                <label htmlFor="white">White</label>
                <input
                    type="checkbox"
                    id="blue"
                    name="blue"
                    value="True"
                    onChange={props.handleInputChange}
                />
                <label htmlFor="blue">Blue</label>
                <input
                    type="checkbox"
                    id="black"
                    name="black"
                    value="True"
                    onChange={props.handleInputChange}
                />
                <label htmlFor="black">Black</label>
                <input
                    type="checkbox"
                    id="red"
                    name="red"
                    value="True"
                    onChange={props.handleInputChange}
                />
                <label htmlFor="red">Red</label>
                <input
                    type="checkbox"
                    id="green"
                    name="green"
                    value="True"
                    onChange={props.handleInputChange}
                />
                <label htmlFor="green">Green</label>
                <input
                    type="checkbox"
                    id="colorless"
                    name="colorless"
                    value="True"
                    onChange={props.handleInputChange}
                />
                <label htmlFor="colorless">Colorless</label>
            </div>
            <select
                name='supertype'
                onChange={props.handleInputChange}
                defaultValue='Supertype'
            >
                <option disabled hidden>Supertype</option>
                <option>Any</option>                
                {/* get supertype names */}
            </select>
            <select
                name='type'
                onChange={props.handleInputChange}
                defaultValue='Type'
            >
                <option disabled hidden>Type</option>
                <option>Any</option>                
                {/* get Type names */}
            </select>
            <select
                name='subtype'
                onChange={props.handleInputChange}
                defaultValue='Subtype'
            >
                <option disabled hidden>Subtype</option>
                <option>Any</option>                
                {/* get Subtype names */}
            </select>
        </form>
    )
}

export default SearchForm
