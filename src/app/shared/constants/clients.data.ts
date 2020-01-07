import { Client } from '../models/client.model';

function generateDate(): string {
  return new Date().toLocaleString('es-CO', { year: 'numeric', month: 'numeric', day: '2-digit' })
};

export const CLIENTS: Client[] = [
  { id: 1, name: 'Linus', surname: 'Tolvard', email: 'linus.tolvard@gmail.com', createAt: generateDate() },
  { id: 2, name: 'Tony', surname: 'Stark', email: 'tony.stark@gmail.com', createAt: generateDate() },
  { id: 3, name: 'Steve', surname: 'Rogers', email: 'steve.rogers@gmail.com', createAt: generateDate() },
  { id: 4, name: 'Natasha', surname: 'Romanoff', email: 'natasha.romanoff@gmail.com', createAt: generateDate() },
  { id: 5, name: 'Bruce', surname: 'Banner', email: 'bruce.banner@gmail.com', createAt: generateDate() },
  { id: 6, name: 'Clint ', surname: 'Barton', email: 'clint.barton@gmail.com', createAt: generateDate() },
  { id: 7, name: 'Stephen', surname: 'Strange', email: 'stephen.strange@gmail.com', createAt: generateDate() },
  { id: 8, name: 'Carol', surname: 'Danvers', email: 'carol.danvers@gmail.com', createAt: generateDate() }
];
