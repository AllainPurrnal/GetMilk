import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
  state = {
    modal: false, // this represents if the modal is open or not
    name: ''
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: this.state.name
    }

    // Add item via addItem action
    this.props.addItem(newItem);

    // Close Modal
    this.toggle();
  }

  render() {
    const addItemButton = (
      <Button color='dark' style={{marginBottom: '2rem'}} onClick={this.toggle}> Add Item </Button>
    );

    const welcomeMessage = (
      <h4 className='mb-3 ml-4'>Please log in to get started</h4>
    );

    return (
      <div>
        {this.props.isAuthenticated ? addItemButton : welcomeMessage }

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Item</Label>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  placeholder='Add Shopping Item'
                  onChange={this.onChange}
                />
                <Button
                  color='dark'
                  style={{marginTop: '2rem'}}
                  block
                >
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addItem })(ItemModal);