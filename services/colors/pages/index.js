import axios from 'axios';

export async function fetch() {
  let response = await axios.get('http://localhost:3000/api/colors');
  let colors = response.data.colors;
  return { colors };
}

export default function Colors({ colors }) {
  return (
    <div>
      <h1>Colors</h1>
      <ul>
        {colors.map(color =>
          <li key={color.id}>
            {color.name}
            <span className="swatch" style={{ backgroundColor: color.hex }}></span>
          </li>
        )}
      </ul>
      <style jsx>{`
        .swatch {
          display: block;
          width: 20px;
          height: 20px;
        }
      `}</style>
    </div>
  );
}
