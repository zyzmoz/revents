import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import GoogleMapsReact from 'google-map-react';

const Marker = () => <Icon name="marker" size="big" color="red" />

const EventDetailedMap = ({ lat, lng }) => {
  const center = [lat, lng];
  const zoom = 14;
  return (
    <Segment attached="bottom" style={{padding: '0'}}>
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapsReact
          bootstrapURLKeys={{ key: 'AIzaSyC_nTjtxOtSO3_2CnYrP3Xurrb16FoJ-RA' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker
            lat={lat}
            lng={lng}
            text={'?'}
          />
        </GoogleMapsReact>
      </div>

    </Segment>
  );
};

export default EventDetailedMap;