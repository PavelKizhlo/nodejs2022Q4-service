import { User } from '../user/entities/user.entity';
import { Track } from '../track/entities/track.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';

export const users: User[] = [
  new User({
    id: 'f2b2d8e7-d9c7-4a6c-b1f8-3a9e7d4e6f50',
    login: 'johnsmith',
    password: 'mypassword123',
    version: 1,
    createdAt: 1599684547000,
    updatedAt: 1599684547000,
  }),
  new User({
    id: '5f3a5c2e-8b1d-4a3b-9ac3-f907e6c0f719',
    login: 'janesmith',
    password: 'mypassword456',
    version: 1,
    createdAt: 1599684548000,
    updatedAt: 1599684548000,
  }),
  new User({
    id: '46fcbecc-a837-4cf0-b5dd-0ebcf22d2b50',
    login: 'michaeljordan',
    password: 'mypassword789',
    version: 1,
    createdAt: 1599684549000,
    updatedAt: 1599684549000,
  }),

  new User({
    id: '1ec039be-5efc-4db2-83fe-6ac3f6ac17cd',
    login: 'lebronjames',
    password: 'mypassword101112',
    version: 1,
    createdAt: 1599684550000,
    updatedAt: 1599684550000,
  }),

  new User({
    id: '906720ab-dcaf-44af-8060-0077fb08fc1a',
    login: 'kobebryant',
    password: 'mypassword131415',
    version: 1,
    createdAt: 1599684551000,
    updatedAt: 1599684551000,
  }),
];

export const artists: Artist[] = [
  {
    id: 'f2b3d7e9-8b1f-4a2d-9c7a-3e8f5c6d3a6b',
    name: 'Taylor Swift',
    grammy: true,
  },
  {
    id: '0d1c37e2-7c9f-4e5a-8d2b-0a3f8cc8fbc1',
    name: 'Kanye West',
    grammy: true,
  },
  {
    id: '6edec711-5cf6-4b5e-9eb4-c0a981ac4ce7',
    name: 'Beyonce',
    grammy: false,
  },
  {
    id: '3fb17072-10fc-45be-99ac-0ad2cecb2862',
    name: 'Drake',
    grammy: true,
  },
  {
    id: '9fd19f48-7848-4de4-8fe1-5bb90ba75dc5',
    name: 'Adele',
    grammy: false,
  },
  {
    id: '64ce1463-b68d-4db1-aef3-e41e74eb8460',
    name: 'Lady Gaga',
    grammy: true,
  },
  {
    id: '25df9921-a087-4ea0-9fc2-6bb3020ab86d',
    name: 'Justin Bieber',
    grammy: true,
  },
  {
    id: '75ccaf08-0c54-4962-890e-dcd0939bbb02',
    name: 'Katy Perry',
    grammy: false,
  },
  {
    id: 'dd976be3–7fb3–47ad–bff5–c49503218074',
    name: 'Rihanna',
    grammy: true,
  },
  {
    id: 'fa5822de–5fd8–4ed0–8dd1–d8600bd67eb6',
    name: 'Eminem',
    grammy: true,
  },
  {
    id: '19ae4745–ab15–4743–af00–4280cb5733ee',
    name: 'Ed Sheeran',
    grammy: false,
  },
];

export const tracks: Track[] = [
  {
    id: 'f2b3d7e9-8b1f-4a2d-9c7a-3e5f5c6d3a6b',
    name: 'Love Story',
    artistId: 'f2b3d7e9-8b1f-4a2d-9c7a-3e8f5c6d3a6b',
    albumId: '6edec711–5cf6–4b5e–9eb4–c0a981ac4ce7',
    duration: 224,
  },
  {
    id: '0d1c37e2-4c9f-4e5a-8d2b-0a3f8cc8fbc1',
    name: 'Gold Digger',
    artistId: '0d1c37e2-7c9f-4e5a-8d2b-0a3f8cc8fbc1',
    albumId: '6edec711-5cf6-4b5e-9eb4-c0a981ac4ce7',
    duration: 286,
  },
  {
    id: '6edec711–5cf6–4b5e–9eb4–c0a981ac4ce7',
    name: 'Halo',
    artistId: '6edec711–5cf6–4b5e–9eb4–c0a981ac4ce7',
    albumId: '3fb17072–10fc–45be–99ac–0ad7cecb2862',
    duration: 256,
  },
  {
    id: '3fb17072–10fc–45be–99ac–0ad2cecb2862',
    name: "God's Plan ",
    artistId: '3fb17072–10fc–45be–99ac–0ad2cecb2862',
    albumId: '9fd19f48–7848–4de4–8fe1–5bb90ba75dc5',
    duration: 230,
  },
  {
    id: '9fd19f48–7848–4de4–8fe1–5bb90ba75dc5',
    name: 'Rolling in the Deep',
    artistId: '9fd19f48–7848–4de4–8fe1–5be90ba75dc5',
    albumId: '64ce1463-b68d-4db1-aef3-e41e74eb8460',
    duration: 275,
  },
];

export const albums: Album[] = [
  {
    id: '0d1c37e2-7c9f-4e5a-8d7b-0a3f8cc8fbc1',
    name: 'The Fame',
    year: 2020,
    artistId: 'f2b3d7e9-8b1f-4a2d-9c7a-3e8f5c6d3a6b',
  },
  {
    id: '6edec711–5cf6–4b5e–9eb4–c0a981ac4ce7',
    name: '21',
    year: 2021,
    artistId: '0d1c37e2-7c9f-4e5a-8d2b-0a3f8cc8fbc1',
  },
  {
    id: '3fb17072–10fc–45be–99ac–0ad2cecb2862',
    name: 'I Am... Sasha Fierce',
    year: 2021,
    artistId: '75ccaf08-0c54-4962-890e-dcd0939bbb02',
  },
  {
    id: '9fd19f48–7848–4de4–8fe1–5bb90ba75dc5',
    name: 'My World 2.0',
    year: 2020,
    artistId: '25df9921-a087-4ea0-9fc2-6bb3020ab86d',
  },
];
