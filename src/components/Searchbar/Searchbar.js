import { useState } from "react";
import { Searchbar, Form, Button, Label, Input } from './Searchbar.styled';
import PropTypes from 'prop-types';

export const SearchbarHeader = ({ onSubmit }) => {
 const [name, setName] = useState('');

const handleChange = e => {
  setName(e.target.value);
}; 

const handleSubmit = e => {
  e.preventDefault();
  onSubmit(name);
  setName('');
};

    return(
      <Searchbar>
      <Form onSubmit={handleSubmit}>
      <Button type="submit" >
        <Label>Search</Label>
      </Button>

      <Input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        onChange={handleChange}
      />
    </Form>
  </Searchbar>
    );
};


SearchbarHeader.propTypes = {
  name: PropTypes.string,
};