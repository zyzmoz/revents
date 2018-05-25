import React, { Component } from 'react';
import { Form, Label } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete from 'react-places-autocomplete';

class PlaceInput extends Component {
  state = {
    scriptLoaded: false,
    address: ''
  }

  handleScriptLoad = () => this.setState({ scriptLoaded: true });

  onChange = (address) => this.setState({ address });



  render() {
    const { input, width, onSelect, placeholder, options, meta: { touched, error } } = this.props;
    return (
      <Form.Field error={touched && !!error}>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_nTjtxOtSO3_2CnYrP3Xurrb16FoJ-RA&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        {this.state.scriptLoaded &&
          <PlacesAutocomplete
            inputProps={{ ...input, placeholder }}
            searchOptions={options}
            onSelect={onSelect}
            onChange={this.onChange}
            value={this.state.address}

          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div>
                <input placeholder={placeholder} 
                  {...getInputProps({                    
                    className: 'location-search-input',                    
                  })}
                />
                {suggestions.length > 0 && <div className="autocomplete-dropdown-container">
                  {suggestions.map(suggestion => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: 'rgba(163,163,163,0.3)', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div {...getSuggestionItemProps(suggestion, { className, style })}>
                        <span>{suggestion.description}</span>
                      </div>
                    )
                  })}
                </div>}
              </div>
            )}
          </PlacesAutocomplete>
        }
        {touched && error && <Label basic color="red">{error}</Label>}
      </Form.Field>
    );
  }
}

const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
  <div className="autocomplete-root">
    <input {...getInputProps()} />
    <div className="autocomplete-dropdown-container">
      {suggestions.map(suggestion => (
        <div {...getSuggestionItemProps(suggestion)}>
          <span>{suggestion.description}</span>
        </div>
      ))}
    </div>
  </div>
);


export default PlaceInput;