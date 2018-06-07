import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Grid, Segment, Item, Header, Button, Icon, Image } from 'semantic-ui-react';
import logoSrc from '../../../assets/img/react.png';

const photoStyle = { 
  maxWidth: '150px', 
  maxHeight: '150px', 
  border: '1px solid #d6d6d6' ,
  borderRadius: '8px',
  margin: '5px'
}

const mapState = (state) => ({
  auth: state.firebase.auth
})


class UserDetailedPage extends Component {
  componentWillMount() {
    console.log(this.props.match.params.id);
    
  }

  render() {
    
    const { auth } = this.props; 
    
    
    return (
      <Grid>
        <Grid.Column width={16}>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image avatar size="small" src={logoSrc} />
                <Item.Content verticalAlign="horizontal">
                  <Header as="h1" content="Name" />
                  <br />
                  <Header as="h3" content="Occupation" />
                  <br />
                  <Header as="h2" content="27, Lives in london UK" />
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Grid.Column>
        <Grid.Column width={12}>
          <Segment>
            <Grid columns={2}>
              <Grid.Column width={10}>
                <Header icon="smile" content="About Name" />
                <p>I'm a: <b>Occupation</b></p>
                <p>Originally from:<b>Brazil</b></p>
                <p>Member since:<b>Some date</b></p>
                <br />
                <p>Some Text</p>
              </Grid.Column>
              <Grid.Column width={2}>
                <Header icon="heart" content="Interests" />
                <Item.Group>
                  <Item>
                    <Icon name="heart" color="black" inverted />
                    Interest
                  </Item>
                </Item.Group>

              </Grid.Column>
            </Grid>
          </Segment>

        </Grid.Column>
        {auth && 
        <Grid.Column width={4}>
          <Segment>
            <Button as={Link} to="/settings" fluid color="blue" inverted content="Edit Profile" />
          </Segment>
        </Grid.Column>}

        <Grid.Column width={12}>
          <Segment>
            <Header icon="photo" content="Photos" />
            <Grid>
              <Grid.Column style={photoStyle}>
                <Image src={logoSrc} />
              </Grid.Column>
            </Grid>
          </Segment>

        </Grid.Column>

      </Grid>
    );
  }
}

export default withRouter(connect(mapState)(UserDetailedPage));