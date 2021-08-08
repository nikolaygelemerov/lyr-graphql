import { memo, useState } from 'react';

const SongCreate = () => {
  const [title, setTitle] = useState('');

  return (
    <div>
      <h3>Create new Song</h3>
      <form>
        <label htmlFor="title">Song Title:</label>
        <input
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </form>
    </div>
  );
};

export default memo(SongCreate);
