import React from 'react';
import { Segment, Header, Comment, Form, Button } from 'semantic-ui-react';
import imageSrc from '../../assets/img/react.png';

const EventDetailedChat = () => {
  return (
    <div>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: 'none' }}
      >
        <Header>
          Chat about this Event
        </Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          <Comment>
            <Comment.Avatar src={imageSrc} />
            <Comment.Content>
              <Comment.Author as="a">Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:52PM</div>
              </Comment.Metadata>
              <Comment.Text>
                Interesting
              </Comment.Text>
            </Comment.Content>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment>
          <Form reply>
            <Form.TextArea />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment.Group>
      </Segment>

    </div>
  );
};

export default EventDetailedChat;