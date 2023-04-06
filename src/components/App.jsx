import { Container, Title, ContactList } from './App.styled';
import { Component } from 'react';
import { Contacts } from './Contacts/Contacts';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  addNewContact = newContact => {
    const newContactNormalize = newContact.name.toLowerCase();
    const savedContactsNormalise = this.state.contacts.map(contact =>
      contact.name.toLowerCase()
    );
    savedContactsNormalise.includes(newContactNormalize)
      ? alert(`${newContact.name} is already in contacts.`)
      : this.setState(prevState => {
          return {
            contacts: [...prevState.contacts, newContact],
          };
        });
  };

  findByFilter = filterValue => this.setState({ filter: filterValue });

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <Container>
        <ContactsForm addNewContact={this.addNewContact} state={this.state} />
        <Title>Contacts</Title>
        <Filter findByFilter={this.findByFilter} value={this.state.filter} />
        <ContactList>
          <Contacts
            contacts={filteredContacts}
            deleteContact={this.deleteContact}
          />
        </ContactList>
      </Container>
    );
  }
}