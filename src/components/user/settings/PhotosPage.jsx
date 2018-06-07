import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Segment, Header, Grid, Divider, Card, Button, Image, Icon } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropper/dist/cropper.css';
import { uploadProfileImage, deletePhoto, setMainPhoto } from '../../../actions/user';
import { toast } from 'react-toastify';
import logoSrc from '../../../assets/img/react.png';

const query = ({ auth }) => {
  return [{
    collection: 'users',
    doc: auth.uid,
    subcollections: [{ collection: 'photos' }],
    storeAs: 'photos'
  }]
}

const actions = {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
}

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.data.photos,
  loading: state.async.loading
});


class PhotosPage extends Component {
  state = {
    files: [],
    fileName: '',
    cropResult: null,
    image: {}
  }

  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }

    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageUrl = URL.createObjectURL(blob);
      this.setState({
        cropResult: imageUrl,
        image: blob
      })
    }, 'image/jpeg');
  }

  onDrop = (files) => {
    this.setState({
      files,
      fileName: files[0].name
    });
  }

  cancelCrop = () => {
    this.setState({
      files: [],
      image: {}
    });
  }

  uploadImage = async () => {
    try {
      await this.props.uploadProfileImage(this.state.image, this.state.fileName);
      this.cancelCrop();
      toast.success('Photo uploades successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } catch (error) {
      console.log(error);
      toast.error('Oosp' + error, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
  }

  handlePhotoDelete = (photo) => async () => {
    try {
      await this.props.deletePhoto(photo);
    } catch (error) {
      toast.error('Oops ' + error.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }

  handleSetMainPhoto = (photo) => async () => {
    try {
      await this.props.setMainPhoto(photo);
    } catch (error) {
      toast.error('Oops ' + error.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }


  render() {
    const { profile, photos, loading } = this.props;
    console.log(photos);
    let filteredPhotos;
    if (photos) {
      filteredPhotos = Object.keys(photos).map((id) => {
        return {id, ...photos[id]}        
      }).filter(photo => photo.url !== profile.photoURL);
      console.log(filteredPhotos);
      
    }
    return (
      <Segment>
        <Header dividing size="large" content="Your Photos" />
        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header color="teal" sub content="Step 1 - Add Photo" />
            <Dropzone onDrop={this.onDrop} multiple={false}>
              <div style={{ paddingTop: "30px", textAlign: "center" }}>
                <Icon name="upload" size="huge" />
                <Header content="Drop your image here or click to add" />
              </div>
            </Dropzone>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header color="teal" sub content="Step 2 - Resize Image" />
            {this.state.files[0] &&
              <Cropper
                style={{ height: "200px", width: "100%" }}
                ref="cropper"
                src={this.state.files[0].preview}
                viewMode={0}
                dragMode="move"
                guides={false}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                crop={() => this.cropImage()}
              />
            }
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header color="teal" sub content="Step 3 - Preview and Upload" />
            {this.state.files[0] &&
              <div >
                <Image style={{ minHeight: '200px', minWidth: '200px' }}
                  src={this.state.cropResult}
                />
                <Button.Group>
                  <Button
                    loading={loading}
                    style={{ width: '100px' }}
                    positive
                    icon="check"
                    onClick={this.uploadImage}
                  />
                  <Button
                    style={{ width: '100px' }}
                    icon="close"
                    color="red"
                    disabled={loading}
                    onClick={this.cancelCrop}
                  />
                </Button.Group>
              </div>
            }
          </Grid.Column>
        </Grid>
        <Divider />
        <Header color="teal" sub content="All Photos" />
        <Card.Group itemsPerRow="5">
          <Card>
            <Image src={profile.photoURL || logoSrc} />
            <Button positive content="Main Photo" />
          </Card>
          {photos && filteredPhotos.map((photo, ) =>
            <Card key={photo.id}>
              <Image src={photo.url} />
              <div className="ui two buttons">
                <Button

                  basic
                  color="green"
                  content="Main"
                  onClick={this.handleSetMainPhoto(photo)}
                />
                <Button
                  basic
                  icon="trash"
                  color="red"

                  onClick={this.handlePhotoDelete(photo)}
                />
              </div>
            </Card>)
          }
        </Card.Group>

      </Segment>
    );
  }
}

export default compose(
  connect(mapState, actions),
  firestoreConnect(auth => query(auth))
)(PhotosPage);