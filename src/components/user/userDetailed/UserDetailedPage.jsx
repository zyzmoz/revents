import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withRouter, Link } from 'react-router-dom';
import { Grid, Segment, Item, Header, Button, Icon, Image } from 'semantic-ui-react';
import logoSrc from '../../../assets/img/react.png';
import moment from 'moment';
import format from 'date-fns/format';
import LazyLoad from 'react-lazyload';
import LoadingComponent from '../../util/LoadingComponent';

const photoStyle = {
  maxWidth: '150px',
  maxHeight: '150px',
  border: '1px solid #d6d6d6',
  borderRadius: '8px',
  margin: '5px'
}

const query = ({ match }) => {
  console.log(match);

  return [{
    collection: 'users',
    doc: match.params.id,
    // subcollections: [{ collection: 'photos' }],
    storeAs: 'user'
  }, {
    collection: 'users',
    doc: match.params.id,
    subcollections: [{ collection: 'photos' }],
    storeAs: 'userPhotos'
  }]
}

const mapState = (state) => ({
  auth: state.firebase.auth,
  user: state.firestore.data.user,
  photos: state.firestore.data.userPhotos,
  requesting: state.firestore.status.requesting
})


class UserDetailedPage extends Component {

  render() {

    const { auth, user, photos, requesting } = this.props;
    const loading = Object.values(requesting).some(a => a === true);
    if (loading) return <LoadingComponent inverted={true}/>
    return (
      <Grid>
        {user &&
          <Grid.Column width={16}>
            <Segment>
              <Item.Group>
                <Item>
                  <Item.Image avatar size="small" src={user.photoURL || logoSrc} />
                  <Item.Content verticalAlign="middle">
                    <Header as="h1" content={user.displayName} />
                    <br />
                    <Header as="h3" content={user.occupation} />
                    <br />
                    <Header as="h2" content={moment().diff(user.dateOfBirth.toDate(), 'years') + ', Lives in ' + user.city} />
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>
          </Grid.Column>}
        <Grid.Column width={12}>
          {user &&
            <Segment>
              <Grid columns={2}>
                <Grid.Column width={10}>
                  <Header icon="smile" content="About Name" />
                  <p>I'm a: <b>{user.occupation}</b></p>
                  <p>Originally from:<b>{user.city}</b></p>
                  <p>Member since:<b>{moment(user.createdAt.toDate()).format("YYYY/MM/DD")}</b></p>
                  <br />
                  <p>{user.about}</p>
                </Grid.Column>
                <Grid.Column width={2}>
                  <Header icon="heart" content="Interests" />
                  <Item.Group>
                    {user.interests && user.interests.map((interest, index) =>
                      <Item key={index}>
                        <Icon name="heart" color="black" inverted />
                        {interest}
                      </Item>
                    )}
                  </Item.Group>

                </Grid.Column>
              </Grid>
            </Segment>}

        </Grid.Column>

        <Grid.Column width={4}>
          <Segment>
            {auth && auth.uid === this.props.match.params.id ?
              <Button as={Link} to="/settings" fluid color="blue" inverted content="Edit Profile" /> :
              <Button fluid color="teal" content="Follow User" />
            }
          </Segment>
        </Grid.Column>

        <Grid.Column width={12}>
          <Segment>
            <Header icon="photo" content="Photos" />
            <Grid>
              {photos && Object.values(photos).map((photo, index) =>
                <LazyLoad key={index} height={150} placeholder={ <Image src={logoSrc} />}>
                  <Grid.Column style={photoStyle}>
                    <Image src={photo.url} />
                  </Grid.Column>
                </LazyLoad>
              )}
            </Grid>
          </Segment>

        </Grid.Column>

      </Grid>
    );
  }
}

export default withRouter(connect(mapState)(firestoreConnect(match => query(match))(UserDetailedPage)));