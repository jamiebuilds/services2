import axios from 'axios';

export async function fetch() {
  const response = await axios.get('http://localhost:3000/api/availability');
  const services = response.data.services;
  return { services };
}

export default function Availability({ services }) {
  return (
    <div>
      <h1>Availability</h1>
      <ul>
        {services.map((service) =>
          <li key={service.id}>
            <a href={service.path}>{service.name}</a>
            {' '}
            ({ service.online ? 'Online' : 'Offline' })
          </li>
        )}
      </ul>
    </div>
  );
}
