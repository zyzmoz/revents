import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Header, Grid, Divider, Card, Button, Image, Icon } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropper/dist/cropper.css';
import { uploadProfileImage } from '../../../actions/user';
import { toast } from 'react-toastify';

const actions = {
  uploadProfileImage
}

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
      await this.props.uploadProfileImage(this.state.image, this.state.fileName) /
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

  render() {
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
                crop={this.cropImage}
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
                    style={{ width: '100px' }}
                    positive
                    icon="check"
                    onClick={this.uploadImage}
                  />
                  <Button
                    style={{ width: '100px' }}
                    icon="close"
                    color="red"
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
            <Image src="https://randomuser.me/api/portraits/men/20.jpg" />
            <Button positive content="Main Photo" />
          </Card>

          <Card>
            <Image src="https://randomuser.me/api/portraits/men/21.jpg" />
            <div className="ui two buttons">
              <Button basic color="green" content="Main" />
              <Button basic icon="trash" color="red" />

            </div>
          </Card>
        </Card.Group>

      </Segment>
    );
  }
}

export default connect(null, actions)(PhotosPage);